import React, { useState } from 'react';
import { Header } from '../Header/Header';
import { Menu } from '../Menu/Menu';
import { TasksPage } from './Tasks/TasksPage';
import { BrowserRouter } from 'react-router-dom';
import { ProjectsPage } from './Projects/ProjectsPage';
import { useFirebaseProjects, useFirebaseTasks } from '../firebase/firebase';

export const ProjectContext = React.createContext();
export const TaskContext = React.createContext();

export const AppWrap = () => {
  const {
    projects,
    isLoadingProjects,
    errorLoadingProjects,
    addProject,
    removeProject,
    editProject,
  } = useFirebaseProjects();

  const {
    tasks,
    isLoadingTasks,
    errorLoadingTasks,
    addTask,
    editTask,
    removeTask,
  } = useFirebaseTasks();

  if (isLoadingProjects || isLoadingTasks) {
    return '...Loading....';
  }

  if (errorLoadingProjects || errorLoadingTasks) {
    return `There is error ${
      errorLoadingProjects ? errorLoadingProjects : ''
    }, ${errorLoadingTasks ? errorLoadingTasks : ''}`;
  }

  return (
    <>
      <BrowserRouter>
        <Header />
        <TaskContext.Provider value={{ tasks, addTask, removeTask, editTask }}>
          <ProjectContext.Provider
            value={{ projects, addProject, removeProject, editProject }}
          >
            <Menu />
            <TasksPage />
            <ProjectsPage />
          </ProjectContext.Provider>
        </TaskContext.Provider>
      </BrowserRouter>
    </>
  );
};
