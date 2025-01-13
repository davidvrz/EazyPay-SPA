import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../../styles/components/Navbar.css';

const Navbar = ({ changeView }) => {
    const [currentUser, setCurrentUser] = useState(localStorage.getItem("username"));
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);

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

    // Función para alternar la visibilidad del menú
    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    // Función para cerrar el menú cuando se hace clic fuera
    const handleClickOutside = (event) => {
        // Verifica si el clic fue fuera del menú
        if (!event.target.closest('.navbar-links') && !event.target.closest('.navbar-toggle')) {
            setShowMenu(false);
        }
    };

    useEffect(() => {
        // Se añade el event listener para el clic en el documento
        window.addEventListener('click', handleClickOutside);

        // Limpiar el event listener cuando el componente se desmonte
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <nav className={`navbar ${handleNavbar ? 'hidden' : ''}`}>
            {handleNavbar && (
                <>
                    <img className="navbar-logo" src="/images/logo.png" alt="logo" />

                    <div className="navbar-toggle" onClick={toggleMenu}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>

                    <ul className={`navbar-links ${showMenu ? 'active' : ''}`}>
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

                    <div className="navbar-toggle" onClick={toggleMenu}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>

                    <ul className={`navbar-links ${showMenu ? 'active' : ''}`}>
                        <li><button onClick={handleLogout}>{t('navbar-logout')}</button></li>
                        <li><button>{t('navbar-profile')}{currentUser}</button></li>
                    </ul>
                </>
            )}
        </nav>
    );
};

export default Navbar;
