import useFetchWeatherForecast from '../../fetchingFunctions/useFetchWeatherForecast';
import ErrorComponent from '../ErrorComponent';

export default function WeatherForecast({ city, dispatch }) {
  const isValidParameters = city;

  // FETCHING WEATHER FORECAST
  const { formattedWeatherData, loading, error } = useFetchWeatherForecast(
    isValidParameters ? city : '',
    dispatch
  );

  if (loading) {
    return (
      <p className='text-2xl text-white font-extrabold text-center'>
        Loading weather data...
      </p>
    );
  }

  if (error) {
    return <ErrorComponent errortext={error} />;
  }

  if (!formattedWeatherData) {
    return (
      <p className='text-2xl text-white font-extrabold text-center'>
        No weather data available.
      </p>
    );
  }
  return (
    <div className='border-slate-300 border-1 rounded-md p-2 bg-slate-400 mt-4 mb-4 bg-opacity-60'>
      <h3 className='text-center font-extrabold underline text-2xl text-white font-extrabold'>
        Weather Forecast
      </h3>
      <div className='border-slate-300 border-1 rounded-md p-2 bg-slate-400 my-2 bg-opacity-50'>
        <ul className='flex justify-center items-center flex-col '>
          <li className='text-xl font-extrabold'>
            {formattedWeatherData.weatherCondition}
          </li>
          <img
            src={formattedWeatherData.weatherConditionIcon}
            className='w-32'
            alt='Current weather Condition Image'
          />
        </ul>
        <ul className='flex justify-between gap-20'>
          <li className='text-md font-extrabold'>
            {`Temp: ${formattedWeatherData.temperature}`} &deg;C
          </li>
          <li className='text-md font-extrabold'>
            {`Hum: ${formattedWeatherData.humidity}`} g/m3
          </li>
        </ul>
      </div>
    </div>
  );
}
