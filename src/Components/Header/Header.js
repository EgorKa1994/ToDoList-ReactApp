import React from 'react';
import { WeatherLocation } from '../Header/WeatherLocation/WeatherLocation';
import { LoginControl } from '../Header/LoginControl/LoginControl';

export const Header = () => {
  return (
    <header>
      <h1>Your personal ToDoList</h1>
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
