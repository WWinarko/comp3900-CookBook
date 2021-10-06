import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Recipe from './pages/Recipe';
import AddRecipe from './pages/AddRecipe';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route exact path="/recipe/add">
          <AddRecipe />
        </Route>
        <Route path="/recipe/:recipeId">
          <Recipe />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
