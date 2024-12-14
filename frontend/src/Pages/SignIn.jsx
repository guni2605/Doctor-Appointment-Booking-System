import React, { useState } from "react";
import { contextStore } from "../store/ContextStore";
import { useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const SignIn = () => {
  const navigate = useNavigate();
  const { backendurl, token, setToken } = useContext(contextStore);
  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state == "Sign Up") {
        console.log(email, password, name);
        const { data } = await axios.post(backendurl + "/api/user/register", {
          name,
          email,
          password,
        });
        if (data.success) {
          console.log(token);
          toast.success("Sign up Successfully");
          localStorage.setItem("token", data.token);
          setToken(data.token);
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } else {
        console.log(email, password, name);
        const { data } = await axios.post(backendurl + "/api/user/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success("login successfully");
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <form
      onSubmit={(e) => onSubmitHandler(e)}
      className="min-h-[80vh] flex items-center justify-center "
    >
      <div className=" flex-col items-center  gap-5 px-[4%]  py-[4%] shadow-lg shadow-zinc-700 rounded-md ">
        <p className="text-xl font-bold ">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p className="  text-md mb-2">
          Please {state === "Sign Up" ? "Sign up" : "Login"} to book appointment
        </p>
        {state === "Sign Up" ? (
          <div className=" ">
            <p>Full Name</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-[90%] my-1 h-[50%] border-2 rounded-md border-zinc-300"
            />
          </div>
        ) : (
          <></>
        )}
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
          type="submit"
          className="bg-primary px-4 py-2 text-md text-white m-3 mx-auto rounded-md w-[100%]"
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>
        {state === "Sign Up" ? (
          <p>
            Already have an account ?
            <span
              className="underline cursor-pointer text-primary"
              onClick={() => setState("Login")}
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Don't have an account ?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="underline text-primary"
            >
              Please Signup here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default SignIn;
