import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { toObject, firestore } from '../../../../firebase/firestore';
import { PreLoader } from '../../../Common/Components/comComponent';
import { NotFoundPage } from '../../../Common/Components/comComponent';

export const ProjectForm = ({ editProject, projectId, addProject }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [errorProj, setErrorProj] = useState(null);
  const [isLoadingProj, setIsLoadingProj] = useState(true);
  const history = useHistory();
  const [isPageFound, setIsPageFound] = useState(true);

  useEffect(() => {
    if (projectId) {
      firestore
        .collection('/projects')
        .doc(projectId)
        .get()
        .then(toObject)
        .then((project) => {
          if (!project.name) {
            setIsPageFound(false);
          }
          return project;
        })
        .then((project) => {
          setName(project.name);
          setDescription(project.description);
        })
        .catch((errorProj) => setErrorProj(errorProj))
        .finally(setIsLoadingProj(false));
    } else {
      setIsLoadingProj(false);
    }
  }, []);

  if (isLoadingProj) {
    return <PreLoader />;
  }

  if (!isPageFound) {
    return <NotFoundPage />;
  }

  if (errorProj) {
    return `There is error: ${errorProj}`;
  }

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
            history.push('/projects/inbox');
          }}
        >
          Save
        </button>
        <button
          className='save-close'
          onClick={() => {
            history.push('/projects/inbox');
          }}
        >
          Close
        </button>
      </div>
    </form>
  );
};
