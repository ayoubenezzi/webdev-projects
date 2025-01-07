export default function Hotel({
  hotelName,
  hotelId,
  distance,
  city,
  setOneHotelId,
  openModal,
}) {
  return (
    <div
      className='border-slate-300 border-2 rounded-md p-2 bg-slate-400 my-3 bg-opacity-50 active:bg-opacity-90'
      onClick={() => {
        setOneHotelId(hotelId);
        openModal();
      }}>
      <ul className='flex justify-between gap-16 hover:font-extrabold hover:cursor-pointer transition ease-in-out duration-200 '>
        <li className='text-md'>{hotelName}</li>
        <li className='text-md'>{`${distance} KM FROM ${city} city.`}</li>
      </ul>
    </div>
  );
}
