import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pages/login/login.css'
import axios from 'axios';

export default function Logout({ setUser }) {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogout = async (event) => {
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    try {
      await axios.post('http://localhost:5000/auth/verify-password', { username: user.username, password });
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setUser(null);
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert('Incorrect password. Please try again.');
    }
  };

  return (
    <div className="logout">
      <span className="logoutTitle">Confirm Logout</span>
      <form className="logoutForm" onSubmit={handleLogout}>
        <label htmlFor="password">Password</label>
        <input value={password} className="logoutInput" type="password" placeholder="Enter your password..." onChange={(e) => setPassword(e.target.value)} />
        <button className="logoutButton" type="submit">Logout</button>
      </form>
    </div>
  );
}
