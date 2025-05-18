// src/services/api.js
import axios from 'axios';
import { getTokenFromStorage } from '../utils/auth.js';

const api = axios.create({
  baseURL: 'https://a398-2800-200-eb20-2a3-585b-a9ff-7d7f-ceab.ngrok-free.app/api',
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});

// Interceptor para agregar token JWT a cada solicitud
api.interceptors.request.use(
  (config) => {
    const token = getTokenFromStorage();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.warn('❌ No autorizado: token inválido o expirado');
      }
    } else if (error.request) {
      console.error('❌ Error de red: el servidor no respondió');
    } else {
      console.error('❌ Error desconocido:', error.message);
    }
    return Promise.reject(error);
  }
);

/// ==== FUNCIONES API =====

// Crear producto
export const createProduct = async (data) => {
  const res = await api.post('/products', data);
  return res.data;
};

// Obtener todos los productos
export const getProducts = async () => {
  const res = await api.get('/products');
  return res.data;
};



// Obtener info del usuario autenticado
export const getCurrentUser = async () => {
  const res = await api.get('/user/me');
  return res.data.user;
};

// Registrar usuario
export const registerUser = async (formData) => {
  const res = await api.post('/auth/register', formData);
  return res.data;
};

// Login
export const loginUser = async (credentials) => {
  const res = await api.post('/auth/login', credentials);
  return res.data;
};

export default api;


