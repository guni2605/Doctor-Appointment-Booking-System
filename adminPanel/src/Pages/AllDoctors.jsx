import React, { useContext, useEffect } from "react";
import { AdminContext } from "../store/AdminContext";
import axios from "axios";
import DoctorCard from "../Components/DoctorCard";
const AllDoctors = () => {
  const { atoken, backendUrl, getDoctors, doctorList, changeAvailibility } =
    useContext(AdminContext);
  useEffect(() => {
    getDoctors();
    // console.log(list);
  }, [atoken]);
  return (
    <div className="w-[60%] mx-auto">
      <h1>All doctors</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 ">
        {doctorList.map((doctor, index) => (
          <DoctorCard
            key={index}
            id={doctor._id}
            image={doctor.image}
            name={doctor.name}
            speciality={doctor.speciality}
            available={doctor.available}
          />
        ))}
      </div>
    </div>
  );
};

export default AllDoctors;
