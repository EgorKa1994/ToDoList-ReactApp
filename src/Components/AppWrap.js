import React from 'react';
import { Header } from './Header/Header';
import { BrowserRouter } from 'react-router-dom';
import {
  useFirebaseProjects,
  useFirebaseTasks,
  useFirebaseUser,
} from '../firebase/firebase';
import { MainPage } from './MainPage/MainPage';
import '../Stylesheets/style.scss';
import {
  ProjectProvider,
  TaskProvider,
  UserProvider,
} from './Common/Context/Context';
import { PreLoader } from '../Components/Common/Components/comComponent';

export const AppWrap = ({ user }) => {
  // const {
  //   user,
  //   isLoadingUser,
  //   errorLoadingUser,
  //   register,
  //   logIn,
  //   logOut,
  //   update,
  // } = useFirebaseUser();

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
          {/* <UserProvider value={{ user, register, logIn, logOut, update }}> */}
          <Header />
          <TaskProvider value={{ tasks, addTask, removeTask, editTask }}>
            <ProjectProvider
              value={{ projects, addProject, removeProject, editProject }}
            >
              <MainPage className={'mainPage'} />
            </ProjectProvider>
          </TaskProvider>
          {/* </UserProvider> */}
        </BrowserRouter>
      </div>
    </>
  );
};
