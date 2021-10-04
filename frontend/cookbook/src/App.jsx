import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
