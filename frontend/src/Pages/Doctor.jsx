import React from "react";
import CategorySidebar from "../Components/CategorySidebar";
import Displaydoctorlist from "../Components/Displaydoctorlist";

const Doctor = () => {
  return (
    <div className="flex mt-[5%]">
      <CategorySidebar />
      <div className="w-[80%] pl-[4%]">
        <Displaydoctorlist />
      </div>
    </div>
  );
};

export default Doctor;
