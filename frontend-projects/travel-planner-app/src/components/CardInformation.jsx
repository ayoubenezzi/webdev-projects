import { Link } from 'react-router-dom';

export default function CardInformation({
  city,
  cityCode,
  country,
  latitude,
  longitude,
}) {
  return (
    <Link to={`/destination/${city}/${cityCode}/${latitude}/${longitude}`}>
      <div className='flex flex-row justify-between  mt-2 bg-slate-400 p-2 rounded hover:scale-105 hover:cursor-pointer transition ease-in-out duration-200 bg-opacity-80 text-white text-sm sm:text-base md:text-lg font-extrabold'>
        <p>{city}</p>
        <p>{country}</p>
      </div>
    </Link>
  );
}
