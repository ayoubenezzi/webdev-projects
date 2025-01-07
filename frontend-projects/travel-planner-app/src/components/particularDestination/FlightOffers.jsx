import useFetchDataApi from '../../fetchingFunctions/useFetchDataApi';
import ErrorComponent from '../ErrorComponent';

export default function FlightOffers({
  cityCode,
  dispatch,
  myCityCode,
  setItineraryData,
}) {
  const isValidParameters = cityCode && myCityCode;

  const date = new Date(new Date().setDate(new Date().getDate() + 1))
    .toISOString()
    .split('T')[0];
  const flightkeyword = `${cityCode}&departureDate=${date}&adults=1`;

  const URLFLIGHTOFFERS = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${myCityCode}&max=10&destinationLocationCode=`;

  function handleClick(index) {
    setItineraryData({
      departureDate:
        flightData?.data?.[
          index
        ]?.itineraries?.[0]?.segments?.[0]?.departure?.at.split('T')[0],
      departureTime: flightData?.data?.[
        index
      ]?.itineraries?.[0]?.segments?.[0]?.departure?.at
        .split('T')[1]
        .split(':')
        .slice(0, 2)
        .join(':'),
      airFare: flightData?.data?.[index]?.price?.total,
      currency: flightData?.data?.[index]?.price?.currency,
    });
  }

  // FETCHING FLIGHT OFFERS
  const {
    data: flightData,
    error: flightError,
    loading: flightLoading,
  } = useFetchDataApi(
    URLFLIGHTOFFERS,
    isValidParameters ? flightkeyword : '',
    dispatch,
    {
      dataActionType: 'flightOffers',
      loadingActionType: 'setLoadingState',
    }
  );

  if (!isValidParameters) {
    return <ErrorComponent errortext='Invalid parameters provided.' />;
  }

  if (flightLoading) {
    return (
      <h1 className='text-2xl text-white font-extrabold text-center'>
        Loading...
      </h1>
    );
  }

  if (flightError) {
    return <ErrorComponent errortext={flightError} />;
  }

  if (flightData?.data?.length === 0) {
    return (
      <ErrorComponent
        errortext={'No Flight Data to this Destination Available'}
      />
    );
  }
  const departureDate =
    flightData?.data?.[0]?.itineraries?.[0]?.segments?.[0]?.departure?.at.split(
      'T'
    )[0];
  const departureTime =
    flightData?.data?.[0]?.itineraries?.[0]?.segments?.[0]?.departure?.at
      .split('T')[1]
      .split(':')
      .slice(0, 2)
      .join(':');
  const farePrice = flightData?.data?.[0]?.price?.total;
  const farePriceCurrency = flightData?.data?.[0]?.price?.currency;
  const availableSeats = flightData?.data?.[0]?.numberOfBookableSeats;
  const classSeats =
    flightData?.data[0]?.travelerPricings[0]?.fareDetailsBySegment[1]?.cabin;

  return (
    <div className='border-slate-300 border-2 rounded-md px-3 bg-slate-400 m-auto relative overflow-y-auto bg-opacity-60'>
      <h3 className='text-center font-extrabold underline text-2xl sticky text-white p-4 top-1 rounded-md mt-1 bg-[#708090] bg-opacity-40'>
        Flight Offers
      </h3>
      {flightData?.data?.map((item, index) => {
        const departureDate =
          item?.itineraries?.[0]?.segments?.[0]?.departure?.at.split('T')[0];
        const departureTime =
          item?.itineraries?.[0]?.segments?.[0]?.departure?.at
            .split('T')[1]
            .split(':')
            .slice(0, 2)
            .join(':');
        const farePrice = item?.price?.total;
        const farePriceCurrency = item?.price?.currency;
        const availableSeats = item?.numberOfBookableSeats;
        const classSeats =
          item?.travelerPricings[0]?.fareDetailsBySegment[1]?.cabin;

        return (
          <div key={index}>
            <div
              className='border-slate-300 border-2 rounded-md p-2 bg-slate-400 my-2 bg-opacity-50 hover:bg-opacity-20 hover:cursor-pointer transition ease-in-out duration-200 active:bg-opacity-90'
              onClick={() => handleClick(index)}>
              <ul className='flex justify-between '>
                <li className='text-sm font-extrabold'>Departure Date:</li>
                <li className='text-xs sm:text-xl md:text-2xl font-extrabold text-[#ACE1AF]'>
                  {departureDate}
                </li>
              </ul>
              <ul className='flex justify-between '>
                <li className='text-sm font-extrabold'>Departure Time:</li>
                <li className='text-xs sm:text-xl md:text-2xl font-extrabold text-[#ACE1AF]'>
                  {departureTime}
                </li>
              </ul>
              <ul className='flex justify-between '>
                <li className='text-sm font-extrabold'>Air Fare:</li>
                <li className='text-xs sm:text-xl md:text-2xl font-extrabold text-[#ACE1AF]'>{`${farePrice} ${farePriceCurrency}`}</li>
              </ul>
              <ul className='flex justify-between '>
                <li className='text-sm font-extrabold'>Available Seats:</li>
                <li className='text-xs sm:text-xl md:text-2xl font-extrabold text-[#ACE1AF]'>
                  {availableSeats} SEATS
                </li>
              </ul>
              <ul className='flex justify-between '>
                <li className='text-sm font-extrabold'>Class:</li>
                <li className='text-xs sm:text-xl md:text-2xl font-extrabold text-[#ACE1AF]'>
                  {classSeats}
                </li>
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}
