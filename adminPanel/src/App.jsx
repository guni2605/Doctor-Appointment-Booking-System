import React, { useContext } from "react";
import Login from "./Pages/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminContext } from "./store/AdminContext";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import AddDoctor from "./Pages/AddDoctor";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AllDoctors from "./Pages/AllDoctors";
import { DoctorContext } from "./store/DoctorContext";
import AllAppointment from "./Components/AllAppointment";
import DoctorAppointment from "./Components/DoctorAppointment";
import Home from "./Components/Home";

const App = () => {
  const { atoken } = useContext(AdminContext);
  const { dtoken } = useContext(DoctorContext);
  return (
    <BrowserRouter>
      <Routes>
        {dtoken || atoken ? (
          <Route path="/" element={<Home />}>
            {atoken && <Route path="add-doctor" element={<AddDoctor />} />}
            {atoken && <Route path="all-doctors" element={<AllDoctors />} />}
            {atoken && (
              <Route path="appointment" element={<AllAppointment />} />
            )}
            {dtoken && (
              <Route
                path="appointment/:docId"
                element={<DoctorAppointment />}
              />
            )}
          </Route>
        ) : (
          <Route path="/" element={<Login />}></Route>
        )}
      </Routes>

      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
