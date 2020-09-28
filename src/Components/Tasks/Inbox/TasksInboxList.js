import React from 'react';
import { Link } from 'react-router-dom';

export const TasksInboxList = ({ tasks }) => {
  return (
    <div>
      <h2>Inbox</h2>
      <Link to='/task/new'>Add task</Link>
      <ul>
        {tasks.map((task) => {
          if (!task.projectId && !task.isFocusedOn) {
            return (
              <li key={task.id}>
                <h3>{task.title}</h3>
                <Link to={`/task/${task.id}`}>Подробно</Link>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};
