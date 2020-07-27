import React from 'react';
import { fetchAuth } from '../../fetches/fetches';
import { Redirect } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import classes from './Login.module.css';


function Login(props) {
	const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [message, setMessage] = React.useState('');
	const [redirect, setRedirect] = React.useState(false);

  const onInputChange = (e) => {
    const { name } = e.currentTarget
    name === 'email' ? setEmail(e.currentTarget.value) : setPassword(e.currentTarget.value)
	}
	
  const onBtnClick = (e) => { 
    e.preventDefault();
    fetchAuth('http://localhost:3000/login', email, password, setMessage, setRedirect);
  }

  if (redirect || props.user) {
    return <Redirect to="/" />
  } else {
    return (
      <div>
        <h1>Login</h1>
        <label className={classes.error} hidden={!message}>{message}</label><br/>
        <TextField 
            name='email'
            className={classes.input} 
            required 
            id="standard-required" 
            label="Email"
            onChange={onInputChange}
          /><br/>
          <TextField
            name='password'
            className={classes.input}
            id="standard-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={onInputChange}
          /><br/>
          <Button onClick={onBtnClick} variant="contained" color="primary">
            Sign in
          </Button>
      </div>
    );
  }
}

export default Login;