import React, { useContext } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { TasksInboxList } from './Inbox/TasksInboxList';
import { TaskDetails } from './Inbox/TaskDetails';
import { TaskForm } from './Inbox/TaskForm';
import { TasksFocusList } from './Focus/TasksFocusList';
import { TaskContext } from '../../../Components/Common/Context/Context';
import { ProtectedRoute } from '../../Common/Context/ProtectedRoute';

export const TasksPage = () => {
  const { tasks, addTask, editTask, removeTask } = useContext(TaskContext);

  return (
    <Switch>
      <Route exact path='/'>
        <Redirect to='/start' />
      </Route>
      <ProtectedRoute path='/inbox'>
        <TasksInboxList tasks={tasks} editTask={editTask} />
      </ProtectedRoute>
      <ProtectedRoute path='/task/new'>
        <TaskForm addTask={addTask} />
      </ProtectedRoute>
      <ProtectedRoute exact path='/task/:taskId'>
        {({
          match: {
            params: { taskId },
          },
        }) => (
          <TaskDetails tasks={tasks} taskId={taskId} removeTask={removeTask} />
        )}
      </ProtectedRoute>
      <ProtectedRoute path='/task/edit/:taskId'>
        {({
          match: {
            params: { taskId },
          },
        }) => <TaskForm taskId={taskId} editTask={editTask} />}
      </ProtectedRoute>
      <ProtectedRoute path='/focus'>
        <TasksFocusList tasks={tasks} />
      </ProtectedRoute>
    </Switch>
  );
};
