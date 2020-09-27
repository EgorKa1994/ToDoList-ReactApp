import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { ProjectContext } from '../Components/AppWrap';

const MenuItem = ({ children }) => {
  return <div>{children}</div>;
};

export const Menu = () => {
  const { projects } = useContext(ProjectContext);

  return (
    <div>
      <MenuItem>
        <NavLink to='/inbox'>Inbox</NavLink>
      </MenuItem>
      <MenuItem>
        <NavLink to='/focus'>Focus</NavLink>
      </MenuItem>
      <MenuItem>
        <NavLink to='/projects'>Projects</NavLink>
        <ul>
          {projects.map((project) => (
            <li key={project.id}>{project.name}</li>
          ))}
        </ul>
      </MenuItem>
    </div>
  );
};
