import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import { Button, Typography, Toolbar } from '@material-ui/core';
import classes from './Header.module.css';


function Header(props) {

	const logOut = (e) => {
    e.preventDefault();
    localStorage.setItem('token', '');
    window.location.reload()
  }

  return (
    <div className={classes.header}>
      { props.load ?
        <div></div> 
        :
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              <Link to='/' className={classes.link} >
                  Main page
              </Link>
            </Typography>
            {
              !props.user ?
                <div className={classes.tabs_log}>
                    <Link to='/registration' className={classes.link} >
                      <Button color="inherit">Sign up</Button>  
                    </Link>  
                    <Link to='/login' className={classes.link} >         
                      <Button color="inherit">Sign in</Button>
                    </Link> 
                </div>
              : <div className={classes.tabs_log}>        
                  <Button color="inherit" onClick={logOut}>Log Out</Button>
                  <Link to='/profile' className={classes.link} >
                      <Button color="inherit">{props.user}</Button>
                  </Link>
                </div>
            }
          </Toolbar>
        </AppBar>
      }
    </div>
  );
}

export default Header;
