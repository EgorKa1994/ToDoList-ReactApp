import React from 'react';
import { Link } from 'react-router-dom';

export const StartPage = () => {
  return (
    <div className='authorization'>
      <h2>
        To use this app you need to authenticate. Please,
        <Link to='/registration'>
          <span>register </span>
        </Link>
        or
        <Link to='/login'>
          <span>logon</span>
        </Link>
        if you already have profile.
      </h2>
      <div></div>
    </div>
  );
};
