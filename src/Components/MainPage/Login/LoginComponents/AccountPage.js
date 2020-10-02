import React, { useState, useContext } from 'react';
import { UserContext } from '../../../Common/Context/Context';

export const AccountPage = () => {
  const { update, user } = useContext(UserContext);
  const [displayName, setDisplayName] = useState(
    user.displayName ? user.displayName : ''
  );

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <h2>Account information</h2>
        <div className='input-group'>
          <label htmlFor='displayName'>Your name</label>
          <input
            type='text'
            name='displayName'
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          ></input>
        </div>
        <div className='input-group'>
          <label htmlFor='email'>Your email</label>
          <input name='email' value={user.email} disabled></input>
        </div>
        <div className='control'>
          <button
            className='save-close'
            onClick={() => {
              update({ displayName });
            }}
          >
            Save
          </button>
          <button className='save-close'>Close</button>
        </div>
      </form>
    </>
  );
};
