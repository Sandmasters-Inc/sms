import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
  active: {
    type: Boolean,
    default: true
  },
  name: {
    type: String,
    required: true
  },
  street: String,
  city: String,
  state: String,
  zip: String,
  createdUser: {
    type: 'ObjectId',
    ref: 'User'
  },
  approvedUser: String,
  createdDate: {
    type: Date,
    default: Date.now
  },
  inquiryDate: {
    type: Date,
    default: Date.now
  },
  inspectionDate: {
    type: Date,
    default: Date.now
  },
  followUpDate: {
    type: Date,
    default: Date.now
  },
  tentativeDate: {
    type: Date,
    default: Date.now
  },
  scheduledDate: {
    type: Date,
    default: Date.now
  },
  completedDate: {
    type: Date,
    default: Date.now
  },
  status: String,
  primaryType: String,
  notes: String,
  inspector: String,
  payTerms: String
});

const Job = mongoose.model('job', JobSchema);

export default Job;
