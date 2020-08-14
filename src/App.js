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

import { getMyProfile, saveToken } from "./actions/actionCreators";
import Book from "./components/Book/Book";
import Basket from "./components/Basket/Basket";

function App(props) {
  console.log(props);
  const { getMyProfile, token, saveToken, user } = props;

  useEffect(() => {
    if (localStorage.token && !props.user.email) {
      saveToken();
    }

    if (token.token) {
      getMyProfile(token.token);
    }
  }, [token.token]);

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
          <Route path="/:book" render={() => <Book />} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

const mapStateToProps = (store) => ({
  user: store.user,
  token: store.token,
});

const mapDispatchToProps = {
  getMyProfile,
  saveToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
