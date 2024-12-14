import React from "react";
import { assets } from "../assets/assets_frontend/assets";

const Header = () => {
  return (
    <div
      className="sm:max-md:flex-col 
    md:flex   px-[5%] md:pt-[5%]  text-zinc-600 mt-[2%] rounded-xl"
    >
      {/* Left side */}
      <div className="flex-col  gap-5 pt-[5%] ">
        <p className="text-5xl font-extrabold font-serif py-2 ">
          Get Consultation
        </p>
        <p className="text-5xl font-extrabold font-serif py-1">from best</p>
        <p className="text-5xl font-extrabold font-serif py-1">Doctors</p>
        <div className="flex justify-between items-center gap-4">
          <img src={assets.group_profiles} alt="" />
          <div>
            <p>Simply browse through our extensive list of</p>
            <p>trusted doctors,</p>
            <p>schedule your appointment hassle-free.</p>
          </div>
        </div>
        <button className="flex gap-1 items-center font-bold p-4 m-4 bg-white text-black rounded-3xl border-2 border-zinc-500">
          Book appointment <img src={assets.arrow_icon} alt="" />
        </button>
      </div>
      {/* Right side */}
      <div className="flex  w-[50%] h-[60%]  pb-[5%] ">
        <img src={assets.background} alt="" className="h-[80vh] w-full" />
      </div>
    </div>
  );
};

export default Header;
