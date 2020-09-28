import React, { useContext } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { TasksInboxList } from './Inbox/TasksInboxList';
import { TaskAddForm } from './Inbox/TaskAddForm';
import { TaskDetails } from './Inbox/TaskDetails';
import { TaskEditForm } from './Inbox/TaskEditForm';
import { TasksFocusList } from './Focus/TasksFocusList';
import { TaskContext } from '../AppWrap';

export const TasksPage = () => {
  const { tasks, addTask, editTask, removeTask } = useContext(TaskContext);

  return (
    <Switch>
      <Route exact path='/'>
        <Redirect to='/inbox' />
      </Route>
      <Route exact path='/inbox'>
        <TasksInboxList tasks={tasks} />
      </Route>
      <Route path='/task/new'>
        <TaskAddForm addTask={addTask} />
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
        }) => <TaskEditForm taskId={taskId} editTask={editTask} />}
      </Route>
      <Route exact path='/focus'>
        <TasksFocusList tasks={tasks} />
      </Route>
    </Switch>
  );
};
