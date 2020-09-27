import React from 'react';
import {
  BrowserRouter,
  Link,
  NavLink,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

const MenuItem = ({ children }) => {
  return <div>{children}</div>;
};

export const Menu = () => {
  return (
    <div>
      <MenuItem>
        <NavLink to='/inbox'>Inbox</NavLink>
      </MenuItem>
      <MenuItem>
        <NavLink to='/focus'>Focus</NavLink>
      </MenuItem>
      <MenuItem>
        <NavLink to='/project'>Projects</NavLink>
      </MenuItem>
    </div>
  );
};
