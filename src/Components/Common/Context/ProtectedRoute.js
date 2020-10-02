import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserConsumer } from '../Context/Context';

export const ProtectedRoute = (props) => {
  return (
    <UserConsumer>
      {({ user }) =>
        user ? (
          <Route path={props.path}>{props.children}</Route>
        ) : (
          <Redirect to='/start'></Redirect>
        )
      }
    </UserConsumer>
  );
};

export const ProtectedRouteNonUser = (props) => {
  return (
    <UserConsumer>
      {({ user }) =>
        user ? (
          <Redirect to='/inbox'></Redirect>
        ) : (
          <Route path={props.path}>{props.children}</Route>
        )
      }
    </UserConsumer>
  );
};
