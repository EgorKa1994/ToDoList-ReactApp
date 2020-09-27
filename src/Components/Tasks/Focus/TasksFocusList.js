import React from 'react';
import { Link } from 'react-router-dom';

export const TasksFocusList = ({ tasks }) => {
  return (
    <div>
      <h2>Focus</h2>
      <ul>
        {tasks.map((task) => {
          if (task.isFocusedOn) {
            return (
              <li>
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
