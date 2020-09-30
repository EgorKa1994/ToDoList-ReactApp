import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { toObject, firestore } from '../../firebase/firestore';

export const ProjectForm = ({ editProject, projectId, addProject }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const history = useHistory();

  useEffect(() => {
    if (projectId) {
      firestore
        .collection('/projects')
        .doc(projectId)
        .get()
        .then(toObject)
        .then((project) => {
          setName(project.name);
          setDescription(project.description);
        });
    }
  }, [projectId]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className='input-group'>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          name='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
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
      <div className='control'>
        <button
          className='save-close'
          onClick={async () => {
            if (projectId) {
              await editProject(projectId, {
                name,
                description,
              });
            } else {
              await addProject({
                name,
                description,
              });
            }
            history.push('/projects');
          }}
        >
          Save
        </button>
        <button
          className='save-close'
          onClick={() => {
            history.push('/projects');
          }}
        >
          Close
        </button>
      </div>
    </form>
  );
};
