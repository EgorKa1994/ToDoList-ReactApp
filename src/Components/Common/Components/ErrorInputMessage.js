import React from 'react';

export const ErrorInputMessage = ({ errors }) => {
  return (
    <div className='error error-input-message'>
      {errors.map((error, index) => {
        return <div key={index}>{error}</div>;
      })}
    </div>
  );
};
