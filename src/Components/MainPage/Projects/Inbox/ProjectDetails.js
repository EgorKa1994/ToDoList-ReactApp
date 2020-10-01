import React from 'react';
import { useFirebaseTasks } from '../../../../firebase/firebase';
import { useHistory } from 'react-router-dom';
import { TaskData } from '../../../Common/Components/comComponent';

export const ProjectDetails = ({ removeProject, projectId, projects }) => {
  const { tasks, isLoading, error, editTask, removeTask } = useFirebaseTasks();

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

  if (error) {
    return `There is ${error}`;
  }

  return (
    <div>
      <h2>Project details:</h2>
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
          <h3 style={{ paddingTop: 10 }}>Project tasks:</h3>
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
              history.push(`/project/edit/${choosenProject.id}`);
            }}
          >
            Edit
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
            Delete
          </button>
          <button
            className='closing'
            onClick={() => {
              history.push('/projects');
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
