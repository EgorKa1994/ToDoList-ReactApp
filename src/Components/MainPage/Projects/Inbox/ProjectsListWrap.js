import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { TaskContext } from '../../../../Components/Common/Context/Context';
import { ProjectList } from './ProjectList';

export const ProjectsListWrap = ({ projects, removeProject }) => {
  const history = useHistory();
  const { tasks, removeTask } = useContext(TaskContext);

  return (
    <div>
      <h2>Projects</h2>
      <Link to='/project/new'>
        <button className='addition'>Add project</button>
      </Link>
      <ProjectList
        projects={projects}
        removeProject={removeProject}
        tasks={tasks}
        removeTask={removeTask}
        history={history}
      />
    </div>
  );
};
