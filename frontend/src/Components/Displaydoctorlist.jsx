import React, { useContext, useEffect } from "react";
// import { doctors } from "../assets/assets_frontend/assets";
import DoctorCard from "./doctorCard.jsx";
import { contextStore } from "../store/ContextStore.jsx";
const Displaydoctorlist = () => {
  const { doctors } = useContext(contextStore);
  const { category, setCategory } = useContext(contextStore);

  // useEffect(() => {
  //   setCategory("All");
  // });
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
      {doctors.map((doctor, index) =>
        category === "All" || doctor.speciality === category ? (
          <DoctorCard
            key={index}
            id={doctor._id}
            image={doctor.image}
            name={doctor.name}
            speciality={doctor.speciality}
          />
        ) : (
          <></>
        )
      )}
    </div>
  );
};

export default Displaydoctorlist;
