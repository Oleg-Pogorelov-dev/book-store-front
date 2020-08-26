import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Button, Typography, Toolbar } from "@material-ui/core";
import classes from "./Header.module.css";
import { connect } from "react-redux";
import { setNotificationTrue } from "../../actions/actionCreators";

function Header(props) {
  const { notification, user, setNotificationTrue, load } = props;

  useEffect(() => {
    if (localStorage.getItem("basket")) {
      setNotificationTrue();
    }
  }, [setNotificationTrue]);

  const logOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("refresh-token");
    window.location.reload();
  };

  return (
    <div className={classes.header}>
      {load ? (
        <div></div>
      ) : (
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              <Link to="/books" className={classes.link}>
                Book store
              </Link>
            </Typography>
            {!user ? (
              <div className={classes.tabs_log}>
                <Link className={classes.basket} to="/basket">
                  <ShoppingBasketIcon />
                </Link>
                {notification.notification ? (
                  <div className={classes.notification}></div>
                ) : (
                  <div></div>
                )}
                <Link to="/registration" className={classes.link}>
                  <Button color="inherit">Sign up</Button>
                </Link>
                <Link to="/login" className={classes.link}>
                  <Button color="inherit">Sign in</Button>
                </Link>
              </div>
            ) : (
              <div className={classes.tabs_log}>
                <Link className={classes.basket} to="/basket">
                  <ShoppingBasketIcon />
                </Link>
                {notification.notification ? (
                  <div className={classes.notification}></div>
                ) : (
                  <div></div>
                )}
                <Button color="inherit" onClick={logOut}>
                  Log Out
                </Button>
                <Link to="/profile" className={classes.link}>
                  <Button color="inherit">{user}</Button>
                </Link>
              </div>
            )}
          </Toolbar>
        </AppBar>
      )}
    </div>
  );
}

const mapStateToProps = (store) => {
  return { notification: store.notification };
};

const mapDispatchToProps = {
  setNotificationTrue,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
