import React, { useContext } from "react";
import { AdminContext } from "../store/AdminContext.jsx";
const Navbar = () => {
  const { atoken, setaToken } = useContext(AdminContext);
  const logout = () => {
    atoken && setaToken("");
    atoken && localStorage.removeItem("token");
  };
  return (
    <div className="bg-slate-300 px-[10%] py-[2%] flex justify-between items-center">
      <div className="flex justify-between items-center gap-5">
        <p className="text-red-500 font-extrabold text-2xl">MEDICAL+</p>
        <p className="border-2 border-slate-500 rounded-3xl px-2 py-1/2">
          Admin
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
