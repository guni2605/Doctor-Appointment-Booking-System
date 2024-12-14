import React, { useContext } from "react";

import { Link, useNavigate } from "react-router-dom";
import { AdminContext } from "../store/AdminContext";

const DoctorCard = ({ id, name, image, speciality, available }) => {
  const { changeAvailibility } = useContext(AdminContext);
  const navigate = useNavigate();
  return (
    <div className=" flex-col m-2 gap-2  shadow-sm border-1 border-zinc-600 shadow-zinc-500 ">
      <div className="bg-sky-100">
        <img src={image} alt="" className="" />
      </div>
      <p className="px-3 py-1 text-lg text-center font-bold font-mono ">
        {name}
      </p>
      <p className="px-3 py-1 text-lg text-center font-mono ">{speciality}</p>
      <div className="flex items-center gap-2 px-6 mb-2">
        <input
          type="checkbox"
          checked={available}
          onChange={() => {
            changeAvailibility(id);
          }}
        />
        <p>Available</p>
      </div>
    </div>
  );
};

export default DoctorCard;
