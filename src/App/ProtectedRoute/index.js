import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from '../auth/AuthProvider';

function ProtectedRoute() {
    const auth = useAuth();
    console.log('isAuthenticated:', auth.isAuthenticated); // Agrega este console.log para verificar el valor

    return auth.isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}
export { ProtectedRoute };