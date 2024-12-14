import React, { useContext } from "react";
import Login from "./Pages/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminContext } from "./store/AdminContext";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import AddDoctor from "./Pages/AddDoctor";
import { Routes, Route } from "react-router-dom";
import AllDoctors from "./Pages/AllDoctors";

const App = () => {
  const { atoken } = useContext(AdminContext);
  return (
    <div>
      {atoken ? (
        <>
          <Navbar />
          <div className="flex">
            <Sidebar />
            <Routes>
              <Route path="/add-doctor" element={<AddDoctor />} />
              <Route path="/all-doctors" element={<AllDoctors />} />
            </Routes>
          </div>
        </>
      ) : (
        <Login />
      )}
      <ToastContainer />
    </div>
  );
};

export default App;
