import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Stylesheets/style.scss';

export const setHistoryPush = (focus, id) => {
  if (focus == 'true') {
    if (!id) {
      return `/focus`;
    }
  } else {
    if (!id) {
      return `/inbox`;
    }
  }
  return `/project/${id}`;
};

export const TaskData = ({ task, editTask }) => {
  const [isDone, setIsDone] = useState(task.isDone);
  const [isFocusedOn, setIsFocusedOn] = useState(task.isFocusedOn);

  return (
    <li className='task-data'>
      <input
        type='checkbox'
        checked={isDone}
        onChange={async () => {
          await setIsDone(!isDone);
          await editTask(task.id, { ...task, isDone: isDone ? false : true });
        }}
      ></input>
      <div
        style={{ fontSize: 30 }}
        onClick={async () => {
          await setIsFocusedOn(!isFocusedOn);
          await editTask(task.id, {
            ...task,
            isFocusedOn: isFocusedOn ? false : true,
          });
        }}
        className={isFocusedOn ? 'focused' : ''}
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

export const ProjectList = ({
  projects,
  removeProject,
  tasks,
  removeTask,
  history,
}) => {
  return (
    <ul className='list'>
      {projects.map((project) => (
        <li key={project.id}>
          <h3>{project.name}</h3>
          <div
            className='transitionToDetails'
            onClick={(e) => {
              e.stopPropagation();
              history.push(`/project/${project.id}`);
            }}
          ></div>
          <div
            className='edit'
            onClick={(e) => {
              e.stopPropagation();
              history.push(`/project/edit/${project.id}`);
            }}
          ></div>
          <div
            className='remove'
            onClick={async (e) => {
              e.stopPropagation();
              await removeProject(project.id);
              tasks.forEach((task) => {
                if (task.projectId == project.id) {
                  removeTask(task.id);
                }
              });
              history.push(`/projects`);
            }}
          ></div>
        </li>
      ))}
    </ul>
  );
};
