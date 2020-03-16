import express from 'express';
import connectDatabase from './config/db';
import { check, validationResult } from 'express-validator';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config';
import User from './models/User';
import Job from './models/Job';
import auth from './middleware/auth';
import path from 'path';

// Initialize express application
const app = express();

// Connect database
connectDatabase();

// Configure Middleware
app.use(express.json({ extended: false }));
app.use(
  cors({
    origin: 'http://localhost:3000'
  })
);

// API endpoints
/**
 * @route POST api/users
 * @desc Register user
 */
app.post(
  '/api/users',
  [
    check('firstName', 'Please enter your first name')
      .not()
      .isEmpty(),
    check('lastName', 'Please enter your last name')
      .not()
      .isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else {
      const { firstName, lastName, email, password } = req.body;
      try {
        // Check if user exists
        let user = await User.findOne({ email: email });
        if (user) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'User already exists' }] });
        }

        // Create a new user
        user = new User({
          firstName: firstName,
          lastName: lastName,
          active: true,
          hireDate: new Date(),
          email: email,
          password: password
        });

        // Encrypt the password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Save to the db and return
        await user.save();

        // Generate and return a JWT token
        returnToken(user, res);
      } catch (error) {
        res.status(500).send('Server error');
      }
    }
  }
);

/**
 * @route GET api/auth
 * @desc Authorize user
 */
app.get('/api/auth', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send('Unknown server error');
  }
});

/**
 * @route POST api/login
 * @desc Login user
 */
app.post(
  '/api/login',
  [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'A password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else {
      const { email, password } = req.body;
      try {
        // Check if user exists
        let user = await User.findOne({ email: email });
        if (!user) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'Invalid email or password' }] });
        }

        // Check password
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'Invalid email or password' }] });
        }

        // Generate and return a JWT token
        returnToken(user, res);
      } catch (error) {
        res.status(500).send('Server error');
      }
    }
  }
);

const returnToken = (user, res) => {
  const payload = {
    user: {
      id: user.id
    }
  };

  jwt.sign(
    payload,
    config.get('jwtSecret'),
    { expiresIn: '10hr' },
    (err, token) => {
      if (err) throw err;
      res.json({ token: token });
    }
  );
};

// Job endpoints
/**
 * @route POST api/jobs
 * @desc Create job
 */
app.post(
  '/api/jobs',
  [
    auth,
    [
      check('name', 'Job name is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      const { 
        active,
        name,
        street,
        city,
        state,
        zip,
        approvedUser,
        //createdUser -- derived from request user below
        createdDate,
        inquiryDate,
        inspectionDate,
        followUpDate,
        tentativeDate,
        scheduledDate,
        completedDate,
        status,
        primaryType,
        notes,
        inspector,
        payTerms
      } = req.body;
      try {
        // Get the user who created the job
        const user = await User.findById(req.user.id);

        // Create a new job
        const job = new Job({
          active: active,
          name: name,
          street: street,
          city: city,
          state: state,
          zip: zip,
          approvedUser: approvedUser,
          createdUser: user.id,
          createdDate: createdDate,
          inquiryDate: inquiryDate,
          inspectionDate: inspectionDate,
          followUpDate: followUpDate,
          tentativeDate: tentativeDate,
          scheduledDate: scheduledDate,
          completedDate: completedDate,
          status: status,
          primaryType: primaryType,
          notes: notes, 
          inspector: inspector,
          payTerms: payTerms
        });

        // Save to the db and return
        await job.save();

        res.json(job);
      } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
      }
    }
  }
);

/**
 * @route GET api/jobs
 * @desc Get jobs
 */
app.get('/api/jobs', auth, async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdDate: -1 });

    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

/**
 * @route GET api/jobs/:id
 * @desc Get job
 */
app.get('/api/jobs/:id', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    // Make sure the job was found
    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }

    res.json(job);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

/**
 * @route DELETE api/jobs/:id
 * @desc Delete a job
 */
app.delete('/api/jobs/:id', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    // Make sure the job was found
    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }

    // Make sure the request user created the job
    if (job.createdUser.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await job.remove();

    res.json({ msg: 'Job removed' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

/**
 * @route PUT api/jobs/:id
 * @desc Update a job
 */
app.put('/api/jobs/:id', auth, async (req, res) => {
  try {
    const { 
      active, 
      name,
      street,
      city,
      state,
      zip,
      approvedUser,
      createdUser,
      createdDate,
      inquiryDate,
      inspectionDate,
      followUpDate,
      tentativeDate,
      scheduledDate,
      completedDate,
      status,
      primaryType,
      notes,
      inspector,
      payTerms
    } = req.body;
    const job = await Job.findById(req.params.id);

    // Make sure the job was found
    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }

    // Make sure the request user created the job
    if (job.createdUser.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // Update the job and return
    job.active = active || job.active;
    job.name = name || job.name,
    job.street = street || job.street,
    job.city = city || job.city,
    job.state = state || job.state,
    job.zip = zip || job.zip,
    job.approvedUser = approvedUser || job.approvedUser,
    job.createdUser = createdUser || job.createdUser,
    job.createdDate = createdDate || job.createdDate,
    job.inquiryDate = inquiryDate || job.inquiryDate,
    job.inspectionDate = inspectionDate || job.inspectionDate,
    job.followUpDate = followUpDate || job.followUpDate,
    job.tentativeDate = tentativeDate || job.tentativeDate,
    job.scheduledDate = scheduledDate || job.scheduledDate,
    job.completedDate = completedDate || job.completedDate,
    job.status = status || job.status,
    job.primaryType = primaryType || job.primaryType,
    job.notes = notes || job.notes,
    job.inspector = inspector || job.inspector,
    job.payTerms = payTerms || job.payTerms

    await job.save();

    res.json(job);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Serve build files in production
if (process.env.NODE_ENV === 'production') {
  // Set the build folder
  app.use(express.static('client/build'));

  // Route all requests to serve up the built index file
  // (i.e., [current working directory]/client/build/index.html)
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Connection listener
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Express server running on port ${port}`));
