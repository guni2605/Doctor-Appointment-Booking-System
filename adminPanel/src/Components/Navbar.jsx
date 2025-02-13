import React, { useContext } from "react";
import { AdminContext } from "../store/AdminContext.jsx";
import { DoctorContext } from "../store/DoctorContext.jsx";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const { atoken, setaToken } = useContext(AdminContext);
  const { dtoken, setdToken } = useContext(DoctorContext);
  const navigate = useNavigate();
  console.log(atoken);
  console.log(dtoken);
  const logout = () => {
    atoken && setaToken("");
    atoken && localStorage.removeItem("atoken");
    dtoken && setdToken("");
    dtoken && localStorage.removeItem("dtoken");
    Navigate("/");
  };
  return (
    <div className="bg-slate-300 px-[10%] py-[2%] flex justify-between items-center">
      <div className="flex justify-between items-center gap-5">
        <p className="text-red-500 font-extrabold text-2xl">MEDICAL+</p>
        <p className="border-2 border-slate-500 rounded-3xl px-2 py-1/2">
          {dtoken ? "Doctor" : "Admin"}
        </p>
      </div>
      <div>
        <button
          onClick={() => logout()}
          className="bg-red-600 rounded-3xl px-4 py-1 text-white"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
