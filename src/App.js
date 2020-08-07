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

import { getMyProfile } from "./actions/actionCreators";
import Book from "./components/Book/Book";

function App(props) {
  console.log(props);
  useEffect(() => {
    if (localStorage.token && !props.user.email) {
      props.getMyProfile();
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Header load={props.user.loading} user={props.user.email} />
        <Switch>
          <ProtectedRoute
            user={props.user.email}
            load={props.user.loading}
            component={Profile}
            path="/profile"
          />
          <ProtectedRoute
            user={props.user.email}
            load={props.user.loading}
            store={props}
            component={Login}
            path="/login"
          />
          {/* <Route path="/login" render={() => <Login />} />
          <Route path="/registration" render={() => <Registration />} /> */}
          <ProtectedRoute
            user={props.user.email}
            load={props.user.loading}
            component={Registration}
            path="/registration"
          />
          <ProtectedRoute
            user={props.user.email}
            load={props.user.loading}
            store={props}
            component={MainPage}
            path="/books"
          />
          <Route path="/:book" render={() => <Book />} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

const mapStateToProps = (store) => {
  return { user: store.user };
};

const mapDispatchToProps = {
  getMyProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
