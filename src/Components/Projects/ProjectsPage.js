import React, { useContext } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ProjectsList } from './ProjectsList';
import { ProjectAddForm } from './ProjectAddForm';
import { ProjectContext } from '../../Components/AppWrap';
import { ProjectEditForm } from './ProjectEditForm';
import { ProjectDetails } from './ProjectDetails';

export const ProjectsPage = () => {
  const { projects, addProject, removeProject, editProject } = useContext(
    ProjectContext
  );

  return (
    <Switch>
      <Route exact path='/'>
        <Redirect to='/inbox' />
      </Route>
      <Route exact path='/projects'>
        <ProjectsList projects={projects} removeProject={removeProject} />
      </Route>
      <Route path='/project/new'>
        <ProjectAddForm addProject={addProject} />
      </Route>
      <Route exact path='/project/edit/:projectId'>
        {({
          match: {
            params: { projectId },
          },
        }) => (
          <ProjectEditForm projectId={projectId} editProject={editProject} />
        )}
      </Route>
      <Route path='/project/:projectId'>
        {({
          match: {
            params: { projectId },
          },
        }) => (
          <ProjectDetails
            project={projects.filter((project) => project.id == projectId)[0]}
          />
        )}
      </Route>
    </Switch>
  );
};
