import React from 'react';
import { Route, Navigate } from 'react-router-dom';

function ProtectedRoute({ element: Component, ...rest }) {
  const authTokens = localStorage.getItem('authTokens');

  return (
    <Route {...rest} element={authTokens ? <Component /> : <Navigate to="/login" />} />
  );
}

export default ProtectedRoute;
