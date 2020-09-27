import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export const ProjectAddForm = ({ add }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const history = useHistory();

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
          await add({
            name,
            description,
          });
          history.push('/projects');
        }}
      >
        Add
      </button>
      <button>Close</button>
    </form>
  );
};
