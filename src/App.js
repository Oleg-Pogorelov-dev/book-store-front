import React, { useEffect } from "react";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import "./App.css";
import Login from "./components/Auth/Login/Login";
import Registration from "./components/Auth/Registration/Registration";
import MainPage from "./components/MainPage/MainPage";
import Profile from "./components/Profile/Profile";
import Header from "./components/HeaderComponents/Header/Header";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { getMyProfile, requestToken } from "./store/actions/actionCreators";
import Book from "./components/Book/Book";
import Basket from "./components/HeaderComponents/Basket/Basket";
import Author from "./components/Author/Author";
import Page404 from "./components/Page404/Page404";

function App(props) {
  const { getMyProfile, user, requestToken, token, status_code } = props;

  useEffect(() => {
    if (!token) {
      requestToken();
    }

    getMyProfile();
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Header load={props.user.loading} user={props.user.email} />
        <Switch>
          <Route path="/404" render={() => <Page404 />} />
          {status_code === 404 ? <Redirect to="/404" /> : ""}
          <ProtectedRoute user={user} component={Profile} path="/profile" />
          <ProtectedRoute
            user={user}
            load={user.loading}
            store={props}
            component={Login}
            path="/login"
          />
          <ProtectedRoute
            user={user}
            load={user.loading}
            component={Registration}
            path="/registration"
          />
          <Route path="/basket" render={() => <Basket user={user} />} />
          <Route path="/author/:author" render={() => <Author />} />
          <Route path="/:book" render={() => <Book user={user} />} />
          <Route
            path="/"
            render={() => <MainPage user={user.email} load={user.loading} />}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

const connectFunction = connect(
  (store) => ({
    user: store.user,
    token: store.token,
    status_code: store.status_code,
  }),
  {
    getMyProfile,
    requestToken,
  }
);

export default connectFunction(App);
