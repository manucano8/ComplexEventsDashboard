import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Logout from './components/Logout';
import EventList from './pages/EventList';
import { jwtDecode } from 'jwt-decode';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleSetToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const isAuth = () => {
    if (!token) return false;
    try {
      jwtDecode(token);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setToken={handleSetToken} />} />
        <Route path="/logout" element={isAuth() ? <Logout /> : <Navigate to="/login" />} /> 
        <Route path="/events" element={isAuth() ? <EventList token={token} /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to={isAuth() ? '/events' : '/login'} />} />
      </Routes>
    </Router>
  );
}

export default App;