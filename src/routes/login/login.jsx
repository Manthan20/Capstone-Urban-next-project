import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './login.scss';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:4000/api/login', { email, password });
      const userData = response.data; // Ensure this has the role
      login(userData); // Login the user

      // Redirect based on user role
      if (userData.role === 'admin') {
        navigate('/admin'); // Redirect to admin dashboard
      } else {
        navigate('/'); // Redirect to the homepage or user dashboard
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      alert('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="form-heading" style={{ textAlign: 'center' }}>Welcome Back!</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="login-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="login-input"
        />
        <p className="form-text">
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
        <button type="submit" disabled={loading} className="login-button">
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </>
  );
};

export default Login;
