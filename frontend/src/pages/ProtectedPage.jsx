// src/pages/ProtectedPage.jsx
import React, { useEffect, useState } from 'react';
import api from '../services/api';

const ProtectedPage = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProtected = async () => {
      try {
        const res = await api.get('/protected');
        setMessage(res.data.message);
      } catch (err) {
        console.error('Error al acceder a la ruta protegida', err);
        setMessage('Acceso denegado');
      }
    };

    fetchProtected();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Ruta Protegida</h2>
      <p>{message}</p>
    </div>
  );
};

export default ProtectedPage;
