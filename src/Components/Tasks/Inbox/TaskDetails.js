import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { ProjectContext } from '../../AppWrap';

export const TaskDetails = ({ tasks, remove }) => {
  const history = useHistory();
  const choosenTaskId = history.location.pathname.slice(6);

  const choosenTask = tasks.filter((task) => task.id == choosenTaskId)[0];

  const projects = useContext(ProjectContext);

  if (!choosenTask) {
    return '...loading...';
  }

  return (
    <div>
      <h2>{choosenTask.title}</h2>
      <div>{choosenTask.description}</div>
      <div>
        {choosenTask.isFocusedOn == true ? (
          <div
            style={{ width: 100, height: 100, backgroundColor: 'green' }}
          ></div>
        ) : (
          <div
            style={{ width: 100, height: 100, backgroundColor: 'red' }}
          ></div>
        )}
      </div>
      <div>{choosenTask.isDone == true ? 'Yes' : 'No'}</div>
      <div>
        <span>Project</span>
        {choosenTask.projectId
          ? projects.filter((project) => project.id == choosenTask.projectId)[0]
              .name
          : 'No project'}
      </div>
      <button
        onClick={() => {
          history.push(`/task/edit/${choosenTaskId}`);
        }}
      >
        Edit
      </button>
      <button
        onClick={async () => {
          await remove(choosenTaskId);
          history.push('/inbox');
        }}
      >
        Delete
      </button>
      <button
        onClick={() => {
          history.push('/inbox');
        }}
      >
        Close
      </button>
    </div>
  );
};
