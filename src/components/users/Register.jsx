import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import '../../styles/components/Auth.css';
import { useTranslation } from 'react-i18next';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const {t} = useTranslation();

    const handleRegister = async (e) => {
        e.preventDefault();
    
        const userData = { username, email, password };
    
        try {
            await api.post('/user', userData);
            navigate('/');
        } catch (err) {
            setError(err.message || t('error-registration'));
        }
    };

    return (
        <div className="register-section">
            <div className="register-form-container">
                <div className="form-icon">
                    <img src="/images/isotype.png" alt="icon" />
                </div>
                <form onSubmit={handleRegister} className="register-form">
                    <div className="form-group">
                        <label>{t('form-username')}</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        {error && <span className="error-message">{t('error-login-username')}</span>}
                    </div>
                    <div className="form-group">
                        <label>{t('form-email')}</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        {error && <span className="error-message">{t('error-login-email')}</span>}
                    </div>
                    <div className="form-group">
                        <label>{t('form-password')}</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {error && <span className="error-message">{t('error-login-password')}</span>}
                    </div>
                    {error && <p className="error-text">{error}</p>}
                    <button type="submit">{t('register-button')}</button>
                </form>
                <div className="alternative-action">
                    <p>
                        {t('msg-for-login')}
                        <button onClick={() => navigate('/')}>{t('login-button')}</button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
