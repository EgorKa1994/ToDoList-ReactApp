import React from 'react';
import { useHistory } from 'react-router-dom';

export const TaskDetails = ({ tasks, remove }) => {
  const history = useHistory();
  const choosenTaskId = history.location.pathname.slice(6);

  const choosenTask = tasks.filter((task) => task.id == choosenTaskId)[0];

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
