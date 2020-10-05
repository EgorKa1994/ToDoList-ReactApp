import React from 'react';

export const ErrorConfirmation = ({ error }) => {
  return (
    <div style={{ width: '50%' }} className='error error-input-message'>
      {error}
    </div>
  );
};
