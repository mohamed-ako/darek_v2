import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Darek/Home";
import Profile from "./Darek/Profile";
import Publisher from "./Darek/Publisher";
import Logout from "./Darek/Logout";
import Navbar from "./NavBar";
import Login from "./Darek/Login";
import Signup from "./Darek/Register";
import InfoPrperty from "./Darek/InfoPrperty";

const Index = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="Darek/Signup" element={<Signup />} />
                <Route path="Darek/Profile" element={<Profile />} />
                <Route path="Darek/Login" element={<Login />} />
                <Route path="Darek/publisher" element={<Publisher />} />
                <Route path="Darek/logout" element={<Logout />} />
                <Route path="Darek/" element={<Home />} />
                <Route path="/Darek/Profile/:userId" element={<Profile />} />
                <Route path="/InfoProperty" element={<InfoPrperty />} />
            </Routes>
        </Router>
    );
};

export default Index;
