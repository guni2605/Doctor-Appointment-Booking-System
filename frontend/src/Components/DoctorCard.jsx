import React from "react";
import { assets } from "../assets/assets_frontend/assets";
import { Link, useNavigate } from "react-router-dom";

const DoctorCard = ({ id, name, image, speciality }) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex-col m-2 gap-2 shadow-sm shadow-zinc-500 "
      onClick={() => navigate(`/appointment/${id}`)}
    >
      <div className="bg-sky-100">
        <img src={image} alt="" />
      </div>
      <p className="px-3 py-1 text-lg text-center font-bold font-mono ">
        {name}
      </p>
      <p className="px-3 py-1 text-lg text-center font-mono ">{speciality}</p>
    </div>
  );
};

export default DoctorCard;
