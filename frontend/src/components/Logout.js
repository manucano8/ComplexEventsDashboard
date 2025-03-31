import React from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove JWT token from local storage
    localStorage.removeItem('token');

    // Redirects user to login page
    navigate('/login');
  };

  return (
    <button onClick={handleLogout}>Log out</button>
  );
}

export default Logout;