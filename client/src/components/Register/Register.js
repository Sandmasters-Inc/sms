import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { InputType, InputFactory } from '../Inputs'
import { Button } from '../Button'
import { PageContent, PageControls } from '../Page'

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

  const config = [
    { name: 'firstName', value: firstName },
    { name: 'lastName', value: lastName },
    { name: 'hireDate', value: hireDate, type: 'date' },
    { name: 'email', value: email },
    { name: 'password', value: password, type: 'password' },
    { name: 'passwordConfirm', value: passwordConfirm, type: 'password' },
    { name: 'active', value: active, inputType: InputType.checkbox }
  ]

  return (
    <PageContent>
      <h1>Register</h1>
 
      {config.map((props, i) =>
        <InputFactory key={i} {...props} onChange={e => onChange(e)} />)
      }
      <PageControls>
        <div>
          <Button onClick={() => registerUser()}>Register</Button>
        </div>
        <div>
          {errors && errors.map(error => <div key={error.msg}>{error.msg}</div>)}
        </div>
      </PageControls>
    </PageContent>
  )
};

export default Register;
