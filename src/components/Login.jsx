import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/components/Auth.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:80/rest/user/${username}`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + btoa(username + ':' + password), // Basic Auth
                },
            });

            if (response.ok) {
                const data = await response.text();

                // Save token and other info that API returns
                localStorage.setItem('username', username);
                localStorage.setItem('password', password);
                navigate('/dashboard'); // Navigate to Dashboard
            } else {
                throw new Error('Login failed');
            }
        } catch (err) {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="register-section">
            <div className="register-form-container">
                <div className="form-icon">
                    <img src="images/isotype.png" alt="icon" />
                </div>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <span className="error-message">Provisional error</span>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span className="error-message">Provisional error</span>
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
