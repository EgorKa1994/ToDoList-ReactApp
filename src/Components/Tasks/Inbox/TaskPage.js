import React from 'react';
import { useFirebaseTasks } from '../../../firebase/firebase';
import { Route, Redirect, Switch } from 'react-router-dom';
import { TasksInboxList } from './TasksInboxList';
import { TaskAddForm } from './TaskAddForm';
import { TaskDetails } from './TaskDetails';
import { TaskEditForm } from './TaskEditForm';
import { TasksFocusList } from '../Focus/TasksFocusList';

export const TasksPage = () => {
  const { tasks, isLoading, error, add, edit, remove } = useFirebaseTasks();

  if (isLoading) {
    return '...Loading...';
  }

  if (error) {
    return `There is error ${error}`;
  }

  return (
    <Switch>
      <Route exact path='/'>
        <Redirect to='/inbox' />
      </Route>
      <Route exact path='/inbox'>
        <TasksInboxList tasks={tasks} />
      </Route>
      <Route path='/task/new'>
        <TaskAddForm add={add} />
      </Route>
      <Route exact path='/task/:taskId'>
        <TaskDetails tasks={tasks} remove={remove} />
      </Route>
      <Route path='/task/edit/:taskId'>
        {({
          match: {
            params: { taskId },
          },
        }) => <TaskEditForm taskId={taskId} edit={edit} />}
      </Route>
      <Route exact path='/focus'>
        <TasksFocusList tasks={tasks} />
      </Route>
    </Switch>
  );
};
