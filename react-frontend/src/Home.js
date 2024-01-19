import { useAuth } from "./context/AuthProvider";
import axios from "axios";
import React from 'react';
import { backendPath } from "./App";
export const Home = () => {
  const { value } = useAuth();
  const [username, setUserName] = React.useState("");
  const [password, setPassWord] = React.useState("");
  const handleClick = () => value.onLogin({username, password});
  const getUsers = async () => {
    axios.get(backendPath + "/users")
    .then((response) => {
        window.alert(JSON.stringify(response.data));
    })
  };

  return (
    <>
        <h2>Home (Public)</h2>
        <label>
            Username: <input name="Username" onChange={(e) => setUserName(e.target.value)}/>
        </label>
        <label>
            Password: <input name="Password" onChange={(e) => setPassWord(e.target.value)}/>
        </label>
        <button type="button" onClick={handleClick}>
            Sign In
        </button>
        <button type="button" onClick={getUsers}>
            See All Users
        </button>
    </>
  );
  };