import React, { useState } from 'react';

const Register = ({ changeView }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    const userData = { username, email, password };

    try {
      const response = await fetch('http://localhost:80/eazypay-api/rest/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.text();
        console.log(data); // Puede mostrar el mensaje del servidor
        changeView('login');  // Cambiar a la vista de login después de registrar
      } else {
        const data = await response.json();
        setError(data.errors.join(', ')); // Mostrar errores de validación
      }
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account?{' '}
        <button onClick={() => changeView('login')}>Login</button>
      </p>
    </div>
  );
};

export default Register;
