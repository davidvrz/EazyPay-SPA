import React, { useState } from 'react';
import '../styles/components/Navbar.css'

const Navbar = ({ changeView }) => {
    return (
        <nav className="navbar">
            <img className="navbar-logo" src="images/logo.png" alt="logo" />
                <ul className="navbar-links">
                    <li>prueba</li>
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
