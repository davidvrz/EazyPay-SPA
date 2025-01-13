import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import '../../styles/components/Auth.css';
import { useTranslation } from 'react-i18next';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');
    const navigate = useNavigate();
    const {t} = useTranslation();

    const handleRegister = async (e) => {
        e.preventDefault();
    
        const userData = { username, email, password };
    
        try {
            await api.post('/user', userData);
            navigate('/');
        } catch (err) {
            setErrors(err.errors);
            console.log(errors.username);
            console.log(errors.email);
            console.log(errors.passwd);
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
                        />
                    </div>
                    {errors.username && (<div className="error-message">{t(`error.${errors.username}`)}</div>)}
                    <div className="form-group">
                        <label>{t('form-email')}</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    {errors.email && (<div className="error-message">{t(`error.${errors.email}`)}</div>)}
                    <div className="form-group">
                        <label>{t('form-password')}</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {errors.passwd && (<div className="error-message">{t(`error.${errors.passwd}`)}</div>)}
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
