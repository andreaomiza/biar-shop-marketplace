import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#0b0c1a] text-white py-10 px-6" role="contentinfo">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        <section aria-labelledby="footer-about">
          <h4 id="footer-about" className="text-lg font-semibold mb-2">Sobre Nosotros</h4>
          <p className="text-gray-400 leading-relaxed">
            Marketplace especializado en productos digitales y servicios creativos para DJs y diseñadores. Compra como invitado o crea tu cuenta para más funciones.
          </p>
        </section>

        <nav aria-label="Enlaces rápidos">
          <h4 className="text-lg font-semibold mb-2">Enlaces Rápidos</h4>
          <ul className="space-y-1 text-gray-300">
            <li><Link to="/marketplace" className="hover:underline focus:outline-none focus:ring-1 focus:ring-yellow-400 rounded">Marketplace</Link></li>
            <li><Link to="/service-request" className="hover:underline focus:outline-none focus:ring-1 focus:ring-yellow-400 rounded">Solicitar Servicio</Link></li>
            <li><Link to="/support" className="hover:underline focus:outline-none focus:ring-1 focus:ring-yellow-400 rounded">Soporte</Link></li>
            <li><Link to="/faq" className="hover:underline focus:outline-none focus:ring-1 focus:ring-yellow-400 rounded">FAQ</Link></li>
          </ul>
        </nav>

        <section aria-labelledby="footer-follow">
          <h4 id="footer-follow" className="text-lg font-semibold mb-2">Síguenos</h4>
          <p className="text-gray-400 mb-2">Próximamente redes sociales y comunidad para creadores.</p>
          <p className="text-gray-600 text-xs">© {new Date().getFullYear()} DJ Marketplace. Todos los derechos reservados.</p>
        </section>
      </div>
    </footer>
  );
};

export default Footer;

