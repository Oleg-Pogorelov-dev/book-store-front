import React from 'react';
import './App.css';
import Login from './components/Login/Login';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Registration from './components/Registration/Registration';
import MainPage from './components/MainPage/MainPage';
import Profile from './components/Profile/Profile';
import { Redirect } from 'react-router-dom'
import Header from './components/Header/Header';

const ProtectedRoute = (props) => {
  const Component = props.component;
  const isAuthenticated = localStorage.getItem('token');
  
  return <Route path={props.path} render={ () => {
      if (isAuthenticated) {
        return <Component />
      } else {
        return <Redirect to={{ pathname: '/login' }} />
      }
      
    }} />
}

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />     
        <Switch>
          <ProtectedRoute component={Profile} path='/profile' />
          <Route path='/login' render={ () => <Login />} />
          <Route path='/registration' render={ () => <Registration />} />
          <Route path='/' render={ () => <MainPage />} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
