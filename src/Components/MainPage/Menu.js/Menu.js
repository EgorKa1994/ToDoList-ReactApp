import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { ProjectContext } from '../../../Components/Common/Context/Context';
import clsx from 'clsx';

const itemKind = {
  inbox: 'menu_item__inbox',
  focus: 'menu_item__focus',
  project: 'menu_item__project',
};

const MenuItem = ({ children, kind }) => {
  let className = clsx('menu_item', {
    menu_item__inbox: kind === itemKind.inbox,
    menu_item__focus: kind === itemKind.focus,
    menu_item__project: kind === itemKind.project,
  });

  return <div className={className}>{children}</div>;
};

const MenuItemContent = ({ children }) => {
  return <div>{children}</div>;
};

const ProjectInMenu = ({ projects }) => {
  return (
    <ul>
      {projects.map((project) => (
        <li key={project.id}>{project.name}</li>
      ))}
    </ul>
  );
};

export const Menu = () => {
  const { projects } = useContext(ProjectContext);

  return (
    <div className='menu'>
      <MenuItem kind='menu_item__inbox'>
        <NavLink to='/tasks/inbox'>
          <MenuItemContent>Inbox</MenuItemContent>
        </NavLink>
      </MenuItem>
      <MenuItem kind='menu_item__focus'>
        <NavLink to='/tasks/focus'>
          <MenuItemContent>Focus</MenuItemContent>
        </NavLink>
      </MenuItem>
      <MenuItem kind='menu_item__project'>
        <NavLink to='/projects/inbox'>
          <MenuItemContent>Projects</MenuItemContent>
        </NavLink>
        <ProjectInMenu projects={projects} />
      </MenuItem>
    </div>
  );
};
