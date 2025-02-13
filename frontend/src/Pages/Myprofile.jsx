import React, { useContext, useEffect, useState } from "react";
import { contextStore } from "../store/ContextStore";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
const Myprofile = () => {
  const navigate = useNavigate();
  const { token, backendurl } = useContext(contextStore);
  const [user, setUser] = useState({
    name: "",
    address: {
      line1: "",
      line2: "",
    },
    email: "",
    gender: "",
    dob: "",
    phone: "",
  });
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(backendurl + "/api/user/profile", {
          headers: { token },
        });
        //console.log(response.data);
        if (response.data.success) {
          setUser(response.data.user);
        } //else {
        //   //toast.error(response.data.message);
        //   navigate("/signin");
        // }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    };
    fetchUser();
  }, []);
  const handleProfile = async (e) => {
    e.preventDefault();
    const api = backendurl + "/api/user/edit/profile";
    const response = await axios.post(api, { user }, { headers: { token } });
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
    navigate("/");
  };
  return (
    <div className="bg-rose-50 p-4">
      <p className="text-2xl items-center m-5">MY PROFILE ----</p>
      <div className="flex gap-5 items-center text-xl my-3 ">
        <label htmlFor="name">User Name :</label>
        <input
          type="text"
          id="name"
          value={user.name}
          className="border border-zinc-700 px-2 "
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
      </div>
      <div className="flex gap-5 items-center text-xl my-3">
        <label htmlFor="email">Email :</label>
        <input
          type="text"
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className="border border-zinc-700 px-2 "
        />
      </div>
      <div className="flex gap-5 items-center text-xl my-3">
        <label htmlFor="address1">Address 1 :</label>
        <input
          type="text"
          id="address1"
          value={user.address.line1}
          onChange={(e) =>
            setUser({
              ...user,
              address: { ...user.address, line1: e.target.value },
            })
          }
          className="border border-zinc-700 px-2 "
        />
      </div>
      <div className="flex gap-5 items-center text-xl my-3">
        <label htmlFor="address2">Address 2 :</label>
        <input
          type="text"
          id="address2"
          value={user.address.line2}
          onChange={(e) =>
            setUser({
              ...user,
              address: { ...user.address, line2: e.target.value },
            })
          }
          className="border border-zinc-700 px-2 "
        />
      </div>
      <div className="flex gap-5 items-center text-xl my-3">
        <label htmlFor="gender">Gender :</label>
        <select
          id="gender"
          className="border border-zinc-800 px-2 "
          value={user.gender}
          onChange={(e) => setUser({ ...user, gender: e.target.value })}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div className="flex gap-5 items-center text-xl my-3">
        <label htmlFor="dob">Dob</label>
        <input
          type="date"
          id="dob"
          value={user.dob}
          onChange={(e) => setUser({ ...user, dob: e.target.value })}
          className="border border-zinc-700 px-2 "
        />
      </div>
      <div className="flex gap-5 items-center text-xl my-3">
        <label htmlFor="phone">Phone</label>
        <input
          type="tel"
          id="phone"
          value={user.phone}
          onChange={(e) => setUser({ ...user, phone: e.target.value })}
          className="border border-zinc-700 px-2 "
        />
      </div>
      <button
        className="border border-zinc-700 py-1 px-2 rounded-md shadow-sm"
        onClick={(e) => {
          handleProfile(e);
        }}
      >
        Edit Profile
      </button>
    </div>
  );
};

export default Myprofile;
