import React from 'react';
import { TaskList } from '../../../Common/Components/TaskList';

export const TasksFocusList = ({ tasks }) => {
  return (
    <div>
      <h2>Focus</h2>
      <TaskList tasks={tasks} type='focus' />
    </div>
  );
};
