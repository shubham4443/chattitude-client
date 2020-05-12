import React from 'react';
import {Router, Route, Switch, Redirect} from "react-router-dom";
import history from './history';
import {Spin} from "antd";
import { useSelector } from 'react-redux';

// pages
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';

const PrivateRoute = ({component: Component, ...rest}) => {
  const isLoggedIn = useSelector(state => state.uiState.isLoggedIn);
  const app_initializing = useSelector(state => state.uiState.app_initializing);

  return (
    app_initializing ? <Spin /> :
    <Route {...rest} render={props => (
      isLoggedIn ?
          <Component {...props} />
      : <Redirect to="/login" />
  )} />
  )
}

const RestrictedRoute = ({component: Component, ...rest}) => {
  const isLoggedIn = useSelector(state => state.uiState.isLoggedIn);
  const app_initializing = useSelector(state => state.uiState.app_initializing);

  return (
    app_initializing ? <Spin /> :
    <Route {...rest} render={props => (
      !isLoggedIn ?
          <Component {...props} />
      : <Redirect to="/" />
  )} />
  )
}

const Routes = () => {
  return (
    <Router history={history}>
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <RestrictedRoute exact path="/login" component={Login} />
        <RestrictedRoute exact path="/register" component={Register} />
      </Switch>
    </Router>
  )
}

export default Routes;