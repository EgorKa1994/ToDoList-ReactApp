import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { ProjectContext } from '../../../../Components/Common/Context/Context';
import { PreLoader } from '../../../Common/Components/comComponent';
import { NotFoundPage } from '../../../Common/Components/comComponent';
import { setHistoryPush } from '../../../Common/Functions/comFunction';

export const TaskDetails = ({ tasks, taskId, removeTask }) => {
  const history = useHistory();

  const choosenTask = tasks.filter((task) => task.id == taskId)[0];

  const projects = useContext(ProjectContext);

  if (!choosenTask) {
    return <NotFoundPage />;
  }

  if (!projects) {
    return <PreLoader />;
  }

  return (
    <div>
      <h2>Task details:</h2>
      <div className='details'>
        <h2>{choosenTask.title}</h2>
        <div className='description'>
          {choosenTask.description ? choosenTask.description : 'No description'}
        </div>
        <div className='details_info-group'>
          <div className='info-group'>
            <div>{choosenTask.isFocusedOn == true ? 'Focus' : 'No focus'}</div>
            <div
              className={
                choosenTask.isFocusedOn == true
                  ? 'focused-info'
                  : 'nonFocused-info'
              }
            ></div>
          </div>
          <div className='info-group'>
            <div>{choosenTask.isDone == true ? 'Done' : 'Not done'}</div>
            <div
              className={
                choosenTask.isDone == true ? 'done-info' : 'not-done-info'
              }
            ></div>
          </div>
        </div>
        <div>
          <span>Project:</span>
          {choosenTask.projectId
            ? projects.projects.filter(
                (project) => project.id == choosenTask.projectId
              )[0].name
            : 'No project'}
        </div>
        <div className='control'>
          <button
            className='editting'
            onClick={() => {
              history.push(`/tasks/edit/${taskId}`);
            }}
          >
            Edit
          </button>
          <button
            className='removing'
            onClick={async () => {
              await removeTask(taskId);
              history.push(
                setHistoryPush(choosenTask.isFocusedOn, choosenTask.projectId)
              );
            }}
          >
            Delete
          </button>
          <button
            className='closing'
            onClick={() => {
              history.push(
                setHistoryPush(choosenTask.isFocusedOn, choosenTask.projectId)
              );
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
