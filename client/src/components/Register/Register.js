import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Register = ({ authenticateUser }) => {
  let history = useHistory();
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    active: false,
    hireDate: new Date(),
    email: '',
    password: '',
    passwordConfirm: ''
  });
  const [errorData, setErrorData] = useState({ errors: null });

  const { firstName, lastName, active, hireDate, email, password, passwordConfirm } = userData;
  const { errors } = errorData;

  const onChange = e => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const registerUser = async () => {
    if (password !== passwordConfirm) {
      console.log('Passwords do not match');
    } else {
      const newUser = {
        firstName: firstName,
        lastName: lastName,
        active: active,
        hireDate: hireDate,
        email: email,
        password: password
      };

      try {
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };

        const body = JSON.stringify(newUser);
        const res = await axios.post('/api/users', body, config);

        // Store user data and redirect
        localStorage.setItem('token', res.data.token);
        history.push('/');
      } catch (error) {
        // Clear user data and set errors
        localStorage.removeItem('token');

        setErrorData({
          ...errors,
          errors: error.response.data.errors
        });
      }

      authenticateUser();
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <div>
        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          value={firstName}
          onChange={e => onChange(e)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          value={lastName}
          onChange={e => onChange(e)}
        />
      </div>
      <div>
        <label for="active">Active</label>
        <input
          type="checkbox"
          name="active"
          value={active}
          onChange={e => onChange(e)}
        />
      </div>
      <div>
        <input
          type="date"
          name="hireDate"
          value={hireDate}
          onChange={e => onChange(e)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={email}
          onChange={e => onChange(e)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Password"
          name="password"
          value={password}
          onChange={e => onChange(e)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Confirm Password"
          name="passwordConfirm"
          value={passwordConfirm}
          onChange={e => onChange(e)}
        />
      </div>
      <div>
        <button onClick={() => registerUser()}>Register</button>
      </div>
      <div>
        {errors && errors.map(error => <div key={error.msg}>{error.msg}</div>)}
      </div>
    </div>
  );
};

export default Register;
