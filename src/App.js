import React from 'react';
import './App.css';
import Login from './components/Login/Login';
import { Route, BrowserRouter } from 'react-router-dom';
import Registration from './components/Registration/Registration';
import MainPage from './components/MainPage/MainPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route path='/' render={ () => <MainPage />} />
        <Route path='/login' render={ () => <Login />} />
        <Route path='/registration' render={ () => <Registration />} />
      </div>
    </BrowserRouter>
  );
}

export default App;
