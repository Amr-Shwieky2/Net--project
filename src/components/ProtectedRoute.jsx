// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Assuming you have this context for authentication

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth(); // Get the user from context

  return user ? children : <Navigate to="/login" />; // If user exists, show children; otherwise, redirect to login
};

export default ProtectedRoute;
