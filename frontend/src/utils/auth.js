// src/utils/authStorage.js
export const getTokenFromStorage = () => localStorage.getItem('token');
export const setTokenToStorage = (token) => localStorage.setItem('token', token);
export const removeTokenFromStorage = () => localStorage.removeItem('token');

export const saveUserToStorage = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

// Usuario (guardado como JSON)
export const getUserFromStorage = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const setUserToStorage = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const removeUserFromStorage = () => {
  localStorage.removeItem('user');
};
