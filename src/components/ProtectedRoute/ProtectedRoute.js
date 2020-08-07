import React from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = (props) => {
  const Component = props.component;
  const isAuthenticated = props.user;

  if (props.load) {
    return <div>Load</div>;
  }

  if (
    isAuthenticated &&
    (props.path === "/login" || props.path === "/registration")
  ) {
    return <Redirect to="/books" />;
  }

  if (
    !isAuthenticated &&
    !(props.path === "/login" || props.path === "/registration")
  ) {
    return <Redirect to="/login" />;
  }

  return (
    <Route
      path={props.path}
      render={() => {
        return <Component page={props.store} user={props.user} />;
      }}
    />
  );
};

export default ProtectedRoute;
