import React, { useState } from 'react';
import '../styles/components/Auth.css'

const Login = ({ changeView }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`'http://localhost:80/eazypay-api/rest/user/${username}`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + btoa(username + ':' + password), // Basic Auth
                },
            });

            if (response.ok) {
                const data = await response.text();

                // Save token and other info that API returns
                localStorage.setItem('username', username);
                changeView('dashboard');  // Change into Dashboard view
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
                {/* <h1>Login</h1> */}
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
                    {error && <p>{error}</p>}
                    <button type="submit">Login</button>
                </form>
                <p>
                    Don't have an account?{' '}
                    <button onClick={() => changeView('register')}>Register</button>
                </p>
            </div>
        </div>
    );
};

export default Login;
