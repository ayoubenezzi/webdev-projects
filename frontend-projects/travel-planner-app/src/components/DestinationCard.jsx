import CardInformation from "./CardInformation";

export default function DestinationCard({
  keyword,
  information,
  loadingState,
}) {
  const citiesArray = information?.data ?? [];
  const airportsData = Object.keys(information?.included?.airports || {})[0];

  function returnCountryName(countryCode) {
    const regionNamesInEnglish = new Intl.DisplayNames(["en"], {
      type: "region",
    });
    return regionNamesInEnglish.of(`${countryCode}`);
  }

  if (loadingState === true && keyword) {
    return (
      <div>
        <h1 className="text-2xl text-white font-extrabold text-center">
          Searching for{" "}
          <span className="text-gray-950 bg-red-500 py-1 px-2 rounded text-lg">
            {keyword}
          </span>{" "}
          . . .
        </h1>
      </div>
    );
  }

  if (citiesArray.length < 1 && keyword && loadingState === false) {
    return (
      <div className="flex justify-center items-center min-h-[211px]">
        <h1 className="text-2xl text-white font-extrabold text-center">
          No information about{" "}
          <span className="text-gray-950 bg-red-500 py-1 px-2 rounded text-lg">
            {keyword}
          </span>{" "}
          ! ! !
        </h1>
      </div>
    );
  }

  if (citiesArray.length < 1) return null;

  return (
    <div className="mb-5">
      <h1 className="text-white font-extrabold text-center md:text-2xl">
        Related to the search{" "}
        <span className="text-gray-950 bg-amber-200 py-1 px-2 rounded text-lg">
          {keyword}
        </span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {citiesArray.map((item, index) => {
          let city = item["name"];
          const cityCode = item?.iataCode ?? airportsData;
          const country = returnCountryName(item?.address.countryCode);
          const latitude = item?.geoCode?.latitude;
          const longitude = item?.geoCode?.longitude;
          return (
            <div key={index}>
              <CardInformation
                city={city}
                cityCode={cityCode}
                latitude={latitude}
                longitude={longitude}
                country={country}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
