// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import useBirthdayNotifications from '../hooks/useBirthdayNotifications'; // Updated hook with upcoming birthdays
import "./style/Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { birthdayNotifications, upcomingBirthdays } = useBirthdayNotifications();
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    logout();
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

        {/* Notification Section */}
        {user && (birthdayNotifications.length > 0 || upcomingBirthdays.length > 0) && (
          <div className="notification-icon" onClick={() => setShowNotifications(!showNotifications)}>
            <span className="bell-icon">🔔</span>
            <span className="notification-count">
              {birthdayNotifications.length + upcomingBirthdays.length}
            </span>
            {showNotifications && (
              <div className="notification-dropdown">
                <h4>Birthdays Today</h4>
                <ul>
                  {birthdayNotifications.length > 0 ? (
                    birthdayNotifications.map((notification, index) => (
                      <li key={index}>
                        {notification.name} in{' '}
                        <Link to={`/group/${notification.groupId}`}>{notification.groupName}</Link>
                      </li>
                    ))
                  ) : (
                    <li>No birthdays today</li>
                  )}
                </ul>

                <h4>Upcoming Birthdays</h4>
                <ul>
                  {upcomingBirthdays.length > 0 ? (
                    upcomingBirthdays.map((notification, index) => (
                      <li key={index}>
                        {notification.name} in{' '}
                        <Link to={`/group/${notification.groupId}`}>{notification.groupName}</Link>
                        {' - '}Birthday in {new Date(notification.birthday).toLocaleDateString()}
                      </li>
                    ))
                  ) : (
                    <li>No upcoming birthdays</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        )}

        {user ? (
          <button className="navbar-button" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to="/login" className="navbar-button">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
