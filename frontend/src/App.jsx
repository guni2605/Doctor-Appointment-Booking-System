import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Doctor from "./Pages/Doctor.jsx";
import Contact from "./Pages/Contact.jsx";
import About from "./Pages/About.jsx";
import Navbar from "./Components/Navbar.jsx";
import SignIn from "./Pages/SignIn.jsx";
import Myappointment from "./Pages/Myappointment.jsx";
import Myprofile from "./Pages/Myprofile.jsx";
import { ContextStoreProvider } from "./store/ContextStore.jsx";
import Doctordetail from "./Components/Doctordetail.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <ContextStoreProvider>
      <ToastContainer />
      <div className="mx-4 md:mx-[10%] my-3">
        <Navbar></Navbar>
        <hr className="bg-slate-400 h-0.5  " />

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/doctors" element={<Doctor />}></Route>
          <Route
            path="/appointment/:doctorId"
            element={<Doctordetail />}
          ></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/my-profile" element={<Myprofile />}></Route>
          <Route path="/my-appointment" element={<Myappointment />}></Route>
        </Routes>
      </div>
    </ContextStoreProvider>
  );
};

export default App;
