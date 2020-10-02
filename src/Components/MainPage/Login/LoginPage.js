import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { RegistrationForm } from './LoginComponents/RegistrationForm';
import { LoginForm } from './LoginComponents/LoginForm';
import { AccountPage } from '../Login/LoginComponents/AccountPage';
import { StartPage } from '../Login/LoginComponents/StartPage';

export const LoginPage = () => {
  return (
    <Switch>
      <Route exact path='/'>
        <Redirect to='/start' />
      </Route>
      <Route path='/registration'>
        <RegistrationForm />
      </Route>
      <Route path='/login'>
        <LoginForm />
      </Route>
      <Route path='/account'>
        <AccountPage />
      </Route>
      <Route path='/start'>
        <StartPage />
      </Route>
    </Switch>
  );
};
