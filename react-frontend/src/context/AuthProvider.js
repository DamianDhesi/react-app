import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { backendPath } from "../App";

const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
  
    const [token, setToken] = useState(null);
  
    const handleLogin = async ({username, password}) => {
        axios.post(backendPath + "/account/login", {
            userid: username,
            password: password
        })
        .then((response) => {
            var token = response.data;

            if (token !== "") {
                setToken(token);
                navigate("/landing");
            } else {
                window.alert("Invalid user/password");
            }
        });
    };

  const handleLogout = () => {
    setToken(null);
  };

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return (
    <AuthContext.Provider value={{ value }}>
      {children}
    </AuthContext.Provider>
  );
};

// give callers access to the context
export const useAuth = () => useContext(AuthContext);