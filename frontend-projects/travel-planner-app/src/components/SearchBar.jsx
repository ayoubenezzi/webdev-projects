import { useState } from "react";

export default function SearchBar({ dispatch }) {
  const [keyword, setKeyWord] = useState("");
  const [city, setCity] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (keyword.trim().length < 3) {
      setKeyWord("");
      return;
    }
    dispatch({ type: "search", payload: keyword });
    dispatch({ type: "setCurrentCity", payload: city });
    dispatch({ type: "setLoadingState", payload: true });
    setKeyWord("");
    setCity("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#abe117] flex gap-11 p-7 rounded-md my-5 md:flex-row md:justify-between flex-col md:items-center w-11/12 m-auto"
    >
      <button className="text-white font-bold bg-[#117abe] p-1 rounded-md hover:bg-slate-600">
        EXPLORE
      </button>
      <input
        type="text"
        placeholder="Where You Are!"
        className="p-3 rounded-md outline-none md:w-4/12"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <input
        type="text"
        placeholder="Where You Want To Go!"
        className="p-3 rounded-md outline-none"
        value={keyword}
        onChange={(e) => setKeyWord(e.target.value)}
      />
    </form>
  );
}
