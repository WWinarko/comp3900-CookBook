import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
// import Home from './pages/Home.jsx';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Navbar />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
