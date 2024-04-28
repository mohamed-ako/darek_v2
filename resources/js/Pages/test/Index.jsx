import React from "react";
import {
    NavLink,
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Home from "./Home"; // Import your other page components here
import About from "./About";
// import SignUp from "./SignUp";
import Contact from "./Contact"; // Example page component
import "./style.css";

const Navbar = () => {
    return (
        <nav>
            <NavLink index to="/">
                Home
            </NavLink>
            <NavLink to="/About">About</NavLink>
            <NavLink to="/Contact">Contact</NavLink>
            {/* <NavLink to="/SignUp">Sign Up</NavLink> */}
        </nav>
    );
};

export default function Index(Property) {
    return (
        <Router>
            <div>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home Property={Property} />} />
                    <Route path="/About" element={<About />} />
                    <Route path="/Contact" element={<Contact />} />
                    {/* <Route path="/SignUp" element={<SignUp />} />{" "} */}
                </Routes>
            </div>
        </Router>
    );
}
