import React from 'react';
import { Link } from 'react-router-dom';

export const ProjectsList = ({ projects }) => {
  return (
    <div>
      <h2>Project</h2>
      <Link to='/project/new'>Add project</Link>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <h3>{project.name}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
};
