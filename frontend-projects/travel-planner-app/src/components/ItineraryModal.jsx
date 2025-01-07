import { useEffect, useRef, useState } from "react";

export default function ItineraryModal({
  valuesToEdit,
  setIsModalOpen,
  dispatch,
  itineraryInformation,
  editedIndex,
  setSavedState,
}) {
  const [formData, setFormData] = useState({
    flightDate: valuesToEdit?.flightDate || "",
    flightTime: valuesToEdit?.flightTime || "",
    airFare: valuesToEdit?.airFare || 0,
    currency: valuesToEdit?.currency || "",
    city: valuesToEdit?.city || "",
    attractionToVisit: valuesToEdit?.attractionToVisit || "",
  });
  const [errors, setErrors] = useState({});
  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsModalOpen(false);
        if (editedIndex !== null && editedIndex !== undefined) {
          setSavedState((prev) => ({ ...prev, [editedIndex]: true }));
        }
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [setIsModalOpen, editedIndex, setSavedState]);

  const validate = () => {
    const newErrors = {};
    if (!formData.flightDate.trim())
      newErrors.flightDate = "Flight Date is required";
    if (!formData.flightTime.trim())
      newErrors.flightTime = "Flight Time is required";
    if (!String(formData.airFare).trim())
      newErrors.airFare = "Air Fare is required";
    if (!formData.currency.trim()) newErrors.currency = "Currency is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.attractionToVisit.trim())
      newErrors.attractionToVisit = "Attraction Site is required";
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (validate()) {
      console.log("Form Submitted:", formData);
    }
    if (editedIndex !== null && editedIndex !== undefined) {
      const updatedItineraryInformation = [...itineraryInformation];
      updatedItineraryInformation.splice(editedIndex, 1, formData);
      dispatch({
        type: "itineraryInformation",
        payload: updatedItineraryInformation,
      });

      setSavedState((prev) => ({ ...prev, [editedIndex]: true }));
    }

    setIsModalOpen(false);
  }

  return (
    <div className="relative h-screen bg-gray-200">
      <div className="fixed inset-0 bg-[#343a40] bg-opacity-50 flex justify-center items-center z-50">
        <form
          ref={modalRef}
          onSubmit={handleSubmit}
          className="bg-slate-800 bg-opacity-70 w-72 md:w-1/3 p-4 rounded-xl "
        >
          <div className="flex justify-between my-2 text-xl">
            <label className="text-white font-semibold" htmlFor="flightDate">
              Flight Date:
            </label>
            <input
              className="bg-slate-400 bg-opacity-70 text-white font-extrabold rounded p-1 outline-none"
              required
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={formData.flightDate}
              onChange={(e) =>
                setFormData({ ...formData, flightDate: e.target.value })
              }
            />
          </div>
          <div className="flex justify-between my-2 text-xl">
            <label className="text-white font-semibold" htmlFor="flightTime">
              Flight Time:
            </label>
            <input
              className="bg-slate-400 bg-opacity-70 text-white font-extrabold rounded p-1 outline-none"
              required
              type="text"
              value={formData.flightTime}
              onChange={(e) =>
                setFormData({ ...formData, flightTime: e.target.value })
              }
            />
          </div>
          <div className="flex justify-between my-2 text-xl">
            <label className="text-white font-semibold" htmlFor="airFare">
              Air Fare:
            </label>
            <input
              className="bg-slate-400 bg-opacity-70 text-white font-extrabold rounded p-1 outline-none"
              required
              type="number"
              value={formData.airFare}
              onChange={(e) =>
                setFormData({ ...formData, airFare: e.target.value })
              }
            />
          </div>

          <div className="flex justify-between my-2 text-xl">
            <label
              className="text-white font-semibold"
              htmlFor="attractionSite"
            >
              Attraction Site:
            </label>
            <input
              className="bg-slate-400 bg-opacity-70 text-white font-extrabold rounded p-1 outline-none"
              required
              type="text"
              value={formData.attractionToVisit}
              onChange={(e) =>
                setFormData({ ...formData, attractionToVisit: e.target.value })
              }
            />
          </div>
          <div className="flex justify-between my-2 text-xl">
            <label className="text-white font-semibold" htmlFor="currency">
              Currency:
            </label>
            <input
              className="bg-slate-400 bg-opacity-70 text-white font-extrabold rounded p-1 outline-none"
              required
              type="text"
              value={formData.currency}
              onChange={(e) =>
                setFormData({ ...formData, currency: e.target.value })
              }
            />
          </div>
          <div className="flex justify-between my-2 text-xl">
            <label className="text-white font-semibold" htmlFor="city">
              City:
            </label>
            <input
              className="bg-slate-400 bg-opacity-70 text-white font-extrabold rounded p-1 outline-none"
              required
              type="text"
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
            />
          </div>
          <button className="bg-amber-500 p-2 rounded hover:bg-opacity-90 hover:cursor-pointer active:scale-95 transition ease-in-out duration-200 w-max block m-auto">
            SAVE
          </button>
        </form>
      </div>
    </div>
  );
}
