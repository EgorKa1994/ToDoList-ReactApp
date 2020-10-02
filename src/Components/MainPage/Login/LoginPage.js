import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { RegistrationForm } from './LoginComponents/RegistrationForm';
import { LoginForm } from './LoginComponents/LoginForm';
import { AccountPage } from '../Login/LoginComponents/AccountPage';
import { StartPage } from '../Login/LoginComponents/StartPage';
import {
  ProtectedRoute,
  ProtectedRouteNonUser,
} from '../../Common/Context/ProtectedRoute';

export const LoginPage = () => {
  return (
    <Switch>
      <Route exact path='/'>
        <Redirect to='/start' />
      </Route>
      <ProtectedRouteNonUser path='/registration'>
        <RegistrationForm />
      </ProtectedRouteNonUser>
      <ProtectedRouteNonUser path='/login'>
        <LoginForm />
      </ProtectedRouteNonUser>
      <ProtectedRoute path='/account'>
        <AccountPage />
      </ProtectedRoute>
      <Route path='/start'>
        <StartPage />
      </Route>
    </Switch>
  );
};
