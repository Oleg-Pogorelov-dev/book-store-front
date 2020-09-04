import React, { useEffect } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import { connect } from "react-redux";

import "./App.css";
import Login from "./components/Auth/Login/Login";
import Registration from "./components/Auth/Registration/Registration";
import MainPage from "./components/MainPage/MainPage";
import Profile from "./components/Profile/Profile";
import Header from "./components/HeaderComponents/Header/Header";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import {
  getMyProfile,
  requestToken,
  setMessage,
} from "./store/actions/actionCreators";
import Book from "./components/Book/Book";
import Basket from "./components/HeaderComponents/Basket/Basket";
import Author from "./components/Author/Author";
import Page404 from "./components/Page404/Page404";
import ToastWrapper, { notify } from "./helpers/toastify";

function App(props) {
  const {
    getMyProfile,
    user,
    requestToken,
    token,
    status_code,
    message,
    setMessage,
  } = props;

  useEffect(() => {
    if (!token) {
      requestToken();
    }

    if (message) {
      notify(setMessage, message);
    }

    if (!user.email) {
      getMyProfile();
    }
  }, [message]);

  return (
    <BrowserRouter>
      <div className="App">
        <Header load={props.user.loading} user={props.user.email} />
        <ToastWrapper />
        {status_code === 404 ? (
          <Page404 />
        ) : (
          <Switch>
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
        )}
      </div>
    </BrowserRouter>
  );
}

const mapStateToProps = (store) => ({
  user: store.user,
  token: store.token,
  status_code: store.status_code,
  message: store.message,
});

const mapDispatchToProps = {
  getMyProfile,
  requestToken,
  setMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
