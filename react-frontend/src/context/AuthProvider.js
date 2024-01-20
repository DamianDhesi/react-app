import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { backendPath } from "../App";

const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    
    const [token, setToken] = useState(null);

    var cookie = `${document.cookie}`;
    cookie = cookie.substring(cookie.indexOf("=") + 1);
    if (token !== cookie && cookie !== "") {
        setToken(cookie);
    }
  
    const handleLogin = async ({username, password}) => {
        axios.post(backendPath + "/account/login", {
            userid: username,
            password: password
        })
        .then((response) => {
            var token = response.data;

            if (token !== "") {
                setToken(token);

                //set cookie
                const exper = new Date();
                exper.setTime(exper.getTime() + (2 * 60 * 1000)); //5 minute expiration
                document.cookie = `token=${token}; expires=${exper.toUTCString()}; secure; path=/`;

                navigate("/landing");
            } else {
                window.alert("Invalid user/password");
            }
        });
    };

  const handleLogout = () => {

    document.cookie = `token=; path=/`;
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