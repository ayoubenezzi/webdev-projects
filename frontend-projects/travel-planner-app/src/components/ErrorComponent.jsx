export default function ErrorComponent({ errortext }) {
  return (
    <div className='border-slate-300 border-2 rounded-md p-2 bg-gray-50 my-2'>
      <p className='text-2xl text-red-300 font-extrabold text-center'>
        {errortext}!!
      </p>
    </div>
  );
}
