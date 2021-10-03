import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Home from './pages/Home.jsx';

function App() {
  return (
    <Router>
    <div className="App-header">
      <Switch>
        <Route path="/login">
          <h2>aaaaaaaaaaa</h2>
        </Route>
        <Route path="/">
          <Home/>
        </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
