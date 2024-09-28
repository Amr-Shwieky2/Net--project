// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import './style/auth.css';
import { auth } from "../config/firebase-config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '', // Used for registration
    secretCode: '', // New field for the secret code
  });
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      secretCode: '', // Reset secret code
    });
    setError(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validate secret code only during registration
    if (!isLogin && formData.secretCode !== 'neta@-project') {
      setError('Invalid secret code');
      return;
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        alert('Login Successful');
      } else {
        await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        alert('Registration Successful');
      }

      // After login/registration, navigate to the main page
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2 className="auth-form-heading">{isLogin ? 'Login' : 'Register'}</h2>
        {error && <p className="error-text">{error}</p>} {/* Display error messages */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-input"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {!isLogin && (
            <>
              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-input"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* Secret Code Input Field */}
              <div className="form-group">
                <label className="form-label">Secret Code</label>
                <input
                  type="text"
                  name="secretCode"
                  className="form-input"
                  value={formData.secretCode}
                  onChange={handleChange}
                  placeholder="Enter the secret code"
                  required
                />
              </div>
            </>
          )}
          <button type="submit" className="auth-button">
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <p className="toggle-text">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <span className="toggle-link" onClick={handleToggle}>
            {isLogin ? ' Register' : ' Login'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginRegister;
