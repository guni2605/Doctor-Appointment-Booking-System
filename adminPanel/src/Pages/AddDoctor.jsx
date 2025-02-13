import React, { useContext, useState } from "react";
import { assets } from "../assets/assets_admin/assets";
import { AdminContext } from "../store/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
const AddDoctor = () => {
  const { backendUrl, atoken } = useContext(AdminContext);
  const [img, setImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [degree, setDegree] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [address, setAddress] = useState("");
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [about, setAbout] = useState("");
  const [fees, setFees] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  console.log(speciality);
  const SubmitHandler = async (e) => {
    e.preventDefault();
    console.log(speciality);
    const formdata = new FormData();
    try {
      formdata.append("image", img);
      formdata.append("name", name);
      formdata.append("email", email);
      formdata.append("password", password);
      formdata.append("experience", experience);
      formdata.append("degree", degree);
      formdata.append("fees", Number(fees));
      formdata.append("about", about);
      formdata.append("speciality", speciality);
      formdata.append(
        "address",
        JSON.stringify({
          line1: line1,
          line2: line2,
        })
      );
      formdata.forEach((key, value) => console.log(key, value));
      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formdata,
        { headers: { atoken } }
      );
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error);
    }
    setImg(false);
    setName("");
    setEmail("");
    setPasword("");
    setExperience("");
    setDegree("");
    setFees("");
    setAbout("");
    setSpeciality("");
    setLine1("");
    setLine2("");
  };
  return (
    <form
      onSubmit={(e) => SubmitHandler(e)}
      className=" w-[80%] border-2 border-zinc-400 px-[5%] py-[2%]  rounded-md"
    >
      <div className="flex gap-4 items-center">
        <p>Upload Photo</p>
        <div>
          <img
            src={img ? URL.createObjectURL(img) : assets.upload_area}
            alt=""
            className="w-24 h-24 border-2 border-zinc-400 "
          />
          <input type="file" onChange={(e) => setImg(e.target.files[0])} />
        </div>
      </div>
      <span className="my-4 flex items-center justify-between  gap-5 ">
        <div className="flex gap-3 w-[50%]">
          <p>Name</p>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-2 border-zinc-400 px-2 py-1/2 my-1 rounded-md"
          />
        </div>
        <div>
          <p>Speciality</p>
          <select
            value={speciality}
            onChange={(e) => setSpeciality(e.target.value)}
            className="border-2 border-zinc-400 px-2 py-1/2 my-1 rounded-md"
          >
            <option value="General physician">General physician</option>
            <option value="Gynecologist">Gynecologist</option>
            <option value="Dermatologist">Dermatologist</option>
            <option value="Pediatricians">Pediatricians</option>
            <option value="Neurologist">Neurologist</option>
            <option value="Gastroenterologist">Gastroenterologist</option>
          </select>
        </div>
      </span>
      <span className="my-4 flex items-center gap-5 ">
        <div>
          <p>Email</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            className="border-2 border-zinc-400 px-2 py-1/2 my-1 rounded-md"
          />
        </div>
        <div>
          <p>Password</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPasword(e.target.value)}
            placeholder="password"
            className="border-2 border-zinc-400 px-2 py-1/2 my-1 rounded-md"
          />
        </div>
      </span>
      <span className="my-4 flex items-center gap-5 ">
        <div>
          <p>degree</p>
          <input
            type="text"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
            placeholder="degree"
            className="border-2 border-zinc-400 px-2 py-1/2 my-1 rounded-md"
          />
        </div>
        <div>
          <p>Experience</p>
          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="border-2 border-zinc-400 px-2 py-1/2 my-1 rounded-md"
          >
            <option value="1 year">1 year</option>
            <option value="2 year">2 year</option>
            <option value="3 year">3 year</option>
            <option value="4 year">4 year</option>
          </select>
        </div>
      </span>
      <span>
        <div className="mt-4">
          <p>Locality Address</p>
          <input
            type="text"
            value={line1}
            onChange={(e) => setLine1(e.target.value)}
            placeholder="Address 1"
            className="border-2 border-zinc-400 px-2 py-1/2 my-1 rounded-md"
          />
          <br />
          <input
            type="text"
            value={line2}
            onChange={(e) => setLine2(e.target.value)}
            placeholder="Address 2"
            className="border-2 border-zinc-400 px-2 py-1/2 my-1 rounded-md"
          />
        </div>
        <div className="">
          <p>Fees</p>
          <input
            value={fees}
            onChange={(e) => setFees(e.target.value)}
            type="text"
            className="border-2 border-zinc-400 px-2 py-1/2 my-1 rounded-md"
          />
        </div>
      </span>
      <div>
        <p>About</p>
        <textarea
          rows="5"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          className="w-[60%] border-2 border-zinc-400 px-2 py-1/2 my-1 rounded-md"
        ></textarea>
      </div>
      <button
        type="submit"
        className="text-white text-xl px-4 py-2 m-2 rounded-3xl bg-red-400 "
      >
        Add doctor{" "}
      </button>
    </form>
  );
};

export default AddDoctor;
