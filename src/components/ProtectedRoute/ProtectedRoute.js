import React from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = (props) => {
  const { component, user, load, path, store } = props;

  const Component = component;
  const isAuthenticated = user;

  if (load) {
    return <div>Load</div>;
  }

  if (isAuthenticated && (path === "/login" || path === "/registration")) {
    return <Redirect to="/books" />;
  }

  if (!isAuthenticated && !(path === "/login" || path === "/registration")) {
    return <Redirect to="/login" />;
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
