import React, { useContext } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { TasksInboxList } from './Inbox/TasksInboxList';
import { TaskDetails } from './Inbox/TaskDetails';
import { TaskForm } from './Inbox/TaskForm';
import { TasksFocusList } from './Focus/TasksFocusList';
import { TaskContext } from '../../AppWrap';

export const TasksPage = () => {
  const { tasks, addTask, editTask, removeTask } = useContext(TaskContext);

  return (
    <Switch>
      <Route exact path='/'>
        <Redirect to='/inbox' />
      </Route>
      <Route exact path='/inbox'>
        <TasksInboxList tasks={tasks} editTask={editTask} />
      </Route>
      <Route path='/task/new'>
        <TaskForm addTask={addTask} />
      </Route>
      <Route exact path='/task/:taskId'>
        {({
          match: {
            params: { taskId },
          },
        }) => (
          <TaskDetails tasks={tasks} taskId={taskId} removeTask={removeTask} />
        )}
      </Route>
      <Route path='/task/edit/:taskId'>
        {({
          match: {
            params: { taskId },
          },
        }) => <TaskForm taskId={taskId} editTask={editTask} />}
      </Route>
      <Route exact path='/focus'>
        <TasksFocusList tasks={tasks} />
      </Route>
    </Switch>
  );
};
