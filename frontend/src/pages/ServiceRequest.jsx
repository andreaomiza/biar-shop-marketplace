// src/pages/ServiceRequest.jsx
import React from 'react';
import ServiceForm from '../components/ServiceForm';

const ServiceRequest = () => {
  return (
    <div className="min-h-screen p-6 bg-gray-100 text-gray-900">
      <h1 className="text-3xl font-bold mb-6">Solicitar Servicio Personalizado</h1>
      <ServiceForm />
    </div>
  );
};

export default ServiceRequest;
