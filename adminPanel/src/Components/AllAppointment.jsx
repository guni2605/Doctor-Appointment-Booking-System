import React, { useContext, useEffect } from "react";
import { AdminContext } from "../store/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";
const AllAppointment = () => {
  const { backendUrl, atoken } = useContext(AdminContext);
  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const api = backendUrl + "/api/admin/all/appointments";
        console.log(api);
        const response = await axios.get(api, { headers: { atoken } });
        console.log(response.data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchAppointment();
  }, []);
  return (
    <div>
      <h1>All appointment</h1>
    </div>
  );
};

export default AllAppointment;
