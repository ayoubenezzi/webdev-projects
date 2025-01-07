import { useState, useEffect } from 'react';
import getAccessToken from './getAccessToken';

export default function useFetchMyCityCode(myCity) {
  const [myIataCityCode, setMyIataCityCode] = useState(null);

  useEffect(
    function () {
      if (!myCity) return;
      async function fetchMyLocation() {
        try {
          const token = await getAccessToken();
          const response = await fetch(
            `https://test.api.amadeus.com/v1/reference-data/locations/cities?keyword=${myCity}&include=AIRPORTS`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (!response.ok) {
            throw new Error('Failed to fetch Destination data');
          }
          const result = await response.json();
          if (result?.data?.length > 0) {
            setMyIataCityCode(
              result?.data[0]?.iataCode ??
                Object.keys(result?.included?.airports || {})[0]
            );
          } else {
            console.warn('No city code found for the given City');
          }
        } catch (error) {
          console.error('Error recieved', error.message);
        }
      }
      fetchMyLocation();
    },
    [myCity]
  );
  return myIataCityCode;
}
