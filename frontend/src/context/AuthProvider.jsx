import React, { useState, useEffect, useCallback } from 'react';
import AuthContext from './AuthContext';
import api from '../services/api.js';
import {
  setTokenToStorage,
  removeTokenFromStorage,
  getTokenFromStorage,
} from '../utils/auth.js';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ loading añadido

  const fetchUser = useCallback(async () => {
    try {
      const res = await api.get('/user/me'); // GET /api/user/me
      setUser(res.data.user);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      logout(); // si falla, limpia token y usuario
    } finally {
      setLoading(false); // ✅ siempre termina carga
    }
  }, []);

  useEffect(() => {
    const token = getTokenFromStorage();
    if (token) {
      fetchUser();
    } else {
      setLoading(false); // ✅ si no hay token, carga termina
    }
  }, [fetchUser]);

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      const { token, user } = res.data;
      setTokenToStorage(token);
      setUser(user);
      return {
        success: true,
        user,
      };
    } catch (error) {
      console.error("Error en login:", error.response?.data || error.message);
      return {
        success: false,
        message: error.response?.data?.message || "Error inesperado",
      };
    }
  };

  const register = async (formData) => {
    try {
      const res = await api.post('/auth/register', formData);
      const { token, user } = res.data;
      setTokenToStorage(token);
      setUser(user);
      return {
        success: res.status === 200 || res.status === 201,
        user,
      };
    } catch (error) {
      console.error("Error en registro:", error.response?.data || error.message);
      return {
        success: false,
        message: error.response?.data?.message || "Error inesperado",
      };
    }
  };

  const logout = () => {
    setUser(null);
    removeTokenFromStorage();
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
