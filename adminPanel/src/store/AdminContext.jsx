import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
export const AdminContext = createContext({});
const AdminContextProvider = (props) => {
  const [atoken, setaToken] = useState(
    localStorage.getItem("atoken") ? localStorage.getItem("atoken") : ""
  );
  const changeAvailibility = async (docId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/change-availability",
        { docId },
        { headers: { atoken } }
      );
      if (data.success) {
        toast.success(data.message);
        getDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const [doctorList, setdoctorList] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const getDoctors = async () => {
    const { data } = await axios.post(
      backendUrl + "/api/admin/all-doctors",
      {},
      { headers: { atoken } }
    );

    if (data.success) {
      setdoctorList(data.doctors);
      console.log(data.doctors);
    } else {
      toast.error(data.message);
    }
  };
  return (
    <AdminContext.Provider
      value={{
        atoken,
        setaToken,
        backendUrl,
        getDoctors,
        doctorList,
        changeAvailibility,
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};
export { AdminContextProvider };
