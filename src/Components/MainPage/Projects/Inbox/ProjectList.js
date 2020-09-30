import React from 'react';

export const ProjectList = ({
  projects,
  removeProject,
  tasks,
  removeTask,
  history,
}) => {
  return (
    <ul className='list'>
      {projects.map((project) => (
        <li key={project.id}>
          <h3>{project.name}</h3>
          <div
            className='transitionToDetails'
            onClick={(e) => {
              e.stopPropagation();
              history.push(`/project/${project.id}`);
            }}
          ></div>
          <div
            className='edit'
            onClick={(e) => {
              e.stopPropagation();
              history.push(`/project/edit/${project.id}`);
            }}
          ></div>
          <div
            className='remove'
            onClick={async (e) => {
              e.stopPropagation();
              await removeProject(project.id);
              tasks.forEach((task) => {
                if (task.projectId == project.id) {
                  removeTask(task.id);
                }
              });
              history.push(`/projects`);
            }}
          ></div>
        </li>
      ))}
    </ul>
  );
};
