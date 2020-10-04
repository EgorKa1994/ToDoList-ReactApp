import React from 'react';
import { Link } from 'react-router-dom';
import { TaskData } from './TaskData';

export const TaskList = ({ tasks, editTask, type }) => {
  if (type === 'inbox') {
    return (
      <ul className='list'>
        {tasks.map((task) => {
          if (!task.projectId && !task.isFocusedOn) {
            return <TaskData key={task.id} task={task} editTask={editTask} />;
          }
        })}
      </ul>
    );
  } else if (type === 'focus') {
    return (
      <ul className='list'>
        {tasks.map((task) => {
          if (task.isFocusedOn && !task.projectId) {
            return (
              <li key={task.id}>
                <h3>{task.title}</h3>
                <div className='transitionToDetails'>
                  <Link to={`/tasks/${task.id}`}>..</Link>
                </div>
              </li>
            );
          }
        })}
      </ul>
    );
  }
};
