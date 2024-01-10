import React from "react";
import axios from "axios";
import { backendPath } from "./App";

export const Regestration = () => {
    const [username, setUserName] = React.useState("");
    const [password, setPassWord] = React.useState("");
    const [valpass, setValPass] = React.useState("");

    const handleClick = async () => {
        axios.post(backendPath + "/account/register", {
            userid: username,
            password: password,
            valpass: valpass
        })
        .then((response) => {
            if (response.data === "pass") {
                window.alert("Successfully created new user!");
            } else {
                window.alert("Invalid password or user-password combination already exists");
            }
        });
    };

    return (
        <>
            <h2>Regestration (Public)</h2>
            <label>
                Username: <input name="Username" onChange={(e) => setUserName(e.target.value)}/>
            </label>
            <label>
                Password: <input name="Password" onChange={(e) => setPassWord(e.target.value)}/>
            </label>
            <label>
                Validate Password: <input name="Validate Password" onChange={(e) => setValPass(e.target.value)}/>
            </label>
            <button type="button" onClick={handleClick}>
                Create New User
            </button>
        </>
    );
}