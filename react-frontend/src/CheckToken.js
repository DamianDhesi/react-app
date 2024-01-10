import axios from 'axios';
import React from 'react';
import { backendPath } from './App';

export const CheckToken = () => {
    const [username, setUserName] = React.useState("");
    const [password, setPassWord] = React.useState("");
    const [token, setToken] = React.useState("");

    const handleClick = async () => {
        axios.post(backendPath + "/account/login", {
            userid: username,
            password: password
        })
        .then((response) => {
            setToken(response.data);

            if (response.data === "") {
                window.alert("Invalid user/password");
            }
        });
    };

    return (
        <>
            <h2>CheckToken (Public)</h2>
            <label>
                Username: <input name="Username" onChange={(e) => setUserName(e.target.value)}/>
            </label>
            <label>
                Password: <input name="Password" onChange={(e) => setPassWord(e.target.value)}/>
            </label>
            <label>
                The user's token is {token}
            </label>
            <button type="button" onClick={handleClick}>
                Get Token
            </button>
        </>
    );
}