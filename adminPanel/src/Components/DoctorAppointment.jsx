import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AdminContext } from "../store/AdminContext";

const DoctorAppointment = () => {
  const { docId } = useParams();
  const [appointment, setAppointment] = useState([]);
  console.log("DoctorAppointment");
  console.log(docId);
  const { backendUrl } = useContext(AdminContext);
  const getAppointmentList = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/appointments",
        { docId }
      );
      //console.log(data.appointments);
      setAppointment(data.appointments);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log("calling");
    getAppointmentList();
  }, []);
  console.log("DoctorAppointment");
  console.log(docId);
  return (
    <div>
      {appointment &&
        appointment.map((item) => (
          <div
            key={item._id}
            className="m-2 bg-slate-400 text-black-500 px-10 py-2 w-100 rounded-3xl"
          >
            <div className="flex gap-5">
              <p>User id : {item.userId}</p>
              <p>User Name: {item.userData.name}</p>
            </div>
            <div className="flex gap-5">
              <p>Slot Date: {item.slotDate}</p>
              <p>Slot Time: {item.slotTime}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default DoctorAppointment;
