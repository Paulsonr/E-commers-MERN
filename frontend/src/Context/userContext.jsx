import { createContext, useState, useEffect } from "react";
import axios from "axios";
const env_var = process.env.REACT_APP_ENV_VAR;
const auth_module = process.env.REACT_APP_AUTH_ROUTE;
const authModuleURL = `${env_var}${auth_module}`;

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (!user) {
      axios.get(`${authModuleURL}/profile`).then(({ data }) => {
        setUser(data);
      });
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
