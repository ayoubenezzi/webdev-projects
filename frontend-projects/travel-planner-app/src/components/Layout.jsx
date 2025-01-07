import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex flex-col items-center">
      <Link to="/">
        <h1 className="text-[#4c6ef5] text-center text-xl pt-8 md:text-3xl font-extrabold font-sans bg-white bg-[#d0ebff] w-max px-1 rounded-lg mt-2 h-max">
          Plan<span className="text-[#d6336c]"> Your Travel!</span>
        </h1>
      </Link>
      <Outlet />
    </div>
  );
}
