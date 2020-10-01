import React from 'react';
import { Link } from 'react-router-dom';
import { TaskList } from '../../../Common/Components/comComponent';

export const TasksInboxList = ({ tasks, editTask }) => {
  return (
    <div>
      <h2>Inbox</h2>
      <Link to='/task/new'>
        <button className='addition'>Add task</button>
      </Link>
      <TaskList tasks={tasks} editTask={editTask} type='inbox' />
    </div>
  );
};
