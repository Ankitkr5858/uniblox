import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div>
      <div className="relative flex flex-col gap-y-4 lg:flex-row  items-center justify-center w-full min-h-screen ">
        <div className="flex flex-col ">
          <h1 className="text-[150px] md:text-md md:tracking-normal lg:text-md text-slate-300 dark:text-slate-50 font-bold lg:tracking-wide lg:leading-4 lg:shadow-md md:hover:text-slate-400">
            FASHION
          </h1>
          <img
            src="./hero-img.png"
            alt="img"
            width={700}
            height={700}
            className="absolute w-[500px] h-[500px] object-cover md:w-[550px] md:h-[550px] lg:w-[700px] lg:h-[700px] top-[10%] left-[5%] md:left-[30%] hover:translate-y-4 transition-all ease-in-out duration-1000"
          />
        </div>
        <Link to="/explore" className="cursor-pointer relative z-[999px]">
          <button className="bg-[#2a2a2a] dark:bg-slate-800 text-white p-2 rounded-md cursor-pointer hover:bg-black">
            Explore Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
