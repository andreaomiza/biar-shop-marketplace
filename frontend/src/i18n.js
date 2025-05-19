// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      Productos: 'Products',
      Servicios: 'Services',
      Tiendas: 'Stores',
      FAQ: 'FAQ',
      'Iniciar sesión': 'Login',
      Registrarse: 'Register',
      // Añade aquí todas las claves que usas en Navbar u otros componentes
    }
  },
  es: {
    translation: {
      Productos: 'Productos',
      Servicios: 'Servicios',
      Tiendas: 'Tiendas',
      FAQ: 'FAQ',
      'Iniciar sesión': 'Iniciar sesión',
      Registrarse: 'Registrarse',
    }
  }
};

i18n
  .use(LanguageDetector) // Detecta el idioma del navegador
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;
