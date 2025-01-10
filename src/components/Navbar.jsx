import React, { useState } from 'react';
import '../styles/components/Navbar.css'
import { Link } from 'react-router-dom';

const Navbar = ({ changeView }) => {
    const currentUser = localStorage.getItem("username");

    const handleLogout = () => {
        localStorage.removeItem('username');
        window.location.href = '/';  // Redirect to login (or reload the page)
      };

    return (
        <nav className="navbar">
            {currentUser && (
                <Link className="return-home" to="/home">
                    <img className="navbar-logo" src="/images/logo.png" alt="logo" />
                </Link>
            )}

                <ul className="navbar-links">
                    <li><button onClick={handleLogout}>Logout</button></li>
                    <li>prueba</li>
                    <li>prueba</li>
                </ul>
                <div className="navbar-toggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
        </nav>

    );
};

export default Navbar;
