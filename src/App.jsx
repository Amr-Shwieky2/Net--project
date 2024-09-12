// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import MainPage from './components/MainPage';
import ClassDetailPage from './components/ClassDetailPage';
import LoginRegister from './components/LoginRegister';
import StudentRegisterPage from './components/StudentRegisterPage';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginRegister />} />
          <Route path="/group/:id" element={<ClassDetailPage />} />
          <Route path="/group/:id/register" element={<StudentRegisterPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
