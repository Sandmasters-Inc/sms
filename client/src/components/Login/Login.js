import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components'
import { TextInput } from '../Inputs'
import { Button } from '../Button'
import { capitalize, separate } from '../../utils/StringUtils'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: 0 auto;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  width: 500px;
`

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
    <Container>
      <h1>Log In</h1>
      {makeInput("email", email)}
      {makeInput("password", password)}
      <ButtonContainer>
        <div>
          <Button onClick={() => loginUser()}>Log In</Button>
        </div>
        <div>
          {errors && errors.map(error => <div key={error.msg}>{error.msg}</div>)}
        </div>
      </ButtonContainer>
    </Container>
  );
};

export default Login;
