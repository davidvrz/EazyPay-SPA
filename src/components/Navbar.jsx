import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../styles/components/Navbar.css'

const Navbar = ({ changeView }) => {
    const [currentUser, setCurrentUser] = useState(localStorage.getItem("username"));
    const {t} = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const username = localStorage.getItem("username");
        setCurrentUser(username);
    }, [location]);

    const handleLogout = () => {
        localStorage.removeItem('username');
        setCurrentUser(null);
        navigate('/');
      };

    const handleNavbar = location.pathname === '/' || location.pathname === '/register';

    return (
        <nav className={"navbar ${handleNavbar ? 'hidden'}"}>
            {handleNavbar &&(
                <>
                    <img className="navbar-logo" src="/images/logo.png" alt="logo" />

                    <ul className="navbar-links">
                        <Link className='navbar-to-register' to='/register'>
                            <li><button>{t('register-button')}</button></li>
                        </Link>
                        <Link className='navbar-to-login' to='/'>
                            <li><button>{t('login-button')}</button></li>
                        </Link>
                    </ul>
                </>
            )}
            
            {!handleNavbar && currentUser && (
                <>
                    <Link className="navbar-return-home" to="/home">
                        <img className="navbar-logo" src="/images/logo.png" alt="logo" />
                    </Link>
                    
                    <ul className="navbar-links">
                        <li><button onClick={handleLogout}>{t('navbar-logout')}</button></li>
                        <li><button>{t('navbar-profile')}{currentUser}</button></li>
                    </ul>
                </>
            )}

                <div className="navbar-toggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
        </nav>

    );
};

export default Navbar;
