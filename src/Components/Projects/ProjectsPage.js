import React, { useContext } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ProjectsList } from './ProjectsList';
import { ProjectAddForm } from './ProjectAddForm';
import { ProjectContext } from '../../Components/AppWrap';
import { ProjectEditForm } from './ProjectEditForm';

export const ProjectsPage = () => {
  const { projects, add, remove, edit } = useContext(ProjectContext);

  return (
    <Switch>
      <Route exact path='/'>
        <Redirect to='/inbox' />
      </Route>
      <Route exact path='/projects'>
        <ProjectsList projects={projects} remove={remove} />
      </Route>
      <Route exact path='/project/new'>
        <ProjectAddForm add={add} />
      </Route>
      <Route path='/project/edit/:projectId'>
        {({
          match: {
            params: { projectId },
          },
        }) => <ProjectEditForm projectId={projectId} edit={edit} />}
      </Route>
    </Switch>
  );
};
