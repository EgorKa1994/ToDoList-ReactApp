import React, { useState, useContext } from 'react';
import { UserContext } from '../../../Common/Context/Context';
import { useHistory, useLocation } from 'react-router-dom';
import { ErrorMessage } from '../../../Common/Components/ErrorMessage';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { logIn, errorLogin } = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <h2>Welcome</h2>
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
          Ok
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
