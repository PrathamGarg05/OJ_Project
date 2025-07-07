import { createContext, useState } from "react";

export const SubmitContext = createContext();

export const SubmitProvider = ({ children }) => {
  const [mode, setMode] = useState("run");


  return (
    <SubmitContext.Provider value={{ mode, setMode }}>
      {children}
    </SubmitContext.Provider>
  );
};

