import React, { useState } from 'react';
import '../styles/components/Navbar.css'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Navbar = ({ changeView }) => {
    const currentUser = localStorage.getItem("username");
    const {t} = useTranslation();

    const handleLogout = () => {
        localStorage.removeItem('username');
        window.location.href = '/';  // Redirect to login (or reload the page)
      };

    return (
        <nav className="navbar">
            {currentUser && (
                <Link className="navbar-return-home" to="/home">
                    <img className="navbar-logo" src="/images/logo.png" alt="logo" />
                </Link>
            )}

                <ul className="navbar-links">
                    <li><button onClick={handleLogout}>{t('navbar-logout')}</button></li>
                    <li><button>{t('navbar-profile')}{currentUser}</button></li>
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
