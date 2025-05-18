import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// Páginas
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Marketplace from '../pages/Marketplace';
import SellerDashboard from '../pages/SellerDashboard';
import ServiceRequest from '../pages/ServiceRequest';

const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-center mt-10">Cargando...</div>;

  // Ruta privada solo si está logueado
  const PrivateRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" />;
  };

  // Ruta solo para vendedores
  const SellerRoute = ({ children }) => {
    return user?.role === 'vendedor' ? children : <Navigate to="/" />;
  };

  return (
    <Routes>
      {/* Públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/marketplace" element={<Marketplace />} />

      {/* Ruta para solicitar servicios (público o cliente logueado) */}
      <Route path="/service-request" element={<ServiceRequest />} />

      {/* Protegidas */}
      <Route
        path="/seller-dashboard"
        element={
          <PrivateRoute>
            <SellerRoute>
              <SellerDashboard />
            </SellerRoute>
          </PrivateRoute>
        }
      />

      {/* Ruta por defecto si no coincide */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
