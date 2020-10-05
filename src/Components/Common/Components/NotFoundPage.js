import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { dictionaries } from '../../../Dictionaries/Dictionaries';
import { LanguageContext } from '../Context/Context';

export const NotFoundPage = () => {
  const { language } = useContext(LanguageContext);
  return (
    <div className='start'>
      <h2>
        {dictionaries[language].PageDoesNotExist}
        <Link to='/tasks/inbox'>
          <span>{dictionaries[language].TryHomePage}</span>
        </Link>
      </h2>
      <div className='not-found'></div>
    </div>
  );
};
