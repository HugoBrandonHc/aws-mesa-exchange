import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';

// Componente para proteger rutas
const ProtectedRoute = ({ children }) => {
  const { user } = useAuthenticator((context) => [context.user]);

  if (!user) {
    // Si no está autenticado, redirige a login
    return <Navigate to="/login" />;
  }

  // Si está autenticado, renderiza el contenido de la ruta
  return children;
};

export default ProtectedRoute;
