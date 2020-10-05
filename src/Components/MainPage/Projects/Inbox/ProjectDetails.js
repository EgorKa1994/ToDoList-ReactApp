import React, { useContext } from 'react';
import { useFirebaseTasks } from '../../../../firebase/firebase';
import { useHistory } from 'react-router-dom';
import { TaskData } from '../../../Common/Components/TaskData';
import { NotFoundPage } from '../../../Common/Components/NotFoundPage';
import { dictionaries } from '../../../../Dictionaries/Dictionaries';
import { LanguageContext } from '../../../Common/Context/Context';

export const ProjectDetails = ({ removeProject, projectId, projects }) => {
  const { tasks, isLoading, error, editTask, removeTask } = useFirebaseTasks();
  const { language } = useContext(LanguageContext);

  const choosenProject = projects.filter(
    (project) => project.id == projectId
  )[0];

  const history = useHistory();

  if (isLoading) {
    return (
      <>
        <h2>{choosenProject ? `${choosenProject.name}` : ''}</h2>
        <div>{choosenProject ? `${choosenProject.description}` : ''}</div>
        <div>{'....loading...'}</div>
      </>
    );
  }

  if (!choosenProject) {
    return <NotFoundPage />;
  }

  if (error) {
    return `There is ${error}`;
  }

  return (
    <div>
      <h2>{dictionaries[language].ProjectDetails}</h2>
      <div className='details'>
        <h2>{choosenProject ? `${choosenProject.name}` : ''}</h2>
        <div className='description'>
          {choosenProject
            ? `${
                choosenProject.description
                  ? choosenProject.description
                  : 'No description'
              }`
            : ''}
        </div>
        <ul>
          <h3 style={{ paddingTop: 10 }}>
            {dictionaries[language].ProjectTasks}
          </h3>
          {tasks.map((task) => {
            if (task.projectId == choosenProject.id) {
              return <TaskData key={task.id} task={task} editTask={editTask} />;
            }
          })}
        </ul>
        <div className='control'>
          <button
            className='editting'
            onClick={() => {
              history.push(`/projects/edit/${choosenProject.id}`);
            }}
          >
            {dictionaries[language].Edit}
          </button>
          <button
            className='removing'
            onClick={async () => {
              await tasks.forEach((task) => {
                if (task.projectId == choosenProject.id) {
                  removeTask(task.id);
                }
              });
              removeProject(choosenProject.id);
              history.push(`/projects`);
            }}
          >
            {dictionaries[language].Remove}
          </button>
          <button
            className='closing'
            onClick={() => {
              history.push('/projects');
            }}
          >
            {dictionaries[language].Close}
          </button>
        </div>
      </div>
    </div>
  );
};
