import React, { useEffect, useState } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';
import '@aws-amplify/ui-react/styles.css';

function Registro() {
  const navigate = useNavigate(); // Hook para redirigir
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user) {
      // Desconectar al usuario y redirigir al login
      setTimeout(() => {
        navigate('/login'); // Redirige al login después de un tiempo breve
      }, 2000); // Espera 2 segundos antes de redirigir
    }
  }, [user, navigate]); // Se ejecuta si cambia `user`

  return (
    <Authenticator
      signUpAttributes={['email', 'phone_number', 'name', 'address', 'birthdate']}  // Añade más campos
      initialState="signUp"
    >
      {({ signOut, user: authUser }) => {
        // Guarda el usuario autenticado en el estado
        if (authUser && !user) {
          setUser(authUser); // Guarda el usuario
          signOut(); // Desconecta al usuario después del registro
        }
        return (
          <div>
            <h1>¡Registro exitoso!</h1>
            <p>Redirigiendo al inicio de sesión...</p>
          </div>
        );
      }}
    </Authenticator>
  );
}

export default Registro;
