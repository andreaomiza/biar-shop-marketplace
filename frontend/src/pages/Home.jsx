// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer.jsx';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#ff0044] via-[#e00068] to-[#ff0044] text-white flex flex-col">
      {/* Banner Principal */}
      <header className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <h1 className="text-5xl font-extrabold mb-4">
          Bienvenido a Marketplace DJ & Diseñadores
        </h1>
        <p className="text-lg max-w-xl mb-8">
          Compra loops, samples, plantillas y servicios digitales de los mejores DJs y diseñadores.
          Sin registro o con cuenta para más beneficios.
        </p>
        <div className="flex gap-4">
          <Link
            to="/register"
            className="bg-white text-[#ff0044] px-6 py-3 rounded font-semibold hover:bg-gray-100 transition"
          >
            Regístrate
          </Link>
          <Link
            to="/marketplace"
            className="bg-transparent border-2 border-white px-6 py-3 rounded font-semibold hover:bg-white hover:text-[#ff0044] transition"
          >
            Comprar como invitado
          </Link>
        </div>
      </header>

      {/* Sección Productos Destacados */}
      <section className="px-6 py-12 bg-white text-gray-900 rounded-t-3xl">
        <h2 className="text-3xl font-bold mb-8 text-center">Productos Destacados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="border rounded p-4 shadow hover:shadow-lg transition cursor-pointer">
            <h3 className="font-semibold text-xl mb-2">Sample Pack Exclusivo</h3>
            <p className="text-sm mb-2">Paquete de loops y samples de alta calidad para DJs.</p>
            <button
              onClick={() => window.location.href = '/marketplace'}
              className="bg-[#ff0044] text-white px-4 py-2 rounded hover:bg-[#e00068] transition"
            >
              Ver Producto
            </button>
          </div>
          <div className="border rounded p-4 shadow hover:shadow-lg transition cursor-pointer">
            <h3 className="font-semibold text-xl mb-2">Diseño de Logo Personalizado</h3>
            <p className="text-sm mb-2">Servicios de diseño gráfico para DJs y productores.</p>
            <button
              onClick={() => window.location.href = '/service-request'}
              className="bg-[#ff0044] text-white px-4 py-2 rounded hover:bg-[#e00068] transition"
            >
              Solicitar Servicio
            </button>
          </div>
          <div className="border rounded p-4 shadow hover:shadow-lg transition cursor-pointer">
            <h3 className="font-semibold text-xl mb-2">Samples de Voces y FX</h3>
            <p className="text-sm mb-2">Paquetes de voz para remixes, intros y drops.</p>
            <button
              onClick={() => window.location.href = '/marketplace'}
              className="bg-[#ff0044] text-white px-4 py-2 rounded hover:bg-[#e00068] transition"
            >
              Ver Producto
            </button>
          </div>
        </div>
      </section>

      {/* Sección Servicios Personalizados */}
      <section className="px-6 py-12 bg-gray-900 text-white mt-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Servicios Personalizados</h2>
        <p className="max-w-2xl mx-auto mb-8 text-center">
          ¿Buscas algo a medida? Solicita un servicio personalizado y nuestro equipo lo hará realidad.
        </p>
        <div className="flex justify-center">
          <Link
            to="/service-request"
            className="bg-white text-[#ff0044] px-6 py-3 rounded font-semibold hover:bg-gray-100 transition"
          >
            Solicitar Servicio
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
