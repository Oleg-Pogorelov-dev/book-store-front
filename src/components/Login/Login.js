import React from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';


function Login() {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [redirect, setRedirect] = React.useState(false);

	console.log(email)

  const onInputChange = (e) => {
    const { name } = e.currentTarget
    name === 'email' ? setEmail(e.currentTarget.value) : setPassword(e.currentTarget.value)
	}
	
	fetch('http://localhost:3000/', {
			method: 'GET',
      headers: {
				'Content-Type': 'application/json',
				'Access-Token': localStorage.getItem('token'),
      }
	}).then(response => response.json())
	.then(data => console.log(data))

  const onBtnClick = (e) => { 
		e.preventDefault();
    fetch('http://localhost:3000/login', {
			method: 'POST',
      body: JSON.stringify({
				login: email,
				password: password
			}),
      headers: {
        'Content-Type': 'application/json',
			}
		}).then(response => response.json())
		.then(data => {
			localStorage.setItem( 'token', data.token);
		})
  }

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

export default Login;