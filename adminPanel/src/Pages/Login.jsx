import React, { useContext, useState } from "react";
import { AdminContext } from "../store/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../store/DoctorContext";
const Login = () => {
  const navigate = useNavigate();
  const { atoken, setaToken, backendUrl } = useContext(AdminContext);
  const { dtoken, setdToken } = useContext(DoctorContext);
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmitHandler = async (event) => {
    console.log("form submitted");
    event.preventDefault();

    try {
      if (state == "Admin") {
        const { data } = await axios.post(backendUrl + "/api/admin/login", {
          email,
          password,
        });
        console.log({ email, password });
        if (data.success) {
          localStorage.setItem("atoken", data.token);
          setaToken(data.token);
          toast.success("Login successfully ");
          navigate("/");
        } else {
          console.log(data);
          toast.error(data.message);
        }
      } else {
        // doctor is using admin
        const { data } = await axios.post(backendUrl + "/api/doctor/login", {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("dtoken", data.token);

          setdToken(data.token);
          //console.log(data);
          localStorage.setItem("doctorId", data.id);
          console.log(localStorage.getItem("doctorId"));
          // setaToken("");
          // localStorage.removeItem("atoken")
          toast.success("Login successfully ");
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      onSubmit={(e) => onSubmitHandler(e)}
      className="min-h-[80vh] flex items-center justify-center "
    >
      <div className=" flex-col items-center  gap-5 px-[4%]  py-[2%] shadow-lg shadow-zinc-700 rounded-md ">
        <p className="text-xl font-bold text-red-400 mb-4">{state} Login</p>
        <div>
          <p>Email</p>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-[90%] my-1 h-[50%] border-2 rounded-md border-zinc-300"
          />
        </div>
        <div>
          <p>Password</p>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-[90%] my-1 h-[50%] border-2 rounded-md border-zinc-300"
          />
        </div>

        <button
          className="bg-red-400 px-4 py-2 text-md text-white m-3 mx-auto rounded-md w-[100%] cursor-pointer"
          type="submit"
        >
          Login
        </button>
        <p>
          {state == "Admin" ? "Doctor Login ?" : "Admin Login ?"}
          <span
            className="underline p-2 "
            onClick={() => setState(state == "Admin" ? "Doctor" : "Admin")}
          >
            Login here
          </span>
        </p>
      </div>
    </form>
  );
};

export default Login;
