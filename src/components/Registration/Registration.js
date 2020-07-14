import React from 'react';


function Registration() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwrod_confirmation, setPasswrodConfirmation] = React.useState('');
  const [redirect, setRedirect] = React.useState(false);

  // onInputChange = (e) => {
  //   const { name } = e.currentTarget
  //   this.setState({ [name]: e.currentTarget.value })
  // }

  const onBtnClick = () => {  
    fetch('https://localhost/registration', {
      method: 'POST',
      body: JSON.stringify({
				email: email,
				password: password
			}),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(res => res.json())
    .then(res => {
      if (res.status === 'success'){
        fetch('https://localhost:3000/login', {
          method: 'POST',
          body: JSON.stringify({
            login: email,
            password: password
          }),
          headers: {
          'Content-Type': 'application/json'
          }
        })
        .then(response => {
          localStorage.setItem('token', response.headers.get('token'));
          // window.location.reload();
        })
      }
    })
  }

  return (
    <div>
      <h1>Registration</h1>
      <form>
        <div>
          <label>Email</label>
          <input 
            name='email'
            // onChange={this.onInputChange}
          /><br/>
          <label>Password</label>
          <input
            name='password'
            type="password"
            // onChange={this.onInputChange}
          /><br/>
          <label>Password confirmation</label>
          <input
            name='passwrod_confirmation'
            type="password"
            // onChange={this.onInputChange}
          /> 
          <br/>
          <button onClick={onBtnClick}>
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}

export default Registration;