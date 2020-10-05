import React, { useState, useContext } from 'react';
import { UserContext, LanguageContext } from '../../../Common/Context/Context';
import { useHistory } from 'react-router-dom';
import { dictionaries } from '../../../../Dictionaries/Dictionaries';

export const AccountPage = () => {
  const { update, user } = useContext(UserContext);
  const [displayName, setDisplayName] = useState(
    user.displayName ? user.displayName : ''
  );

  const history = useHistory();
  const { language } = useContext(LanguageContext);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <h2>{dictionaries[language].AccountInfo}</h2>
        <div className='input-group'>
          <label htmlFor='displayName'>{dictionaries[language].YourName}</label>
          <input
            type='text'
            name='displayName'
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          ></input>
        </div>
        <div className='input-group'>
          <label htmlFor='email'>{dictionaries[language].YourEmail}</label>
          <input name='email' value={user.email} disabled></input>
        </div>
        <div className='control'>
          <button
            className='save-close'
            onClick={() => {
              update({ displayName });
              history.push('./tasks/inbox');
            }}
          >
            {dictionaries[language].Save}
          </button>
          <button
            className='save-close'
            onClick={() => {
              history.push('./tasks/inbox');
            }}
          >
            {dictionaries[language].Close}
          </button>
        </div>
      </form>
    </>
  );
};
