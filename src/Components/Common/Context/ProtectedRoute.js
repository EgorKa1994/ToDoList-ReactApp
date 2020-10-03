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
          <Route path={props.path}>
            {({ location }) => (
              <Redirect
                to={{ pathname: '/login', state: { location } }}
              ></Redirect>
            )}
          </Route>
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
          <Redirect to='/tasks/inbox'></Redirect>
        ) : (
          <Route path={props.path}>{props.children}</Route>
        )
      }
    </UserConsumer>
  );
};
