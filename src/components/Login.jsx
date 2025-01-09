import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/components/Auth.css';
import { api } from '../services/api'; // Servicio API

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Resetea errores

        try {
            const headers = {
                Authorization: 'Basic ' + btoa(`${username}:${password}`),
            };
            await api.get(`/user/${username}`, headers); // Llama al servicio API
            
            // Guardar credenciales o token en localStorage
            localStorage.setItem('username', username);
            localStorage.setItem('authToken', btoa(`${username}:${password}`)); // Token básico
            navigate('/home'); // Redirige al Dashboard
        } catch (err) {
            setError('Invalid username or password'); // Manejo de errores
        }
    };

    return (
        <div className="register-section">
            <div className="register-form-container">
                <div className="form-icon">
                    <img src="/images/isotype.png" alt="icon" />
                </div>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        {error && !username && <span className="error-message">Username is required</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {error && !password && <span className="error-message">Password is required</span>}
                    </div>
                    {error && <p className="error-text">{error}</p>}
                    <button type="submit">Login</button>
                </form>
                <p>
                    Don&apos;t have an account?{' '}
                    <button onClick={() => navigate('/register')}>Register</button>
                </p>
            </div>
        </div>
    );
};

export default Login;
