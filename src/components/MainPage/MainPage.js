import React from 'react';

function MainPage() {
	const logOut = (e) => {
    e.preventDefault();
    localStorage.setItem('token', '')
  }
  return (
		<div>
			<h1>Welcom!</h1>
      {localStorage.token ? <button onClick={logOut}>Выйти</button> : ''}
		</div>
  );
}

export default MainPage;