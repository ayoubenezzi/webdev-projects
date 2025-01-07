import { useEffect, useState } from 'react';

const apiKey = 'c4d3be2ad65f981855965239aa5b3a12';

export default function useFetchWeatherForecast(city, dispatch) {
  const [formattedWeatherData, setFormattedWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const responseData = await response.json();
        const convertedData = convertWeatherData(responseData);
        setFormattedWeatherData(convertedData);
        dispatch({ type: 'weatherData', payload: convertedData });
      } catch (error) {
        setError(error.message = "No weather data available.");
        console.error("Weather API:", error.message);
      } finally {
        setLoading(false);
      }
    };
    if (city) {
      fetchWeatherData();
    }
  }, [city, dispatch]);
  return {formattedWeatherData, loading, error};
}

function convertWeatherData(data) {
  const weatherData = {
    weatherCondition: data.weather[0].main,
    weatherConditionIcon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
    temperature: (data.main.temp - 273.15).toFixed(1),
    humidity: data.main.humidity,
  };
  return weatherData;
}
