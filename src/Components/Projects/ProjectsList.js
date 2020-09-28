import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { TaskContext } from '../AppWrap';

export const ProjectsList = ({ projects, removeProject }) => {
  const history = useHistory();
  const { tasks, removeTask } = useContext(TaskContext);

  return (
    <div>
      <h2>Project</h2>
      <Link to='/project/new'>Add project</Link>
      <ul>
        {projects.map((project) => (
          <li
            key={project.id}
            onClick={() => history.push(`/project/${project.id}`)}
          >
            <h3>{project.name}</h3>
            <button
              onClick={(e) => {
                e.stopPropagation();
                history.push(`/project/edit/${project.id}`);
              }}
            >
              Edit
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeProject(project.id);
                tasks.forEach((task) => {
                  if (task.projectId == project.id) {
                    removeTask(task.id);
                  }
                });
                history.push(`/projects`);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
