import React, { useContext } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { TasksInboxList } from './Inbox/TasksInboxList';
import { TaskDetails } from './Inbox/TaskDetails';
import { TaskForm } from './Inbox/TaskForm';
import { TasksFocusList } from './Focus/TasksFocusList';
import { TaskContext } from '../../../Components/Common/Context/Context';
import { ProtectedRoute } from '../../Common/Context/ProtectedRoute';
import { NotFoundPage } from '../../Common/Components/NotFoundPage';

export const TasksPage = () => {
  const { tasks, addTask, editTask, removeTask } = useContext(TaskContext);

  return (
    <Switch>
      <Route exact path='/tasks'>
        <Redirect to='/tasks/inbox' />
      </Route>
      <ProtectedRoute path='/tasks/inbox'>
        <TasksInboxList tasks={tasks} editTask={editTask} />
      </ProtectedRoute>
      <ProtectedRoute path='/tasks/focus'>
        <TasksFocusList tasks={tasks} />
      </ProtectedRoute>
      <ProtectedRoute path='/tasks/new'>
        <TaskForm addTask={addTask} />
      </ProtectedRoute>
      <ProtectedRoute path='/tasks/edit/:taskId'>
        {({
          match: {
            params: { taskId },
          },
        }) => <TaskForm taskId={taskId} editTask={editTask} tasks={tasks} />}
      </ProtectedRoute>
      <ProtectedRoute path='/tasks/:taskId'>
        {({
          match: {
            params: { taskId },
          },
        }) => (
          <TaskDetails tasks={tasks} taskId={taskId} removeTask={removeTask} />
        )}
      </ProtectedRoute>
      <Route>
        <NotFoundPage />
      </Route>
    </Switch>
  );
};
