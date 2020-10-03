import React, { useContext } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ProjectsListWrap } from './Inbox/ProjectsListWrap';
import { ProjectContext } from '../../../Components/Common/Context/Context';
import { ProjectForm } from './Inbox/ProjectForm';
import { ProjectDetails } from './Inbox/ProjectDetails';
import { ProtectedRoute } from '../../Common/Context/ProtectedRoute';
import { NotFoundPage } from '../../Common/Components/comComponent';

export const ProjectsPage = () => {
  const { projects, addProject, removeProject, editProject } = useContext(
    ProjectContext
  );

  return (
    <Switch>
      <Route exact path='/projects'>
        <Redirect to='/projects/inbox' />
      </Route>
      <ProtectedRoute exact path='/projects/inbox'>
        <ProjectsListWrap projects={projects} removeProject={removeProject} />
      </ProtectedRoute>
      <ProtectedRoute path='/projects/new'>
        <ProjectForm addProject={addProject} />
      </ProtectedRoute>
      <ProtectedRoute exact path='/projects/edit/:projectId'>
        {({
          match: {
            params: { projectId },
          },
        }) => <ProjectForm projectId={projectId} editProject={editProject} />}
      </ProtectedRoute>
      <ProtectedRoute path='/projects/:projectId'>
        {({
          match: {
            params: { projectId },
          },
        }) => (
          <ProjectDetails
            project={projects.filter((project) => project.id == projectId)[0]}
            removeProject={removeProject}
            projectId={projectId}
            projects={projects}
          />
        )}
      </ProtectedRoute>
      <Route>
        <NotFoundPage />
      </Route>
    </Switch>
  );
};
