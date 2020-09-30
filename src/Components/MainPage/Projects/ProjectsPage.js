import React, { useContext } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ProjectsListWrap } from './Inbox/ProjectsListWrap';
import { ProjectContext } from '../../../Components/AppWrap';
import { ProjectForm } from './Inbox/ProjectForm';
import { ProjectDetails } from './Inbox/ProjectDetails';

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
        <ProjectsListWrap projects={projects} removeProject={removeProject} />
      </Route>
      <Route path='/project/new'>
        <ProjectForm addProject={addProject} />
      </Route>
      <Route exact path='/project/edit/:projectId'>
        {({
          match: {
            params: { projectId },
          },
        }) => <ProjectForm projectId={projectId} editProject={editProject} />}
      </Route>
      <Route path='/project/:projectId'>
        {({
          match: {
            params: { projectId },
          },
        }) => (
          <ProjectDetails
            project={projects.filter((project) => project.id == projectId)[0]}
            removeProject={removeProject}
          />
        )}
      </Route>
    </Switch>
  );
};
