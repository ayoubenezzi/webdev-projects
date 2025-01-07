import { useReducer } from "react";
import DestinationCard from "./components/DestinationCard";
import SearchBar from "./components/SearchBar";
import { useDebounce } from "./fetchingFunctions/useDebounce";
import DestinationInformation from "./components/DestinationInformation";
import useFetchDataApi from "./fetchingFunctions/useFetchDataApi";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import useFetchMyCityCode from "./fetchingFunctions/useFetchMyCityCode";
import ItineraryPlanner from "./components/ItineraryPlanner";

const initialState = {
  itineraryInformation: [
    {
      city: "Barcelona",
      flightTime: "19:00",
      flightDate: "2025-01-03",
      airFare: 500,
      currency: "USD",
      attractionToVisit: "Museum",
    },
    {
      city: "Casablanca",
      flightTime: "19:00",
      flightDate: "2025-01-03",
      airFare: 500,
      currency: "USD",
      attractionToVisit: "Museum",
    },
  ],
  destinationInformation: [],
  hotelInformation: [],
  hotelsInCity: [],
  flightInformation: [],
  weatherInformation: [],
  topAttractionsInformation: [],
  keyword: "",
  loadingState: true,
};

function reducer(state, action) {
  switch (action.type) {
    case "itineraryInformation":
      return {
        ...state,
        itineraryInformation: action.payload,
      };

    case "destinationData":
      return {
        ...state,
        destinationInformation: action.payload,
      };
    case "topAttractions":
      return {
        ...state,
        topAttractionsInformation: action.payload,
      };
    case "hotelOffers":
      return {
        ...state,
        hotelInformation: action.payload,
      };
    case "flightOffers":
      return {
        ...state,
        flightInformation: action.payload,
      };
    case "weatherData":
      return {
        ...state,
        weatherInformation: action.payload,
      };
    case "hotelsInCity":
      return {
        ...state,
        hotelsInCity: action.payload,
      };
    case "search":
      return {
        ...state,
        keyword: action.payload.toUpperCase(),
      };
    case "setCurrentCity":
      return {
        ...state,
        city: action.payload.toUpperCase(),
      };
    case "setLoadingState":
      return {
        ...state,
        loadingState: action.payload,
      };
    default:
      throw new Error("Action is unknown");
  }
}

// const URLDESTINATION = `https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY&keyword=`;
const URLDESTINATION = `https://test.api.amadeus.com/v1/reference-data/locations/cities?include=AIRPORTS&keyword=`;

function App() {
  const [
    {
      destinationInformation,
      keyword,
      loadingState,
      city,
      itineraryInformation,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const myCityCode = useFetchMyCityCode(useDebounce(city, 1000));

  const debouncedKeyword = useDebounce(keyword, 1000);
  useFetchDataApi(URLDESTINATION, debouncedKeyword, dispatch, {
    dataActionType: "destinationData",
    loadingActionType: "setLoadingState",
  });

  return (
    <div
      className={`w-[calc(100vw-40px)] h-[calc(100vh-40px)] bg-[url('/bg-photo.jpg')] bg-cover bg-center mx-auto my-5 rounded-md flex flex-col items-center gap-5 overflow-y-auto align`}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <>
                  <SearchBar dispatch={dispatch} />
                  <DestinationCard
                    keyword={keyword}
                    information={destinationInformation}
                    loadingState={loadingState}
                    dispatch={dispatch}
                  />
                </>
              }
            />
            <Route
              path="destination/:city/:cityCode/:latitude/:longitude"
              element={
                <DestinationInformation
                  dispatch={dispatch}
                  myCityCode={myCityCode}
                  itineraryInformation={itineraryInformation}
                />
              }
            />
            <Route
              path="itinerary"
              element={
                <ItineraryPlanner
                  itineraryInformation={itineraryInformation}
                  dispatch={dispatch}
                />
              }
            />
            <Route
              path="*"
              element={
                <h1 className="text-center text-white text-6xl font-extrabold mt-10">
                  Page not found!
                </h1>
              }
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
