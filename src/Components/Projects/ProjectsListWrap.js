import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { TaskContext } from '../AppWrap';
import '../../Stylesheets/style.scss';
import { ProjectList } from '../../Common/commonFunctions';

export const ProjectsListWrap = ({ projects, removeProject }) => {
  const history = useHistory();
  const { tasks, removeTask } = useContext(TaskContext);

  return (
    <div>
      <h2>Project</h2>
      <Link to='/project/new'>
        <div className='addition'>Add project</div>
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
