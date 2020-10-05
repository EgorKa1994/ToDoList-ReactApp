import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { dictionaries } from '../../../../Dictionaries/Dictionaries';
import { LanguageContext } from '../../../Common/Context/Context';

export const StartPage = () => {
  const { language } = useContext(LanguageContext);
  return (
    <div className='authorization'>
      <h2>
        {dictionaries[language].ToUseThisApp}
        <Link to='/registration'>
          <span> {dictionaries[language].ToUseThisAppRegister}</span>
        </Link>
        {dictionaries[language].Or}
        <Link to='/login'>
          <span>{dictionaries[language].Logon}</span>
        </Link>
        {dictionaries[language].IfYouHaveProfile}
      </h2>
      <div></div>
    </div>
  );
};
