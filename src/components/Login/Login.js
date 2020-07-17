import React from 'react';
import { fetchAuth } from '../../fetches/fetches';
import { Redirect } from 'react-router-dom';


function Login() {
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
  console.log('fasfas', message)
  if (redirect) {
    return <Redirect to="/" />
  } else {
    return (
      <div>
        <h1>Login</h1>
          <form>
            <div>
              <label>Email</label>
              <input 
                name='email' 
                onChange={onInputChange}
              /><br/>
              <label>Password</label>
              <input
                name='password'
                type="password"
                onChange={onInputChange}
              /><br/>
              <button onClick={onBtnClick}>
                Sign up
              </button>
            </div>
          </form>
      </div>
    );
  }
}

export default Login;