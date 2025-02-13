import React, { useContext } from "react";
import { assets } from "../assets/assets_admin/assets.js";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../store/AdminContext.jsx";
import { DoctorContext } from "../store/DoctorContext.jsx";
const Sidebar = () => {
  const { atoken } = useContext(AdminContext);
  const { dtoken } = useContext(DoctorContext);
  const navigate = useNavigate();
  return (
    <div className="w-[20%] px-[2%] py-[3%] flex-col gap-[2%] ">
      {dtoken ||
        (atoken && (
          <Link
            to="add-doctor"
            className="m-2  flex gap-2 items-center rounded-md border-2 border-zinc-400 px-2 py-1 hover:bg-red-100"
          >
            <img src={assets.add_icon} alt="" />
            <p>Add Doctor</p>
          </Link>
        ))}
      {atoken ? (
        <Link
          to="/appointment"
          className="m-2 flex gap-2 items-center rounded-md border-2 border-zinc-400 px-2 py-1 hover:bg-red-100"
        >
          <img src={assets.appointment_icon} alt="" />
          <p>Appointments</p>
        </Link>
      ) : (
        <Link
          to={`/appointment/${localStorage.getItem("doctorId")}`}
          className="m-2 flex gap-2 items-center rounded-md border-2 border-zinc-400 px-2 py-1 hover:bg-red-100"
        >
          <img src={assets.appointment_icon} alt="" />
          <p>Appointments</p>
        </Link>
      )}
      {atoken && (
        <Link
          to="/all-doctors"
          className="m-2 flex gap-2 items-center rounded-md border-2 border-zinc-400 px-2 py-1 hover:bg-red-100 "
        >
          <img src={assets.home_icon} alt="" />
          <p>Doctor List</p>
        </Link>
      )}
    </div>
  );
};

export default Sidebar;
