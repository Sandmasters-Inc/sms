import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components'
import { TextInput } from '../Inputs'
import { Button } from '../Button'
import { PageContent, PageControls } from '../Page'
import { capitalize, separate } from '../../utils/StringUtils'

const Login = ({ authenticateUser }) => {
  let history = useHistory();
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  });
  const [errorData, setErrorData] = useState({ errors: null });

  const { email, password } = userData;
  const { errors } = errorData;

  const onChange = e => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const loginUser = async () => {
    const newUser = {
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
      const res = await axios.post('/api/login', body, config);

      // Store user data and redirect
      localStorage.setItem('token', res.data.token);
      history.push('/');
    } catch (error) {
      // Clear user data
      localStorage.removeItem('token');

      setErrorData({
        ...errors,
        errors: error.response.data.errors
      });
    }

    authenticateUser();
  };

  const makeInput = (name, field) => {
    let formattedName = capitalize(name)
    formattedName = separate(formattedName)

    return (
      <TextInput
        name={name}
        label={formattedName}
        value={field}
        onChange={e => onChange(e)}
      />
    )
  }

  return (
    <PageContent>
      <h1>Log In</h1>
      {makeInput("email", email)}
      {makeInput("password", password)}
      <PageControls>
        <div>
          <Button onClick={() => loginUser()}>Log In</Button>
        </div>
        <div>
          {errors && errors.map(error => <div key={error.msg}>{error.msg}</div>)}
        </div>
      </PageControls>
    </PageContent>
  );
};

export default Login;
