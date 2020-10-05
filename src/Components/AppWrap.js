import React, { useState } from 'react';
import { Header } from './Header/Header';
import { BrowserRouter } from 'react-router-dom';
import { useFirebaseProjects, useFirebaseTasks } from '../firebase/firebase';
import { MainPage } from './MainPage/MainPage';
import '../Stylesheets/style.scss';
import { ProjectProvider, TaskProvider } from './Common/Context/Context';
import { PreLoader } from '../Components/Common/Components/Preloader';
import { LanguageProvider } from '../Components/Common/Context/Context';

export const AppWrap = ({ user }) => {
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
  } = useFirebaseTasks({ user });

  const [language, setLanguage] = useState('EN');

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  if (isLoadingProjects || isLoadingTasks) {
    return <PreLoader />;
  }

  if (errorLoadingProjects || errorLoadingTasks) {
    if (errorLoadingProjects) {
      return `There is error ${errorLoadingProjects}`;
    } else if (errorLoadingTasks) {
      return `There is error ${errorLoadingTasks}`;
    }
  }

  return (
    <>
      <div id='app'>
        <BrowserRouter>
          <LanguageProvider value={{ language, changeLanguage }}>
            <Header changeLanguage={changeLanguage} />
            <TaskProvider value={{ tasks, addTask, removeTask, editTask }}>
              <ProjectProvider
                value={{ projects, addProject, removeProject, editProject }}
              >
                <MainPage className={'mainPage'} />
              </ProjectProvider>
            </TaskProvider>
          </LanguageProvider>
        </BrowserRouter>
      </div>
    </>
  );
};
