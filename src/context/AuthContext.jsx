// eslint-disable-next-line no-unused-vars
import React, { createContext, useEffect, useState, useContext } from 'react';
import { auth } from '../config/firebase-config';
import { onAuthStateChanged, signOut } from 'firebase/auth';

// Create an AuthContext
const AuthContext = createContext();

// AuthProvider: This provider will wrap the entire app
// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store the current user

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set user state based on the logged-in user
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, []);

  // Function to handle logout
  const logout = () => {
    signOut(auth).then(() => {
      console.log('User signed out');
    }).catch((error) => {
      console.error('Error logging out:', error);
    });
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};
