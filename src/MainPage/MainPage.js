import React from 'react';
import { ProjectsPage } from '../Components/Projects/ProjectsPage';
import { Menu } from '../Menu/Menu';
import { TasksPage } from '../Components/Tasks/TasksPage';

export const MainPage = ({ className }) => {
  return (
    <div className={className}>
      <Menu />
      <TasksPage />
      <ProjectsPage />
    </div>
  );
};
