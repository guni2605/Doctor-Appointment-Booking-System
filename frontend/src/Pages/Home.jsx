import React from "react";
import { Link } from "react-router-dom";
import Header from "../Components/Header";
import Category from "../Components/Category";
import Displaydoctorlist from "../Components/Displaydoctorlist";
import { assets } from "../assets/assets_frontend/assets";

const Home = () => {
  return (
    <div className="mx-auto flex-col align-center justify-center">
      <Header />
      <Category />
      <Displaydoctorlist />
      <Link
        to="/doctors"
        className="flex items-center justify-center text-lg font-normal rounded-3xl px-6 py-4 shadow-lg shadow-zinc-500 w-[20%] mx-auto my-[2%]"
      >
        View More <img src={assets.arrow_icon} alt="" />
      </Link>
    </div>
  );
};

export default Home;
