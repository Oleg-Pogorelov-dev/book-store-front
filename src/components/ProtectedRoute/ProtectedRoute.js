import React from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = (props) => {
  const Component = props.component;
  const isAuthenticated = props.user;

  if (props.load) {
    return <div>Load</div>;
  }
  return (
    <Route
      path={props.path}
      render={() => {
        // if (isAuthenticated) {
        return <Component user={props.user} />;
        // } else {
        //   return <Redirect to={{ pathname: '/login' }} />
        // }
      }}
    />
  );
};

export default ProtectedRoute;
