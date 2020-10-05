import React, { useState, useContext } from 'react';
import { UserContext, LanguageContext } from '../../../Common/Context/Context';
import { useHistory, useLocation } from 'react-router-dom';
import { ErrorMessage } from '../../../Common/Components/ErrorMessage';
import { dictionaries } from '../../../../Dictionaries/Dictionaries';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { logIn, errorLogin } = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  const { language } = useContext(LanguageContext);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <h2>{dictionaries[language].Welcome}</h2>
      <div className='input-group'>
        <label htmlFor='email'>{dictionaries[language].YourEmail}</label>
        <input
          type='text'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
      </div>
      <div className='input-group'>
        <label htmlFor='password'>{dictionaries[language].Password}</label>
        <input
          type='password'
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </div>
      <div>{errorLogin ? <ErrorMessage error={errorLogin} /> : ''}</div>
      <div className='control'>
        <button
          className='save-close'
          onClick={async () => {
            await logIn({ email, password });
            if (location.state?.location) {
              history.replace(location.state.location.pathname);
            } else {
              history.push('/tasks/inbox');
            }
          }}
        >
          {dictionaries[language].LogIn}
        </button>
        <button
          className='save-close'
          onClick={() => {
            history.push('/start');
          }}
        >
          {dictionaries[language].Close}
        </button>
      </div>
    </form>
  );
};
