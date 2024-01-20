import React from "react";
import axios from "axios";
import { backendPath } from "./App";
import bcrypt from "bcryptjs-react";

export const Regestration = () => {
    const [username, setUserName] = React.useState("");
    const [password, setPassWord] = React.useState("");
    const [valpass, setValPass] = React.useState("");

    const handleClick = async () => {
        //check if password is valid
        const specialChars = /[ `!@#$%^&*()_+\-=[]{};':"\\|,.<>\/?~]/;
        if (valpass.trim() !== password.trim() || password === password.toLowerCase() || !/\d/.test(password) 
            || !specialChars.test(password)) {
                window.alert("Invalid password. Needs atleast 1 uppercase, 1 number, and 1 special char");
                return; //fix, currently rejecting valid passwords!!!
        }

        //generate salt and hash password
        const rounds = 12;
        const hash = await bcrypt.hash(password.trim(), rounds);

        axios.post(backendPath + "/account/register", {
            userid: username,
            password: hash
        })
        .then((response) => {
            if (response.data !== "") {
                window.alert("Successfully created new user!");
            } else {
                window.alert("User-password combination already exists");
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