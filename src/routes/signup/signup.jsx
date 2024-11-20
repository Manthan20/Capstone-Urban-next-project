import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './signup.scss';

function Signup() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user', // Default role for new users
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const response = await axios.post('http://localhost:4000/api/signup', form);
      const { token, user } = response.data;
  
      localStorage.setItem("token", token); // Store token
      navigate("/login"); // Redirect to homepage or login
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      alert("Signup failed. Please try again.");
    }
  };
  

  return (
    <>
      <h2 className="form-heading" style={{ textAlign: 'center' }}>Create Your Account</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />
        <p className="form-text">
          Already have an account? <a href="/login">Login</a>
        </p>
        <button type="submit">Signup</button>
      </form>
    </>
  );
}

export default Signup;
