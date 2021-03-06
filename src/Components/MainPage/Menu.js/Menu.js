import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { ProjectContext } from '../../../Components/Common/Context/Context';
import clsx from 'clsx';
import { UserContext, LanguageContext } from '../../Common/Context/Context';
import { dictionaries } from '../../../Dictionaries/Dictionaries';

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

const ProjectInMenu = () => {
  const { user } = useContext(UserContext);
  const { projects } = useContext(ProjectContext);
  const history = useHistory();

  const onClick = (id) => {
    history.push(`/projects/${id}`);
  };

  if (!user) {
    return null;
  } else {
    return (
      <ul>
        {projects.map((project) => {
          if (project.userId == user.uid) {
            return (
              <li onClick={() => onClick(project.id)} key={project.id}>
                {project.name}
              </li>
            );
          }
        })}
      </ul>
    );
  }
};

export const Menu = () => {
  const { projects } = useContext(ProjectContext);
  const { language } = useContext(LanguageContext);

  return (
    <div className='menu'>
      <MenuItem kind='menu_item__inbox'>
        <NavLink to='/tasks/inbox'>
          <MenuItemContent>{dictionaries[language].Inbox}</MenuItemContent>
        </NavLink>
      </MenuItem>
      <MenuItem kind='menu_item__focus'>
        <NavLink to='/tasks/focus'>
          <MenuItemContent>{dictionaries[language].Focus}</MenuItemContent>
        </NavLink>
      </MenuItem>
      <MenuItem kind='menu_item__project'>
        <NavLink to='/projects/inbox'>
          <MenuItemContent>{dictionaries[language].Projects}</MenuItemContent>
        </NavLink>
        <ProjectInMenu projects={projects} />
      </MenuItem>
    </div>
  );
};
