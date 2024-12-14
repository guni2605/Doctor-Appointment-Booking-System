import { createContext, useContext, useState } from "react";

export const DoctorContext = createContext({});
const DoctorContextProvider = (props) => {
  const [dtoken, setdToken] = useState("");
  return (
    <DoctorContext.Provider value={{ dtoken, setdToken }}>
      {props.children}
    </DoctorContext.Provider>
  );
};
export { DoctorContextProvider };
