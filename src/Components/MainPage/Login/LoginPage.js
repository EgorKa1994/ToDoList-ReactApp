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
import { NotFoundPage } from '../../Common/Components/comComponent';

export const LoginPage = () => {
  return (
    <Switch>
      <ProtectedRouteNonUser exact path='/'>
        <Redirect to='/start' />
      </ProtectedRouteNonUser>
      <ProtectedRouteNonUser path='/registration'>
        <RegistrationForm />
      </ProtectedRouteNonUser>
      <Route path='/login'>
        <LoginForm />
      </Route>
      <ProtectedRoute path='/account'>
        <AccountPage />
      </ProtectedRoute>
      <Route path='/start'>
        <StartPage />
      </Route>
      <Route>
        <NotFoundPage />
      </Route>
    </Switch>
  );
};
