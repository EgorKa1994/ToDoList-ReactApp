import React, { useEffect, useState } from 'react';

export const Header = () => {
  return (
    <header>
      <WeatherLocation />
    </header>
  );
};

const WeatherLocation = () => {
  const { weather, isLoading, error } = usePositionAndWeather();

  if (isLoading) {
    return '...loading...';
  }

  if (error) {
    return `There is error: ${error}`;
  }

  return (
    <div>
      <h1>Your personal ToDoList</h1>
      <div className='header-flex'>
        <div>
          {`${weather.name}, ${weather.sys.country}   `}
          {`${Math.round(weather.main.temp)}`}&#176;
          {`C, ${weather.wind.speed} m/s`}
        </div>
        <div>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          />
        </div>
      </div>
    </div>
  );
};

const usePositionAndWeather = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [weather, setWeather] = useState(null);

  const API_KEY = 'ea0ddfa25955f6a751b68b2c910eb35b';

  useEffect(() => {
    const getCoords = async () => {
      try {
        const pos = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        const response = await [pos.coords.latitude, pos.coords.longitude];
        const weatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${response[0]}&lon=${response[1]}&units=metric&appid=${API_KEY}`
        );
        const weatherData = await weatherResponse.json();
        setWeather(weatherData);
        console.log(weatherData);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    getCoords();
  }, []);

  return { weather, isLoading, error };
};
