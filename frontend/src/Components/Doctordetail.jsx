import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets_frontend/assets";
import { useContext } from "react";
import { contextStore } from "../store/ContextStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
const Doctordetail = () => {
  const navigate = useNavigate();
  const { doctors, token, backendurl, getDoctors } = useContext(contextStore);
  const { doctorId } = useParams();
  const [filterlist, setFilterlist] = useState([]);
  const dayOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  // for time scheduled
  const [docSlot, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const filterDoc = () => {
    setFilterlist(doctors.filter((doc) => doc._id == doctorId));

    console.log(filterlist);
  };

  // available slot---------
  const getAvailableSlots = async () => {
    setDocSlots([]);
    let today = new Date();
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      // setting up the end time with index
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);
      // setting hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }
      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        // add slots to array
        timeSlots.push({
          dateTime: new Date(currentDate),
          time: formattedTime,
        });
        // increment time by 30 minute
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };
  //--------------------------------------------------------
  const BookAppointment = async () => {
    if (!token) {
      toast.error("Login to book Appointment");
      navigate("/signin");
    }
    try {
      const date = docSlot[slotIndex][0].dateTime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      const slotDate = date + "-" + month + "-" + year;
      // console.log(slotDate);
      const { data } = await axios.post(
        backendurl + "/api/user/book-appointment",
        {
          docId: doctorId,
          slotDate,
          slotTime,
        },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getDoctors();
        navigate("/my-appointment");
      } else {
        console.log(data);
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  //----------------------------------------------------------------

  useEffect(() => {
    filterDoc();
  }, []);
  useEffect(() => {
    getAvailableSlots();
  }, [filterlist]);
  useEffect(() => {
    //console.log(docSlot);
  }, [docSlot]);
  return (
    <div>
      {filterlist &&
        filterlist.map((doc) => (
          <div className="py-[3%]">
            <div className="flex justify-between items-center gap-[5%]   h-[60vh]">
              <div className="w-[85%] h-[80%] bg-primary rounded-2xl">
                <img src={doc.image} className="w-full h-full" alt="" />
              </div>
              <div className="flex-col items-center border-2 border-slate-500 rounded-2xl p-[2%] ">
                <p className="text-3xl font-bold font-mono flex gap-[2%] my-2 ">
                  {doc.name} <img src={assets.verified_icon} alt="" />
                </p>
                <p className="text-xl my-2">
                  {doc.degree} - <span>{doc.speciality}</span>
                  <span className="mx-[2%] border-2 border-slate-400 px-4  rounded-3xl text-zinc-400 ">
                    {doc.experience}
                  </span>
                </p>

                <p className="flex gap-2 my-2 text-zinc-700 font-medium">
                  About <img src={assets.info_icon} alt="" />
                </p>
                <p className="text-gray-600 py-2">{doc.about}</p>
                <p className="font-medium  ">Appointment fees :- ${doc.fees}</p>
              </div>
            </div>
          </div>
        ))}
      {/* booking slots */}
      <div className="sm:ml-72 sm:pl-4 pt-4 font-medium text-grey-700">
        <p>Booking slots</p>
        <div className="flex gap-3 items-center w-full">
          {docSlot.length &&
            docSlot.map((item, index) => (
              <div
                key={index}
                onClick={() => setSlotIndex(index)}
                className={`items-center rounded-full py-6 px-4 ${
                  slotIndex == index ? "bg-primary text-white " : ""
                }`}
              >
                <p>{item[0] && dayOfWeek[item[0].dateTime.getDay()]}</p>
                <p className="px-2">{item[0] && item[0].dateTime.getDate()}</p>
              </div>
            ))}
        </div>
        <div className="flex items-center gap-3 w-full rounded overflow-x-scroll mt-4">
          {docSlot.length &&
            docSlot[slotIndex].map((item, index) => (
              <p
                key={index}
                onClick={() => setSlotTime(item.time)}
                className={`text-sm font-light rounded-full flex-shrink-0 px-5 py-2 cursor-pointer ${
                  item.time == slotTime
                    ? "bg-primary text-white"
                    : "text-grey-400 border-2 border-grey-400"
                }`}
              >
                {item.time.toLowerCase()}
              </p>
            ))}
        </div>
      </div>
      <div>
        <button
          onClick={() => BookAppointment()}
          className="mt-[5%] rounded-3xl p-4 text-white bg-slate-500 border-2 border-zinc-600 mx-[40%]"
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default Doctordetail;
