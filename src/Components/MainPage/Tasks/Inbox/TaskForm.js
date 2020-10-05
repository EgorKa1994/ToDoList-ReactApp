import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { toObject, firestore } from '../../../../firebase/firestore';
import {
  ProjectContext,
  UserContext,
  LanguageContext,
} from '../../../../Components/Common/Context/Context';
import { setHistoryPush } from '../../../Common/Functions/comFunction';
import { PreLoader } from '../../../Common/Components/Preloader';
import { NotFoundPage } from '../../../Common/Components/NotFoundPage';
import { validateTitle } from '../../../Common/Functions/comFunction';
import { ErrorInputMessage } from '../../../Common/Components/ErrorInputMessage';
import { dictionaries } from '../../../../Dictionaries/Dictionaries';

export const TaskForm = ({ editTask, taskId, addTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isFocusedOn, setIsFocusedOn] = useState('false');
  const [isDone, setIsDone] = useState('false');
  const [projectId, setProjectId] = useState('');
  const [errorTask, setErrorTask] = useState(null);
  const [isLoadingTask, setIsLoadingTask] = useState(true);
  const [isPageFound, setIsPageFound] = useState(true);
  const history = useHistory();
  const { projects } = useContext(ProjectContext);
  const { language } = useContext(LanguageContext);
  const { user } = useContext(UserContext);
  const [errorTitleInput, setErrorTitleInput] = useState([]);
  const [formValid, setFormValid] = useState(false);

  const booleanTransformation = (val) => {
    return val == 'true' ? true : false;
  };

  const checkProjectId = (value) => {
    return value == false ? null : value;
  };

  useEffect(() => {
    if (taskId) {
      firestore
        .collection('/tasks')
        .doc(taskId)
        .get()
        .then(toObject)
        .then((task) => {
          setFormValid(true);
          if (!task.title) {
            setIsPageFound(false);
          }
          return task;
        })
        .then((task) => {
          setTitle(task.title);
          setDescription(task.description);
          setIsFocusedOn(String(task.isFocusedOn));
          setIsDone(String(task.isDone));
          setProjectId(task.projectId ? task.projectId : '');
        })
        .catch((errorTask) => setErrorTask(errorTask))
        .finally(setIsLoadingTask(false));
    } else {
      setIsLoadingTask(false);
    }
  }, []);

  if (!isPageFound) {
    return <NotFoundPage />;
  }

  if (isLoadingTask) {
    return <PreLoader />;
  }

  if (errorTask) {
    return `There is error: ${errorTask}`;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <h2>
        {taskId
          ? dictionaries[language].EditTask
          : dictionaries[language].AddTask}
      </h2>
      <div className='input-group'>
        <label htmlFor='title'>{dictionaries[language].Title}</label>
        <input
          type='text'
          name='title'
          value={title}
          onChange={async (e) => {
            setTitle(e.target.value);
            setErrorTitleInput(validateTitle(e.target.value, language));
            validateTitle(e.target.value, language).length == 0
              ? setFormValid(true)
              : setFormValid(false);
          }}
        ></input>
        <div>
          {errorTitleInput.length > 0 ? (
            <ErrorInputMessage errors={errorTitleInput} />
          ) : (
            ''
          )}
        </div>
      </div>
      <div className='input-group'>
        <label htmlFor='description'>
          {dictionaries[language].Description}
        </label>
        <textarea
          name='description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div className='input-group'>
        <div> {dictionaries[language].WouldYouLikeToFocus}</div>
        <div className='input-group_choose'>
          <label>{dictionaries[language].Yes}</label>
          <input
            type='radio'
            name='isFocused'
            value='true'
            checked={isFocusedOn == 'true'}
            onChange={(e) => {
              setIsFocusedOn(e.target.value);
            }}
          />
          <label>{dictionaries[language].No}</label>
          <input
            type='radio'
            name='isFocused'
            value='false'
            checked={isFocusedOn == 'false'}
            onChange={(e) => {
              setIsFocusedOn(e.target.value);
            }}
          />
        </div>
      </div>
      <div className='input-group'>
        <div>{dictionaries[language].IsTaskDone}</div>
        <div className='input-group_choose'>
          <label>{dictionaries[language].Yes}</label>
          <input
            type='radio'
            name='isDone'
            value='true'
            checked={isDone == 'true'}
            onChange={(e) => setIsDone(e.target.value)}
          />
          <label>{dictionaries[language].No}</label>
          <input
            type='radio'
            name='isDone'
            value='false'
            checked={isDone == 'false'}
            onChange={(e) => setIsDone(e.target.value)}
          />
        </div>
      </div>
      <div className='input-group'>
        <label htmlFor='project'>{dictionaries[language].ChooseProject}</label>
        <select
          name='project'
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
        >
          {<option value={''}>{dictionaries[language].NoProject}</option>}
          {projects.map((project) => {
            if (project.id == projectId) {
              return (
                <option selected key={project.id} value={project.id}>
                  {project.name}
                </option>
              );
            } else {
              return (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              );
            }
          })}
        </select>
      </div>
      <div className='control'>
        <button
          className={formValid ? 'save-close' : 'save-close disabled'}
          type='submit'
          onClick={async () => {
            if (taskId) {
              await editTask(taskId, {
                title,
                description,
                isFocusedOn: booleanTransformation(isFocusedOn),
                isDone: booleanTransformation(isDone),
                projectId: checkProjectId(projectId),
              });
              history.push(setHistoryPush(isFocusedOn, projectId));
            } else {
              await addTask({
                title,
                description,
                isFocusedOn: booleanTransformation(isFocusedOn),
                isDone: booleanTransformation(isDone),
                projectId: checkProjectId(projectId),
                userId: user.uid,
              });
              if (projectId) {
                history.push('/projects');
              } else {
                if (isFocusedOn == 'true') {
                  history.push('/tasks/focus');
                } else {
                  history.push('/tasks/inbox');
                }
              }
            }
          }}
          disabled={formValid ? false : true}
        >
          {dictionaries[language].Save}
        </button>
        <button
          className='save-close'
          onClick={() => {
            if (taskId) {
              history.push(setHistoryPush(isFocusedOn, projectId));
            } else {
              history.push('/tasks/inbox');
            }
          }}
        >
          {dictionaries[language].Close}
        </button>
      </div>
    </form>
  );
};
