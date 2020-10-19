import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { toObject, firestore } from '../../../../firebase/firestore';
import { PreLoader } from '../../../Common/Components/Preloader';
import { NotFoundPage } from '../../../Common/Components/NotFoundPage';
import { UserContext, LanguageContext } from '../../../Common/Context/Context';
import { validateTitle } from '../../../Common/Functions/comFunction';
import { ErrorInputMessage } from '../../../Common/Components/ErrorInputMessage';
import { dictionaries } from '../../../../Dictionaries/Dictionaries';

export const ProjectForm = ({ editProject, projectId, addProject }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [errorProj, setErrorProj] = useState(null);
  const [isLoadingProj, setIsLoadingProj] = useState(true);
  const history = useHistory();
  const [isPageFound, setIsPageFound] = useState(true);
  const { user } = useContext(UserContext);
  const [errorTitleInput, setErrorTitleInput] = useState([]);
  const [formValid, setFormValid] = useState(false);
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    if (projectId) {
      firestore
        .collection('/projects')
        .doc(projectId)
        .get()
        .then(toObject)
        .then((project) => {
          setFormValid(true);
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
      <h2>
        {projectId
          ? dictionaries[language].EditProject
          : dictionaries[language].AddProject}
      </h2>
      <div className='input-group'>
        <label htmlFor='name'>{dictionaries[language].Title}</label>
        <input
          type='text'
          name='name'
          value={name}
          onChange={(e) => {
            setName(e.target.value);
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
      <div className='control'>
        <button
          className={formValid ? 'save-close' : 'save-close disabled'}
          onClick={async () => {
            if (projectId) {
              await editProject(projectId, {
                name,
                description,
                userId: user.uid,
              });
            } else {
              await addProject({
                name,
                description,
                userId: user.uid,
              });
            }
            history.push('/projects/inbox');
          }}
          disabled={formValid ? false : true}
        >
          {dictionaries[language].Save}
        </button>
        <button
          className='save-close'
          onClick={() => {
            history.push('/projects/inbox');
          }}
        >
          {dictionaries[language].Close}
        </button>
      </div>
    </form>
  );
};
