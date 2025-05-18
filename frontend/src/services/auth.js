// src/services/auth.js
import api from './api.js';

export const loginUser = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const registerUser = async (formData) => {
  const response = await api.post('/auth/register', formData);
  return response.data;
};


export const createProduct = async (productData) => {
  const res = await api.post('/products', productData);
  return res.data;
};
