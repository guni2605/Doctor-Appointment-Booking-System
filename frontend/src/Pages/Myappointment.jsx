import React, { useContext, useEffect, useState } from "react";
import { contextStore } from "../store/ContextStore";
import axios from "axios";
import { toast } from "react-toastify";
const Myappointment = () => {
  const { backendurl, token } = useContext(contextStore);
  const [appointments, setAppointments] = useState([]);
  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendurl + "/api/user/list-appointment",
        { headers: { token } }
      );
      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log(appointments);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  //-----------------------------------------------------------------------
  const cancelAppointment = async (appointmentId) => {
    try {
      //  console.log(appointmentId);
      const { data } = await axios.post(
        backendurl + "/api/user/cancel-appointment",
        { appointmentId },
        {
          headers: { token },
        }
      );
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);
  return (
    <div>
      <p>Myappointment</p>
      <div className="flex-col m-[2%]">
        {appointments.slice(0, 2).map((item, index) => (
          <div key={index} className="flex gap-2 items-center">
            <div className="h-[20%] w-[20%]">
              <img src={item.docData.image} alt="" />
            </div>
            <div>
              <p>{item.docData.name}</p>
              <p>{item.docData.speciality}</p>
              <p>{item.docData.address.line1}</p>
              <p>{item.docData.address.line2}</p>
              <p>
                <span>Date & Time:</span>
                {item.slotDate} | {item.slotTime}
              </p>
            </div>
            <div>
              {item.cancelled ? (
                <button className="border-2 border-zinc-600 rounded-3xl p-2 bg-red-400">
                  Cancelled
                </button>
              ) : (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="border-2 border-zinc-600 rounded-3xl p-2 bg-slate-400"
                >
                  Cancel Appointment
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Myappointment;
