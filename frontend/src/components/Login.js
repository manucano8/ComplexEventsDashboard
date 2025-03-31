import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/login`, { username, password });
      setToken(response.data.token);
      navigate('/events');
    } catch (error) {
      console.error('Login failed', error);
      setError('Invalid username or password'); 
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Welcome to the Complex Events Dashboard</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <button type="submit" className="login-button">
          Login
        </button>
        {error && <p className="login-error">{error}</p>}
      </form>
    </div>
  );
}

export default Login;