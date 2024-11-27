import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuthenticator((context) => [context.user]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
