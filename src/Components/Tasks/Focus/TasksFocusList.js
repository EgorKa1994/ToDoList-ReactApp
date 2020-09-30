import React from 'react';
import { TaskList } from '../../../Common/commonFunctions';

export const TasksFocusList = ({ tasks }) => {
  return (
    <div>
      <h2>Focus</h2>
      <TaskList tasks={tasks} type='focus' />
    </div>
  );
};
