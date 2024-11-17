import { createContext, useState, useEffect } from "react";
import { getTokenData } from "../services/getTokenData";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
      const userData = getTokenData(tokenFromStorage);
      setUserId(userData?.id);
    }
  }, []);

  return (
    <UserContext.Provider value={{ userId, token }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
