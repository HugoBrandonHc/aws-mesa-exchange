import React, { useState } from 'react';
import { Amplify } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(null); // Resetea errores previos
    try {
      // Cognito SignIn
      const user = await Amplify.Auth.signIn(email, password);
      console.log('Usuario autenticado:', user);
      navigate('/catalogo'); // Redirige tras un inicio exitoso
    } catch (err) {
      console.error('Error en el inicio de sesión:', err);
      if (err.code === 'UserNotFoundException') {
        setError('Usuario no encontrado.');
      } else if (err.code === 'NotAuthorizedException') {
        setError('Correo o contraseña incorrectos.');
      } else {
        setError('Ocurrió un error inesperado. Inténtalo de nuevo.');
      }
    }
  };

  return (
    <div className="auth-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin} className="auth-form">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo Electrónico"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          required
        />
        <button type="submit">Iniciar Sesión</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}

export default Login;
