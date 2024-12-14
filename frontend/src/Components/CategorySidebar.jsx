import React, { useContext } from "react";
import { specialityData } from "../assets/assets_frontend/assets";
import { Link } from "react-router-dom";
import { contextStore } from "../store/ContextStore.jsx";
const CategorySidebar = () => {
  const { category, setCategory } = useContext(contextStore);
  return (
    <div className="w-[20%] ">
      <ul className=" flex-col gap-4 ">
        {specialityData.map((item) => (
          <li
            key={item.speciality}
            onClick={() => setCategory(item.speciality)}
            className="w-full border-2 m-2 p-1 pl-2 text-md text-mono  border-zinc-200 rounded-md cursor-pointer"
          >
            {item.speciality}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySidebar;
