import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  TaskContext,
  LanguageContext,
} from '../../../../Components/Common/Context/Context';
import { ProjectList } from './ProjectList';
import { dictionaries } from '../../../../Dictionaries/Dictionaries';

export const ProjectsListWrap = ({ projects, removeProject }) => {
  const history = useHistory();
  const { tasks, removeTask } = useContext(TaskContext);
  const { language } = useContext(LanguageContext);

  return (
    <div>
      <h2>{dictionaries[language].Projects}</h2>
      <Link to='/projects/new'>
        <button className='addition'>
          {dictionaries[language].AddProject}
        </button>
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
