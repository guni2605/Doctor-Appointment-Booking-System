import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../store/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";
const AllAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const { backendUrl, atoken } = useContext(AdminContext);
  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const api = backendUrl + "/api/admin/all/appointments";
        console.log(api);
        const response = await axios.get(api, { headers: { atoken } });
        console.log(response.data.appointments);
        setAppointments(response.data.appointments);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchAppointment();
  }, []);
  return (
    <div className="w-[80vw]">
      <h1 className="font-semibold text-2xl">All appointment</h1>
      <div className="flex-col mx-10">
        <div className="flex justify-evenly text-2xl p-2 border border-zinc-700 rounded-md my-10">
          <p>Doctor Name</p>
          <p>UserName</p>
          <p>Slot Date and Time</p>
          <p>Amount</p>
          <p>Status</p>
        </div>
        {appointments &&
          appointments.map((item) => (
            <div
              key={item._id}
              className="flex justify-evenly p-2 border border-zinc-700 rounded-md "
            >
              <p>{item.docData.name}</p>
              <p>{item.userData.name}</p>
              <p>
                {item.slotDate} at {item.slotTime}
              </p>
              <p>{item.amount}</p>
              <p>{item.cancelled ? "cancelled" : "pending"}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllAppointment;
