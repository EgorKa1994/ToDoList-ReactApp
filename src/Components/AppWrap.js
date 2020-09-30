import React from 'react';
import { Header } from './Header/Header';
import { BrowserRouter } from 'react-router-dom';
import { useFirebaseProjects, useFirebaseTasks } from '../firebase/firebase';
import { MainPage } from './MainPage/MainPage';
import '../Stylesheets/style.scss';

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
      <div id='app'>
        <BrowserRouter>
          <Header />
          <TaskContext.Provider
            value={{ tasks, addTask, removeTask, editTask }}
          >
            <ProjectContext.Provider
              value={{ projects, addProject, removeProject, editProject }}
            >
              <MainPage className={'mainPage'} />
            </ProjectContext.Provider>
          </TaskContext.Provider>
        </BrowserRouter>
      </div>
    </>
  );
};
