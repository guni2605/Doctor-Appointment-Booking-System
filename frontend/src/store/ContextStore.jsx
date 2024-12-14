import { createContext, useState } from "react";
import axios from "axios";
import { useEffect } from "react";
export const contextStore = createContext({});
import { toast } from "react-toastify";
const ContextStoreProvider = (props) => {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false
  );
  const [doctors, setDoctors] = useState([]);
  const backendurl = import.meta.env.VITE_BACKEND_URL;
  const getDoctors = async () => {
    try {
      const { data } = await axios.get(backendurl + "/api/doctor/list");
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getDoctors();
  }, []);
  const [category, setCategory] = useState("All");
  return (
    <contextStore.Provider
      value={{
        category,
        setCategory,
        getDoctors,
        doctors,
        backendurl,
        token,
        setToken,
      }}
    >
      {props.children}
    </contextStore.Provider>
  );
};
export { ContextStoreProvider };
