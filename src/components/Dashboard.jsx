import React from 'react';

const Dashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem('username');
    window.location.href = '/';  // Redirect to login (or reload the page)
  };

  return (
    <div>
      <h1>Welcome to your Dashboard!</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
