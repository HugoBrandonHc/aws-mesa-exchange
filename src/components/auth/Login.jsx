import React, { useEffect } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';
import '@aws-amplify/ui-react/styles.css';

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    // Este efecto verifica si ya estamos autenticados y redirige al inicio
    const authState = localStorage.getItem('amplify-authenticator-authState');
    if (authState === 'signedin') {
      navigate('/'); // Redirige al inicio si el usuario ya está autenticado
    }
  }, [navigate]);

  return (
    <Authenticator>
      {({ signOut, user }) => {
        // Redirigir al inicio si el usuario está autenticado
        if (user) {
          navigate('/'); // Redirige al inicio automáticamente
          return null; // No renderiza nada mientras redirige
        }

        return (
          <div>
            <h1>Iniciar sesión</h1>
          </div>
        );
      }}
    </Authenticator>
  );
}

export default Login;
