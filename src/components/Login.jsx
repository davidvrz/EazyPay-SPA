import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/components/Auth.css';
import { api } from '../services/api'; // Servicio API
import { useTranslation } from 'react-i18next';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {t} = useTranslation();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
            await api.get(`/user/${username}`);
            navigate('/home'); 
        } catch (err) {
            setError(t('invalid-authentication'));
        }
    };

    return (
        <div className="register-section">
            <div className="register-form-container">
                <div className="form-icon">
                    <img src="/images/isotype.png" alt="icon" />
                </div>
                <form onSubmit={handleLogin} className="register-form">
                    <div className="form-group">
                        <label htmlFor="username">{t('form-username')}</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        {error && !username && <span className="error-message">{t('error-login-username')}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">{t('form-password')}</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {error && !password && <span className="error-message">{t('error-login-password')}</span>}
                    </div>
                    {error && <p className="error-text">{error}</p>}
                    <button type="submit">{t('login-button')}</button>
                </form>
                <div className="alternative-action">
                    <p>
                        {t('msg-for-register')} {' '}
                        <button onClick={() => navigate('/register')}>{t('register-button')}</button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
