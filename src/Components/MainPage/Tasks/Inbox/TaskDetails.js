import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import {
  ProjectContext,
  LanguageContext,
} from '../../../../Components/Common/Context/Context';
import { PreLoader } from '../../../Common/Components/Preloader';
import { NotFoundPage } from '../../../Common/Components/NotFoundPage';
import { setHistoryPush } from '../../../Common/Functions/comFunction';
import { dictionaries } from '../../../../Dictionaries/Dictionaries';

export const TaskDetails = ({ tasks, taskId, removeTask }) => {
  const history = useHistory();

  const choosenTask = tasks.filter((task) => task.id == taskId)[0];

  const projects = useContext(ProjectContext);
  const { language } = useContext(LanguageContext);

  if (!choosenTask) {
    return <NotFoundPage />;
  }

  if (!projects) {
    return <PreLoader />;
  }

  return (
    <div>
      <h2>{dictionaries[language].TaskDetails}</h2>
      <div className='details'>
        <h2>{choosenTask.title}</h2>
        <div className='description'>
          {choosenTask.description
            ? choosenTask.description
            : dictionaries[language].NoDescription}
        </div>
        <div className='details_info-group'>
          <div className='info-group'>
            <div>
              {choosenTask.isFocusedOn == true
                ? dictionaries[language].Focus
                : dictionaries[language].NoFocus}
            </div>
            <div
              className={
                choosenTask.isFocusedOn == true
                  ? 'focused-info'
                  : 'nonFocused-info'
              }
            ></div>
          </div>
          <div className='info-group'>
            <div>
              {choosenTask.isDone == true
                ? dictionaries[language].Done
                : dictionaries[language].NotDone}
            </div>
            <div
              className={
                choosenTask.isDone == true ? 'done-info' : 'not-done-info'
              }
            ></div>
          </div>
        </div>
        <div className='task-in-project'>
          <span>{dictionaries[language].Project}</span>
          {choosenTask.projectId
            ? projects.projects.filter(
                (project) => project.id == choosenTask.projectId
              )[0].name
            : dictionaries[language].NoProject}
        </div>
        <div className='control'>
          <button
            className='editting'
            onClick={() => {
              history.push(`/tasks/edit/${taskId}`);
            }}
          >
            {dictionaries[language].Edit}
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
            {dictionaries[language].Remove}
          </button>
          <button
            className='closing'
            onClick={() => {
              history.push(
                setHistoryPush(choosenTask.isFocusedOn, choosenTask.projectId)
              );
            }}
          >
            {dictionaries[language].Close}
          </button>
        </div>
      </div>
    </div>
  );
};
