import { useState } from "react";
import Button from "./Button";
import { Link } from "react-router-dom";
import ItineraryModal from "./ItineraryModal";

export default function ItineraryPlanner({ itineraryInformation, dispatch }) {
  const [savedState, setSavedState] = useState(true);
  const [savedStates, setSavedStates] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [valuesToEdit, setValuesToEdit] = useState({});
  const [editedIndex, setEditedIndex] = useState(null);

  function onEdit(index) {
    setIsModalOpen(true);
    setSavedStates((prev) => ({ ...prev, [index]: false }));
    setEditedIndex(index);
    setValuesToEdit(itineraryInformation[index]);
  }

  function onDelete(index) {
    let filteredItineraryInformation = itineraryInformation.filter(
      (item, idn) => idn !== index
    );

    setSavedStates((prev) => {
      const updatedStates = { ...prev };
      delete updatedStates[index];
      return updatedStates;
    });

    dispatch({
      type: "itineraryInformation",
      payload: filteredItineraryInformation,
    });
  }

  function onCreate() {
    setIsModalOpen(true);
    setSavedState(false);
    setValuesToEdit(null);
    if (itineraryInformation.length < 1) {
      setEditedIndex(0);
    } else {
      setEditedIndex(itineraryInformation.length);
    }
  }

  if (itineraryInformation.length < 1) {
    return (
      <div className="flex flex-col items-center h-screen gap-10 mt-5">
        <div className="">
          <Link to="/">
            <p className="text-white font-extrabold text-center bg-amber-500 p-1 md:p-2 rounded md:text-2xl hover:bg-opacity-90 hover:cursor-pointer active:scale-95 transition ease-in-out duration-200 w-11/12 m-auto md:wmax break-words">
              SEARCH FOR A DESTINATION
            </p>
          </Link>
        </div>

        <Button
          onClick={onCreate}
          className={
            "text-white text-xl font-semibold bg-green-700 p-2 rounded-md hover:text-slate-300 hover:cursor-pointer transition ease-in-out duration-200 active:scale-95"
          }
        >
          ADD ITINERARY
        </Button>

        {isModalOpen && (
          <ItineraryModal
            itineraryInformation={itineraryInformation}
            valuesToEdit={valuesToEdit}
            setIsModalOpen={setIsModalOpen}
            dispatch={dispatch}
            editedIndex={editedIndex}
            setSavedState={setSavedState}
          />
        )}
      </div>
    );
  }
  return (
    <div>
      <div className="flex justify-center my-4">
        <Button
          onClick={onCreate}
          className={
            "text-white text-xl font-semibold bg-green-700 p-2 rounded-md hover:text-slate-300 hover:cursor-pointer transition ease-in-out duration-200 active:scale-95"
          }
        >
          ADD ITINERARY
        </Button>
      </div>
      <div className="bg-slate-400 mt-5 p-3 rounded-lg bg-opacity-50 relative">
        {itineraryInformation.map((item, index) => {
          const isSaved = savedStates[index] !== false;

          return (
            <div key={index}>
              <div className="flex flex-col items-center gap-5">
                <h1 className="text-white text-5xl font-extrabold p-5 text-center">
                  Visit {item.city} City!
                </h1>
                <div className="text-center text-white text-3xl p-5 border-2 border-white rounded-md bg-slate-400 bg-opacity-50 font-semibold">
                  <p>FlightDate: {item.flightDate}</p>
                  <p>Flight Time: {item.flightTime} hrs</p>
                  <p>
                    Air Fare: {item.airFare} {item.currency}
                  </p>
                  <p>
                    Explore {item.attractionToVisit} in {item.city} city!
                  </p>

                  <div className="gap-5 mt-5 flex justify-center">
                    {isSaved && (
                      <Button
                        onClick={() => onEdit(index)}
                        className={
                          "text-white text-xl font-semibold bg-stone-500 p-2 rounded-md hover:text-slate-300 hover:cursor-pointer transition ease-in-out duration-200 active:scale-95"
                        }
                      >
                        EDIT
                      </Button>
                    )}

                    <Button
                      onClick={() => onDelete(index)}
                      className={
                        "text-white text-xl font-semibold bg-red-600 p-2 rounded-md hover:text-slate-300 hover:cursor-pointer transition ease-in-out duration-200 active:scale-95"
                      }
                    >
                      DELETE
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {isModalOpen && (
        <ItineraryModal
          itineraryInformation={itineraryInformation}
          valuesToEdit={valuesToEdit}
          setIsModalOpen={setIsModalOpen}
          dispatch={dispatch}
          editedIndex={editedIndex}
          setSavedState={setSavedStates}
        />
      )}
    </div>
  );
}
