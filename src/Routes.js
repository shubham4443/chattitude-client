import React from 'react';
import {Router, Route, Switch} from "react-router-dom";
import history from './history';

// pages
import Login from './pages/login/Login';

const Routes = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/login" component={Login} />
      </Switch>
    </Router>
  )
}

export default Routes;