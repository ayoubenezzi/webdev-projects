import useFetchDataApi from '../../../fetchingFunctions/useFetchDataApi';
import ErrorComponent from '../../ErrorComponent';

export default function MiniHotelInformation({
  dispatch,
  isOpen,
  onClose,
  oneHotelId,
}) {
  function checkHotelAvailability(data) {
    if (!data) return {};

    let price;
    let currency;
    let title;
    let name;
    let available;

    if (data?.data?.[0]?.available) {
      available = data?.data?.[0]?.available;
      name = data?.data?.[0]?.hotel?.name;
      price = data?.data?.[0]?.offers?.[0]?.price.total;
      currency = data?.data?.[0]?.offers?.[0]?.price.currency;
    } else {
      title = data?.warnings?.[0]?.title;
    }
    return { available, name, title, price, currency };
  }
  const date = new Date(new Date().setDate(new Date().getDate() + 3))
    .toISOString()
    .split('T')[0];
  const URLHOTELOFFERS = oneHotelId
    ? `https://test.api.amadeus.com/v3/shopping/hotel-offers?hotelIds=${oneHotelId}&adults=1&checkInDate=${date}&roomQuantity=1&paymentPolicy=NONE&includeClosed=true&bestRateOnly=`
    : '';

  // FETCHING A PARTICCULAR HOTELS DATA
  const {
    data: hotelData,
    error: hotelError,
    loading: hotelLoading,
  } = useFetchDataApi(
    isOpen && oneHotelId ? URLHOTELOFFERS : '',
    'true',
    dispatch,
    {
      dataActionType: 'hotelOffers',
      loadingActionType: 'setLoadingState',
    }
  );

  if (!oneHotelId) {
    return <ErrorComponent errortext='Hotel ID is required.' />;
  }

  if (!isOpen) return null;

  const { available, name, price, currency, title } = hotelData ? (
    checkHotelAvailability(hotelData)
  ) : (
    <ErrorComponent errortext={hotelError || 'No hotels available'} />
  );

  return (
    <div className='bg-slate-300 fixed top-32 right-10 w-64 h-64 shadow-lg rounded-sm grid place-content-center p-5'>
      {hotelError ? (
        <div className='border-slate-300 border-2 rounded-md p-2 bg-gray-50 my-2'>
          <p className='text-xl text-red-300 font-extrabold text-center'>
            {hotelError}
          </p>
        </div>
      ) : (
        ''
      )}
      {available && (
        <ul className='flex justify-between flex-col gap-5'>
          <li className='text-md font-extrabold'>{name}</li>
          <li className='text-2xl font-extrabold'>
            Rate:
            {` ${price}`}
            <span>{` ${currency}`}</span>
          </li>
        </ul>
      )}
      {!available && (
        <ul>
          <li className='text-md font-extrabold'>{name}</li>
          <li className='text-xl font-extrabold text-center'>{title}</li>
        </ul>
      )}

      <button
        onClick={onClose}
        className='absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded'>
        X
      </button>
    </div>
  );
}
