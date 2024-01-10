import { Routes, Route, NavLink } from "react-router-dom";
import React from 'react';
import { Home } from "./Home";
import { Landing } from "./Landing";
import { useAuth } from "./context/AuthProvider";
import { AuthProvider } from "./context/AuthProvider";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import { CheckToken } from "./CheckToken";
import { Regestration } from "./Regestration";

export const backendPath = "http://localhost:8000";

const App = () => {
  
    return (
        <AuthProvider>
            <Navigation />
        
            <h1>React Router</h1>
        
            <Routes>
            <Route index element={<Home />} />
            <Route path="landing" element={<ProtectedRoute><Landing /></ProtectedRoute>} />
            <Route path="home" element={<Home />} />
            <Route path="checkToken" element={<CheckToken />} />
            <Route path="regestration" element={<Regestration />} />
            <Route path="*" element={<p>There's nothing here: 404!</p>} />
            </Routes>
        </AuthProvider>
        );
        };

const Navigation = () => {
    const { value } = useAuth();
    return (
        <nav>
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/landing">Landing</NavLink>
            {value.token && (
                <button type="button" onClick={value.onLogout}>
                    Sign Out
                </button>
            )}
            <NavLink to="/checkToken">Check Token</NavLink>
            <NavLink to="/regestration">Regestration</NavLink>
        </nav>
)};

export default App;