import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { toObject, firestore } from '../../../firebase/firestore';
import { ProjectContext } from '../../AppWrap';
import { setHistoryPush } from '../../../Common/commonFunctions';

export const TaskForm = ({ editTask, taskId, addTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isFocusedOn, setIsFocusedOn] = useState('false');
  const [isDone, setIsDone] = useState('false');
  const [projectId, setProjectId] = useState('');
  const history = useHistory();
  const { projects } = useContext(ProjectContext);

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
          setTitle(task.title);
          setDescription(task.description);
          setIsFocusedOn(String(task.isFocusedOn));
          setIsDone(String(task.isDone));
          setProjectId(task.projectId ? task.projectId : '');
        });
    }
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className='input-group'>
        <label htmlFor='title'>Title</label>
        <input
          type='text'
          name='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
      </div>
      <div className='input-group'>
        <label htmlFor='description'>Description</label>
        <textarea
          name='description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div className='input-group'>
        <div>Would you like to focus on this task?</div>
        <div className='input-group_choose'>
          <label>Yes</label>
          <input
            type='radio'
            name='isFocused'
            value='true'
            checked={isFocusedOn == 'true'}
            onChange={(e) => {
              setIsFocusedOn(e.target.value);
            }}
          />
          <label>No</label>
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
        <div>Is the task done?</div>
        <div className='input-group_choose'>
          <label>Yes</label>
          <input
            type='radio'
            name='isDone'
            value='true'
            checked={isDone == 'true'}
            onChange={(e) => setIsDone(e.target.value)}
          />
          <label>No</label>
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
        <label htmlFor='project'>Choose project</label>
        <select
          name='project'
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
        >
          {<option value={''}>No any project</option>}
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
          className='save-close'
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
              });
              history.push('/inbox');
            }
          }}
        >
          Save
        </button>
        <button
          className='save-close'
          onClick={() => {
            if (taskId) {
              history.push(setHistoryPush(isFocusedOn, projectId));
            } else {
              history.push('/inbox');
            }
          }}
        >
          Close
        </button>
      </div>
    </form>
  );
};
