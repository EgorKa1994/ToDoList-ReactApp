import React from 'react';
import { useFirebaseTasks } from '../../firebase/firebase';
import { TaskData } from '../../Common/commonFunctions';
import { useHistory } from 'react-router-dom';

export const ProjectDetails = ({ project, removeProject }) => {
  const { tasks, isLoading, error, editTask, removeTask } = useFirebaseTasks();

  const history = useHistory();

  if (isLoading) {
    return (
      <>
        <h2>{project ? `${project.name}` : ''}</h2>
        <div>{project ? `${project.description}` : ''}</div>
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
        <h2>{project ? `${project.name}` : ''}</h2>
        <div className='description'>
          {project
            ? `${project.description ? project.description : 'No description'}`
            : ''}
        </div>
        <ul>
          <h3 style={{ paddingTop: 10 }}>Project tasks:</h3>
          {tasks.map((task) => {
            if (task.projectId == project.id) {
              return <TaskData key={task.id} task={task} editTask={editTask} />;
            }
          })}
        </ul>
        <div className='control'>
          <button
            className='editting'
            onClick={() => {
              history.push(`/project/edit/${project.id}`);
            }}
          >
            Edit
          </button>
          <button
            className='removing'
            onClick={async () => {
              await removeProject(project.id);
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
