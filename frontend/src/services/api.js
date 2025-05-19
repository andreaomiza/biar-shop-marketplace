import axios from 'axios';
import { getTokenFromStorage } from '../utils/auth.js';

const baseURL = 'https://70fa-2800-200-eb20-2a3-3973-da15-aba6-7678.ngrok-free.app';

const api = axios.create({
  baseURL: `${baseURL}/api`,
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
  withCredentials: true,
});

// Interceptor para agregar token JWT
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

// Interceptor para manejar errores
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

// ==== FUNCIONES API ====

export const createProduct = async (data) => {
  const res = await api.post('/products', data);
  return res.data;
};

export const getProducts = async () => {
  const res = await api.get('/products');
  return res.data;
};

export const getCurrentUser = async () => {
  const res = await api.get('/user/me');
  return res.data.user;
};

export const registerUser = async (formData) => {
  const res = await api.post('/auth/register', formData);
  return res.data;
};

export const loginUser = async (credentials) => {
  const res = await api.post('/auth/login', credentials);
  return res.data;
};

export { api, baseURL };
export default api;



