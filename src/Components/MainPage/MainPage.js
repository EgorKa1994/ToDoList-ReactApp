import React from 'react';
import { ProjectsPage } from '../MainPage/Projects/ProjectsPage';
import { Menu } from '../MainPage/Menu.js/Menu';
import { TasksPage } from '../MainPage/Tasks/TasksPage';
import { LoginPage } from './Login/LoginPage';
import { Switch, Route } from 'react-router-dom';
import { NotFoundPage } from '../Common/Components/NotFoundPage';
import { ErrorBoundary } from '../Common/ErrorBoundary/ErrorBoundary';

export const MainPage = ({ className }) => {
  return (
    <div className={className}>
      <Menu />
      <ErrorBoundary>
        <Switch>
          <Route path='/tasks'>
            <TasksPage />
          </Route>
          <Route path='/projects'>
            <ProjectsPage />
          </Route>
          <Route path='/'>
            <LoginPage />
          </Route>
          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </ErrorBoundary>
    </div>
  );
};
