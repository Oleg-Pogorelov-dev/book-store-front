import React, { useEffect } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";

import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import MainPage from "./components/MainPage/MainPage";
import Profile from "./components/Profile/Profile";
import Header from "./components/Header/Header";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import { getMyProfile, requestToken } from "./actions/actionCreators";
import Book from "./components/Book/Book";
import Basket from "./components/Basket/Basket";
import Author from "./components/Author/Author";
import { accessToken, setAccessToken } from "./api/axiosInstance";

function App(props) {
  const { getMyProfile, user, requestToken, token } = props;

  useEffect(() => {
    if (!token || accessToken !== token) {
      requestToken();
      setAccessToken(token);
    }

    getMyProfile();
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Header load={props.user.loading} user={props.user.email} />
        <Switch>
          <ProtectedRoute user={user} component={Profile} path="/profile" />
          <ProtectedRoute
            user={user.email}
            load={user.loading}
            store={props}
            component={Login}
            path="/login"
          />
          <ProtectedRoute
            user={user.email}
            load={user.loading}
            component={Registration}
            path="/registration"
          />
          <Route
            path="/books"
            render={() => (
              <MainPage
                user={user.email}
                load={user.loading}
                store={props}
                component={MainPage}
              />
            )}
          />
          <Route path="/basket" render={() => <Basket user={user} />} />
          <Route path="/author/:author" render={() => <Author />} />
          <Route path="/:book" render={() => <Book user={user} />} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

const connectFunction = connect(
  (store) => ({
    user: store.user,
    token: store.token,
  }),
  {
    getMyProfile,
    requestToken,
  }
);

export default connectFunction(App);
