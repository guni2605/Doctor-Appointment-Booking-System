import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../../src/assets/assets_frontend/assets.js";
import { contextStore } from "../store/ContextStore.jsx";
const Navbar = () => {
  const { setCategory } = useContext(contextStore);
  const [showmenu, setShowMenu] = useState(false);
  const { token, setToken } = useContext(contextStore);
  const navigate = useNavigate();
  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
  };
  return (
    <div className="mx-4 py-2 md: flex  justify-between items-center px-4 ">
      {/* <img src={assets.logo} alt="" /> */}
      <p className="text-3xl font-bold text-red-500">MEDICAL +</p>
      <ul className="hidden md:flex gap-5 items-center  font-medium">
        <NavLink to="/" onClick={() => setCategory("All")}>
          <li>HOME</li>
          <hr className=" border-none outline-none h-0.5 bg-primary w-4/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/doctors">
          <li>ALL DOCTORS</li>
          <hr className="  border-none outline-none h-0.5 bg-primary w-4/5 m-auto hidden" />
        </NavLink>
        <NavLink to="contact">
          <li>CONTACT</li>
          <hr className=" border-none outline-none h-0.5 bg-primary w-4/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/about">
          <li>ABOUT US</li>
          <hr className=" border-none outline-none h-0.5 bg-primary w-4/5 m-auto hidden" />
        </NavLink>
        <button className="border-2 border-gray-300 rounded-3xl p-1 text-xs">
          <a href="https://admin-panel-09j7.onrender.com">Admin Panel</a>
        </button>
      </ul>
      {token ? (
        <div className="relative flex items-center gap-3 group">
          <img src={assets.profile_pic} className="w-10 rounded-full" alt="" />
          <img src={assets.dropdown_icon} alt="" />
          <div className="absolute hidden flex-col justify-center gap-2 group-hover:block w-15 right-0 top-0 pt-12">
            <div className=" border-collapse rounded-xl border-1 border-slate-600">
              <p
                onClick={() => navigate("/my-profile")}
                className="border-2 border-slate-300 p-3 "
              >
                My Profile
              </p>
              <p
                onClick={() => navigate("/my-appointment")}
                className="border-2 border-slate-300 p-3 "
              >
                Appointment
              </p>
              <p
                onClick={() => logout()}
                className="border-2 border-slate-300 p-3"
              >
                Logout
              </p>
            </div>
          </div>
        </div>
      ) : (
        <button
          className="bg-primary text-white border-none p-2 rounded-3xl hidden md:block "
          onClick={() => navigate("/signin")}
        >
          Create Account
        </button>
      )}
    </div>
  );
};

export default Navbar;
