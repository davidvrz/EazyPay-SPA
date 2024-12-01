import React from 'react';

const Dashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem('username');  // Limpiar el nombre de usuario
    window.location.href = '/';  // Redirigir al login (o recargar la página)
  };

  return (
    <div>
      <h1>Welcome to your Dashboard!</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
