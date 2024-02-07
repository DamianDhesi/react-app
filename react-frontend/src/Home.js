import { useAuth } from "./context/AuthProvider";
import React from 'react';
import { backendPath } from "./App";

export const Home = () => {
  const { value } = useAuth();
  const [username, setUserName] = React.useState("");
  const [password, setPassWord] = React.useState("");
  const handleClick = () => value.onLogin({username, password});
  const useOAuth = async () => {
    const response = await fetch(backendPath + "/request", {method: "post"});
    const data = await response.json()
    window.location.assign(data.url);
  };
  
  window.onload = () => {
    const queryParameters = new URLSearchParams(window.location.search);
    const google_token = queryParameters.get("token");
    if (google_token) {
        //set cookie
        const exper = new Date();
        exper.setTime(exper.getTime() + (2 * 60 * 1000)); //2 minute expiration
        document.cookie = `token=${google_token}; expires=${exper.toUTCString()}; secure; path=/`;
        value.onLogin({username: null, password: null});
    }
  }

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
        <button type="button" onClick={useOAuth}>
            Use OAuth
        </button>
    </>
  );
  };