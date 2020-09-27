import React from 'react';
import { Link, useHistory } from 'react-router-dom';

export const ProjectsList = ({ projects, remove }) => {
  const history = useHistory();

  return (
    <div>
      <h2>Project</h2>
      <Link to='/project/new'>Add project</Link>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <h3>{project.name}</h3>
            <button
              onClick={() => {
                history.push(`/project/edit/${project.id}`);
              }}
            >
              Edit
            </button>
            <button onClick={() => remove(project.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
