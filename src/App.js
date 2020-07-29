import React, { useEffect } from 'react';
import './App.css';
import Login from './components/Login/Login';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Registration from './components/Registration/Registration';
import MainPage from './components/MainPage/MainPage';
import Profile from './components/Profile/Profile';
import Header from './components/Header/Header';
import { connect } from 'react-redux';

import { getMyProfile } from './actions/actionCreators';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import AddBook from './components/AddBook/AddBook';

function App(props) {
  useEffect(() => {
    if (localStorage.token && !props.user.email) {
      props.getMyProfile();
    }
  },[]);

  return (
    <BrowserRouter>
      <div className="App">
        <Header load={props.user.loading} user={props.user.email} />     
        <Switch>
          <ProtectedRoute user={props.user.email} load={props.user.loading} component={Profile} path='/profile' />
          <Route path='/add_book' render={ () => <AddBook />} />
          <Route path='/login' render={ () => <Login user={props.user.email}/>} />
          <Route path='/registration' render={ () => <Registration user={props.user.email}/>} />
          <Route path='/' render={ () => <MainPage user={props.user.email} />} />
        </Switch>
      </div>
    </BrowserRouter> 
  );
}

const mapStateToProps = store => {
  return {user: store.user}
}

const mapDispatchToProps = {
  getMyProfile,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
