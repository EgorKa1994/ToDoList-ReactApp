import React, { useState, useContext } from 'react';
import { UserContext } from '../../../Common/Context/Context';
import { useHistory } from 'react-router-dom';

export const RegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const { register } = useContext(UserContext);
  const history = useHistory();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <h2>Registration</h2>
      <div className='input-group'>
        <label htmlFor='email'>Your email</label>
        <input
          type='text'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
      </div>
      <div className='input-group'>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </div>
      <div className='input-group'>
        <label htmlFor='passwordConfirmation'>Password confirmation</label>
        <input
          type='password'
          name='passwordConfirmation'
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        ></input>
      </div>
      <div className='control'>
        <button
          className='save-close'
          onClick={async () => {
            await register({ email, password });
            history.push('/account');
          }}
        >
          Save
        </button>
        <button
          className='save-close'
          onClick={() => {
            history.push('/start');
          }}
        >
          Close
        </button>
      </div>
    </form>
  );
};
