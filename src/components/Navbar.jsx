// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx'; // Use the custom hook to access auth state
import "./style/Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth(); // Access user and logout from context

  const handleLogout = () => {
    logout(); // Call the logout function
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src="logo-neta2.png" alt="logo" />
        </Link>
      </div>

      <div className="navbar-links">
        <Link to="/about" className="navbar-button">
          About Us
        </Link>
        <Link to="/contact" className="navbar-button">
          Contact Us
        </Link>
        <Link to="/privacy" className="navbar-button">
          Privacy Policy
        </Link>

        {user ? (
          // Show "Logout" if the user is logged in
          <button className="navbar-button" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          // Show "Login" if no user is logged in
          <Link to="/login" className="navbar-button">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
