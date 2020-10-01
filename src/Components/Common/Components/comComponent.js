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
        <Link to={`/task/${task.id}`}>..</Link>
      </div>
    </li>
  );
};

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
                  <Link to={`/task/${task.id}`}>..</Link>
                </div>
              </li>
            );
          }
        })}
      </ul>
    );
  }
};

export const PreLoader = () => {
  return (
    <div className='loader'>
      <div className='item-1'></div>
      <div className='item-2'></div>
      <div className='item-3'></div>
      <div className='item-4'></div>
      <div className='item-5'></div>
    </div>
  );
};
