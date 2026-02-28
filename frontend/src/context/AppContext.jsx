import { createContext } from "react";
import api from "../utils/axios";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();

  return (
    <AppContext.Provider value={{ api, navigate }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
