import React from 'react';
import { ProjectsPage } from '../MainPage/Projects/ProjectsPage';
import { Menu } from '../MainPage/Menu.js/Menu';
import { TasksPage } from '../MainPage/Tasks/TasksPage';
import { LoginPage } from './Login/LoginPage';

export const MainPage = ({ className }) => {
  return (
    <div className={className}>
      <Menu />
      <TasksPage />
      <ProjectsPage />
      <LoginPage />
    </div>
  );
};
