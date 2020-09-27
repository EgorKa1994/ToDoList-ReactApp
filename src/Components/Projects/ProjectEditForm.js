import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { toObject, firestore } from '../../firebase/firestore';
import { ProjectContext } from '../../Components/AppWrap';

export const ProjectEditForm = ({ edit, projectId }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const history = useHistory();

  useEffect(() => {
    firestore
      .collection('/projects')
      .doc(projectId)
      .get()
      .then(toObject)
      .then((project) => {
        setName(project.name);
        setDescription(project.description);
      });
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div>
        <label htmlFor='name'></label>
        <input
          type='text'
          name='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
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
      <button
        onClick={async () => {
          await edit(projectId, {
            name,
            description,
          });
          history.push('/projects');
        }}
      >
        Edit
      </button>
      <button
        onClick={() => {
          history.push('/projects');
        }}
      >
        Close
      </button>
    </form>
  );
};
