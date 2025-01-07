import { useState } from 'react';
import useFetchDataApi from '../../fetchingFunctions/useFetchDataApi';
import ErrorComponent from '../ErrorComponent';
import Hotel from './hotelModal/Hotel';
import MiniHotelInformation from './hotelModal/MiniHotelInformation';

export default function HotelAccomodations({ cityCode, dispatch, city }) {
  const [oneHotelId, setOneHotelId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const isValidParameters = cityCode;

  const URLCITYHOTEL = `https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=${cityCode}&radius=13&radiusUnit=KM&`;

  function getHotelDetails(data) {
    if (!data?.data) return [];
    return data.data.slice(0, 12).map((hotel) => ({
      hotelName: hotel.name,
      hotelId: hotel.hotelId,
      distance: hotel.distance.value,
    }));
  }

  // FETCH HOTELS IN CURRENT CITY
  const {
    data: cityHotel,
    error: cityHotelError,
    loading: cityHotelLoading,
  } = useFetchDataApi(
    URLCITYHOTEL,
    isValidParameters ? 'hotelSource=ALL' : null,
    dispatch,
    {
      dataActionType: 'hotelsInCity',
      loadingActionType: 'setLoadingState',
    }
  );

  if (!isValidParameters) {
    return <ErrorComponent errortext='Invalid parameters provided.' />;
  }

  if (cityHotelLoading) {
    return (
      <h1 className='text-2xl text-white font-extrabold text-center'>
        Loading...
      </h1>
    );
  }

  if (cityHotelError) {
    return <ErrorComponent errortext={cityHotelError} />;
  }

  if (cityHotel?.data?.length === 0) {
    return (
      <ErrorComponent
        errortext={'No Hotel Data to this Destination Available'}
      />
    );
  }

  let hotelData = cityHotel?.data ? getHotelDetails(cityHotel) : [];
  return (
    <div className='border-slate-300 border-2 rounded-md  bg-slate-400 overflow-y-auto relative px-5 bg-opacity-60'>
      <h3 className='text-center font-extrabold underline text-2xl sticky text-white p-4 top-1 rounded-md bg-[#708090] bg-opacity-40'>
        Hotel Accomodations in{' '}
        <span className='text-gray-950 bg-amber-200 py-1 px-2 rounded text-lg'>
          {city}
        </span>{' '}
        city!
      </h3>

      {hotelData.map((hotel) => {
        return (
          <Hotel
            key={hotel.hotelId}
            hotelName={hotel.hotelName}
            hotelId={hotel.hotelId}
            distance={hotel.distance}
            city={city}
            setOneHotelId={setOneHotelId}
            openModal={openModal}
          />
        );
      })}
      {isModalOpen && (
        <MiniHotelInformation
          isOpen={isModalOpen}
          onClose={closeModal}
          oneHotelId={oneHotelId}
          dispatch={dispatch}
        />
      )}
    </div>
  );
}
