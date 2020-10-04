import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const TaskData = ({ task, editTask }) => {
  const [isDone, setIsDone] = useState(task.isDone);
  const [isFocusedOn, setIsFocusedOn] = useState(task.isFocusedOn);

  return (
    <li className='task-data'>
      <input
        className='custom-checkbox'
        type='checkbox'
        checked={isDone}
        id='checkBox'
        name='checkBox'
        onChange={async () => {
          await setIsDone(!isDone);
          await editTask(task.id, { ...task, isDone: isDone ? false : true });
        }}
      ></input>
      <label htmlFor='checkBox'></label>
      <div
        id='focus'
        style={{ fontSize: 30 }}
        onClick={async () => {
          await setIsFocusedOn(!isFocusedOn);
          await editTask(task.id, {
            ...task,
            isFocusedOn: isFocusedOn ? false : true,
          });
        }}
        className={isFocusedOn ? 'focused' : 'nonFocused'}
      >
        &#9734;
      </div>
      <h3>{task.title}</h3>
      <div className='transitionToDetails'>
        <Link to={`/tasks/${task.id}`}>..</Link>
      </div>
    </li>
  );
};
