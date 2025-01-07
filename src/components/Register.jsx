import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
            const response = await fetch('http://localhost:80/rest/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const data = await response.text();
                navigate('/'); // Navigate to login after successful registration
            } else {
                const data = await response.json();
                setError(data.errors.join(', ')); // Show validation errors
            }
        } catch (err) {
            setError('Registration failed');
        }
    };

    return (
        <div className="register-section">
            <div className="register-form-container">
                <div className="form-icon">
                    <img src="/images/isotype.png" alt="icon" />
                </div>
                <form onSubmit={handleRegister}>
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
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                    <button type="submit">Register</button>
                </form>
                <p>
                    Already have an account?{' '}
                    <button onClick={() => navigate('/')}>Login</button>
                </p>
            </div>
        </div>
    );
};

export default Register;
