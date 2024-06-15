import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './register.css';

export default function Register({ setUser }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/register', { username, email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Registration failed');
    }
  };

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleRegister}>
        <label htmlFor="username">Username</label>
        <input value={username} className="registerInput" type="text" placeholder="Enter your username..." onChange={(e) => setUsername(e.target.value)} />
        <label htmlFor="email">Email</label>
        <input value={email} className="registerInput" type="email" placeholder="Enter your email..." onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input value={password} className="registerInput" type="password" placeholder="Enter your password..." onChange={(e) => setPassword(e.target.value)} />
        <button className="registerButton" type="submit">Register</button>
      </form>
      <button className="registerLoginButton">
        <Link className="link" to="/login">Login</Link>
      </button>
    </div>
  );
}
