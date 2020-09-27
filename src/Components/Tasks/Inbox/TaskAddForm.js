import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { ProjectContext } from '../../AppWrap';

export const TaskAddForm = ({ add }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isFocusedOn, setIsFocusedOn] = useState('false');
  const [isDone, setIsDone] = useState('false');
  const [projectId, setProjectId] = useState('');
  const { projects } = useContext(ProjectContext);

  const history = useHistory();

  const booleanTransformation = (value) => {
    return value == 'true' ? true : false;
  };

  const checkProjectId = (value) => {
    return value == false ? null : value;
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div>
        <label htmlFor='title'></label>
        <input
          type='text'
          name='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
      </div>
      <div>
        <label htmlFor='description'></label>
        <textarea
          name='description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div>
        <div>Would you like to focus on this task?</div>
        <div>
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
      <div>
        <div>Is the task done?</div>
        <div>
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
      <div>
        <label htmlFor='project'>Choose project</label>
        <select
          name='project'
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
        >
          {<option value={''}>No any project</option>}
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={async () => {
          await add({
            title,
            description,
            isFocusedOn: booleanTransformation(isFocusedOn),
            isDone: booleanTransformation(isDone),
            projectId: checkProjectId(projectId),
          });
          history.push('/inbox');
        }}
      >
        Add
      </button>
      <button
        onClick={() => {
          history.push('/inbox');
        }}
      >
        Close
      </button>
    </form>
  );
};
