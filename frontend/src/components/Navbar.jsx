import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const PRODUCTS = ['Audiolibros', 'Fuentes', 'Plantillas Webs', 'Samplers', 'ViRemix'];
const SERVICES = ['Desarrollo Web', 'Logo', 'Video', 'VoiceOver', 'Soporte'];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const { t, i18n } = useTranslation();

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en');
  };

  return (
    <nav className="bg-[#000414] text-white shadow-md fixed w-full z-50" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-[#ff0044]">Biartshop</Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-6">
          <div className="relative group">
            <button
              aria-haspopup="true"
              aria-expanded="false"
              className="hover:text-[#e00068] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e00068]"
            >
              {t('Productos')}
            </button>
            <div
              role="menu"
              aria-label="Productos"
              className="absolute hidden group-hover:block bg-white text-black mt-2 rounded shadow-lg py-2 z-10 min-w-[180px]"
            >
              {PRODUCTS.map((item) => (
                <Link
                  key={item}
                  to={`/productos/${item.toLowerCase()}`}
                  role="menuitem"
                  tabIndex="0"
                  className="block px-4 py-2 hover:bg-gray-100 focus:bg-gray-200 focus:outline-none"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          <div className="relative group">
            <button
              aria-haspopup="true"
              aria-expanded="false"
              className="hover:text-[#e00068] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e00068]"
            >
              {t('Servicios')}
            </button>
            <div
              role="menu"
              aria-label="Servicios"
              className="absolute hidden group-hover:block bg-white text-black mt-2 rounded shadow-lg py-2 z-10 min-w-[180px]"
            >
              {SERVICES.map((item) => (
                <Link
                  key={item}
                  to={`/servicios/${item.toLowerCase()}`}
                  role="menuitem"
                  tabIndex="0"
                  className="block px-4 py-2 hover:bg-gray-100 focus:bg-gray-200 focus:outline-none"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          <Link to="/tiendas" className="hover:text-[#e00068]">{t('Tiendas')}</Link>
          <Link to="/faq" className="hover:text-[#e00068]">{t('FAQ')}</Link>
          <Link to="/login" className="hover:text-[#e00068]">{t('Iniciar sesión')}</Link>
          <Link to="/register" className="hover:text-[#e00068]">{t('Registrarse')}</Link>

          <button
            onClick={toggleLang}
            className="hover:text-[#e00068] flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e00068]"
            aria-label="Cambiar idioma"
          >
            <Globe size={16} />
            {i18n.language.toUpperCase()}
          </button>

          <button className="relative hover:text-[#e00068]" aria-label="Ver carrito de compras">
            <ShoppingCart size={20} />
            {/* Aquí puedes añadir contador si quieres */}
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isOpen}
            className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e00068]"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0a0a0a] px-4 pb-4 space-y-3">
          <div>
            <button
              onClick={() => setShowProducts(!showProducts)}
              className="block w-full text-left hover:text-[#e00068] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e00068]"
              aria-expanded={showProducts}
              aria-controls="mobile-products-menu"
            >
              {t('Productos')}
            </button>
            {showProducts && (
              <div id="mobile-products-menu" className="pl-4 space-y-1">
                {PRODUCTS.map((item) => (
                  <Link key={item} to={`/productos/${item.toLowerCase()}`} className="block hover:text-[#e00068]">
                    {item}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div>
            <button
              onClick={() => setShowServices(!showServices)}
              className="block w-full text-left hover:text-[#e00068] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e00068]"
              aria-expanded={showServices}
              aria-controls="mobile-services-menu"
            >
              {t('Servicios')}
            </button>
            {showServices && (
              <div id="mobile-services-menu" className="pl-4 space-y-1">
                {SERVICES.map((item) => (
                  <Link key={item} to={`/servicios/${item.toLowerCase()}`} className="block hover:text-[#e00068]">
                    {item}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/tiendas" className="hover:text-[#e00068]">{t('Tiendas')}</Link>
          <Link to="/faq" className="hover:text-[#e00068]">{t('FAQ')}</Link>
          <Link to="/login" className="hover:text-[#e00068]">{t('Iniciar sesión')}</Link>
          <Link to="/register" className="hover:text-[#e00068]">{t('Registrarse')}</Link>
          <button
            onClick={toggleLang}
            className="flex items-center gap-1 hover:text-[#e00068] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e00068]"
            aria-label="Cambiar idioma"
          >
            <Globe size={16} />
            {i18n.language.toUpperCase()}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

