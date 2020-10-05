import React, { useState, useContext } from 'react';
import { UserContext, LanguageContext } from '../../../Common/Context/Context';
import { useHistory } from 'react-router-dom';
import { ErrorMessage } from '../../../Common/Components/ErrorMessage';
import { dictionaries } from '../../../../Dictionaries/Dictionaries';

export const RegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const { register, errorRegistration } = useContext(UserContext);
  const history = useHistory();
  const { language } = useContext(LanguageContext);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <h2>{dictionaries[language].Registration}</h2>
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
      <div className='input-group'>
        <label htmlFor='passwordConfirmation'>
          {dictionaries[language].PasswordConfirmation}
        </label>
        <input
          type='password'
          name='passwordConfirmation'
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        ></input>
      </div>
      <div>
        {errorRegistration ? <ErrorMessage error={errorRegistration} /> : ''}
      </div>
      <div className='control'>
        <button
          className='save-close'
          onClick={async () => {
            await register({ email, password });
          }}
        >
          {dictionaries[language].Save}
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
