import React, { useContext, useState } from "react";
import { assets, specialityData } from "../assets/assets_frontend/assets";
import { Link } from "react-router-dom";
import { contextStore } from "../store/ContextStore";
const Category = () => {
  const { category, setCategory } = useContext(contextStore);
  return (
    <div className="flex-col justify-center items-center m-[3%] p-4 gap-5 ">
      <h1 className="font-bold text-xl text-center ">
        Find doctors with different expertise -
      </h1>
      <p className="text-center">
        Simply browse through our extensive list of trusted doctors, schedule
        your appointment hassle-free.
      </p>
      <div className="flex justify-evenly items-center gap-2 p-4 w-4/5 mx-auto text-xs ">
        {specialityData.map((item) => (
          <Link
            // to="/speciality/${item.speciality} "
            onClick={() =>
              setCategory(
                category === item.speciality ? "All" : item.speciality
              )
            }
            className="flex-col justify-center "
            key={item.image}
          >
            <img
              src={item.image}
              alt=""
              className="p-1 w-4/5 rounded-full active:border-2 active:border-blue-500"
            />
            <p>{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;
