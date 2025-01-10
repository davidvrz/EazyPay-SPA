import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import '../styles/components/Auth.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
    
        const userData = { username, email, password };
    
        try {
            await api.post('/user', userData);
            navigate('/');
        } catch (err) {
            setError(err.message || 'Registration failed');
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
                        <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        {error && <span className="error-message">Username is required</span>}
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        {error && <span className="error-message">Email is required</span>}
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {error && <span className="error-message">Password is required</span>}
                    </div>
                    {error && <p className="error-text">{error}</p>}
                    <button type="submit">Register</button>
                </form>
                <div className="alternative-action">
                    <p>
                        Already have an account?{' '}
                        <button onClick={() => navigate('/')}>Login</button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
