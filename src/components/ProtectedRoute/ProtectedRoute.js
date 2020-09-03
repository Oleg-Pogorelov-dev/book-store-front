import React from "react";
import { Redirect, Route } from "react-router-dom";
import { Backdrop, CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const ProtectedRoute = (props) => {
  const { component, user, load, path, store } = props;

  const Component = component;
  const isAuthenticated = user.email;

  const classes = useStyles();

  if (user.loading || load) {
    const loading = user.loading || load;
    return (
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  if (isAuthenticated && (path === "/login" || path === "/registration")) {
    return <Redirect to="/" />;
  }

  if (!isAuthenticated && !(path === "/login" || path === "/registration")) {
    setTimeout(() => {
      return <Redirect to="/login" />;
    }, 0);
  }

  return (
    <Route
      path={path}
      render={() => {
        return <Component page={store} user={user} />;
      }}
    />
  );
};

export default ProtectedRoute;
