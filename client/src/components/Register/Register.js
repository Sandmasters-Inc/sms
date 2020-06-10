import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components'
import { TextInput } from '../Inputs'
import { Button } from '../Button'
import { PageContent, PageControls } from '../Page'
import { capitalize, separate } from '../../utils/StringUtils'

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

  const makeInput = (name, field, type = 'text') => {
    let formattedName = capitalize(name)
    formattedName = separate(formattedName)

    return (
      <TextInput
        type={type}
        name={name}
        label={formattedName}
        value={field}
        onChange={e => onChange(e)}
      />
    )
  }

  return (
    <PageContent>
      <h1>Register</h1>
      {makeInput("firstName", firstName)}
      {makeInput("lastName", lastName)}
      {makeInput("active", active, "checkbox")}
      {makeInput("hireDate", hireDate, "date")}
      {makeInput("email", email)}
      {makeInput("password", password)}
      {makeInput("passwordConfirm", passwordConfirm)}
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
