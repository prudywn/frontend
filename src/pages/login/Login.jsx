import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './login.css';

export default function Login({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/login', { username, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Invalid username or password');
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleLogin}>
        <label htmlFor="username">Username</label>
        <input value={username} className="loginInput" type="text" placeholder="Enter your username..." onChange={(e) => setUsername(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input value={password} className="loginInput" type="password" placeholder="Enter your password..." onChange={(e) => setPassword(e.target.value)} />
        <button className="loginButton" type="submit">Login</button>
      </form>
      <button className="loginRegisterButton">
        <Link className="link" to="/register">Register</Link>
      </button>
    </div>
  );
}
