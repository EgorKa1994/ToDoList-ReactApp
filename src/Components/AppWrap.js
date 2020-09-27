import React, { useState } from 'react';
import { Header } from '../Header/Header';
import { Menu } from '../Menu/Menu';
import { TasksPage } from './Tasks/TasksPage';
import { BrowserRouter } from 'react-router-dom';
import { ProjectsPage } from './Projects/ProjectsPage';
import { useFirebaseProjects } from '../firebase/firebase';

export const ProjectContext = React.createContext();

export const AppWrap = () => {
  const {
    projects,
    isLoading,
    error,
    add,
    remove,
    edit,
  } = useFirebaseProjects();

  if (isLoading) {
    return '...Loading....';
  }

  if (error) {
    return `There is error ${error}`;
  }

  return (
    <>
      <BrowserRouter>
        <Header />
        <ProjectContext.Provider value={{ projects, add, remove, edit }}>
          <Menu />
          <TasksPage />
          <ProjectsPage />
        </ProjectContext.Provider>
      </BrowserRouter>
    </>
  );
};
