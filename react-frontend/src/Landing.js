import { useEffect, useState } from "react";
import { useAuth } from "./context/AuthProvider";
import axios from "axios";
import { backendPath } from "./App";

export const Landing = () => {
    const { value } = useAuth();
    const [users, setUsers] = useState([]);
    const getUsers = async () => {
        axios.get(backendPath + "/users")
        .then((response) => {
            setUsers(response.data.users_list);
        })
    };
    const userList = users.map(user => 
        <li key={user._id}>{user.name}</li>
    );

    useEffect(() => {
        let ignore = false;

        if (!ignore) {
            getUsers();
        }

        return () => {
            ignore = true;
        };
    }, []);

    return (
        <>
        
        <h2>Landing (Protected)</h2>
        <label>User List:</label>
        <ul>{userList}</ul>
        <div> Authenticated as {value.token}</div>
        </>
    );
};