import React, { useContext } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ProjectsList } from './ProjectsList';
import { ProjectAddForm } from './ProjectAddForm';
import { ProjectContext } from '../../Components/AppWrap';

export const ProjectsPage = () => {
  const { projects, add } = useContext(ProjectContext);

  console.log(add);
  return (
    <Switch>
      <Route exact path='/'>
        <Redirect to='/inbox' />
      </Route>
      <Route exact path='/projects'>
        <ProjectsList projects={projects} />
      </Route>
      <Route exact path='/project/new'>
        <ProjectAddForm add={add} />
      </Route>
    </Switch>
  );
};
