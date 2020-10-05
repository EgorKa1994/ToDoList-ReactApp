import React, { useContext } from 'react';
import { WeatherLocation } from '../Header/WeatherLocation/WeatherLocation';
import { LoginControl } from '../Header/LoginControl/LoginControl';
import { dictionaries } from '../../Dictionaries/Dictionaries';
import { LanguageContext } from '../../Components/Common/Context/Context';

export const Header = () => {
  const { language } = useContext(LanguageContext);
  return (
    <header>
      <h1>{dictionaries[language].AppTitle}</h1>
      <SubHeader />
    </header>
  );
};

const SubHeader = () => {
  return (
    <div className='header-flex'>
      <WeatherLocation />
      <LoginControl />
    </div>
  );
};
