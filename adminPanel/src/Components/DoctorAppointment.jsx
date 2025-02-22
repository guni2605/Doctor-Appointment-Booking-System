import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AdminContext } from "../store/AdminContext";

const DoctorAppointment = () => {
  const { docId } = useParams();
  const [appointment, setAppointment] = useState([]);
  //console.log("DoctorAppointment");
  //console.log(docId);
  const { backendUrl } = useContext(AdminContext);
  const getAppointmentList = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/appointments",
        { docId }
      );
      console.log(data.appointments);
      setAppointment(data.appointments);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log("calling");
    getAppointmentList();
  }, []);
  //console.log("DoctorAppointment");
  //console.log(docId);
  return (
    <div className="w-[80vw] mx-10">
      <h1 className="font-bold text-2xl p-5">Appointments details </h1>
      {appointment && (
        <div className="flex-col w-full">
          <div className="flex justify-evenly border border-zinc-700 rounded-sm p-2 w-full">
            {/* <p>User id</p> */}
            <p className="font-semibold text-xl">UserName</p>
            <hr />
            <p className="font-semibold text-xl">UserEmail</p>
            <hr />
            <p className="font-semibold text-xl">Slot Date</p>
            <hr />
            <p className="font-semibold text-xl">Slot time</p>
            <hr />
            <p className="font-semibold text-xl">Status</p>
            <hr />
            <p className="font-semibold text-xl">Change Status</p>
          </div>
          {appointment.map((item) => (
            <div
              key={item._id}
              className="  text-black-500  py-2 w-100 rounded-3xl"
            >
              <div className="flex gap-5 justify-evenly border p-2 border-zinc-700 rounded-sm">
                {/* <p>{item.userId}</p> */}
                <p> {item.userData.name}</p>
                <p>{item.userData.email}</p>
                <p> {item.slotDate}</p>
                <p> {item.slotTime}</p>
                <p className="bg-green-200 px-2 rounded-md font-semibold">
                  {item.cancelled ? "Cancelled" : "Pending"}
                </p>
                <select name="status" id="">
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorAppointment;
