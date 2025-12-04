'use client';
import { Zap, Instagram, Twitter, Facebook, Youtube } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  const footerLinks = {
    Comprar: ['Hombre', 'Mujer', 'Niños', 'Ofertas', 'Nuevos Lanzamientos'],
    Ayuda: ['Estado del Pedido', 'Envíos', 'Devoluciones', 'Opciones de Pago', 'Contacto'],
    Empresa: ['Sobre Nosotros', 'Carreras', 'Sostenibilidad', 'Blog'],
  };

  return (
    <footer className="relative bg-black border-t border-white/10">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-[#7df9ff] rounded-lg p-2">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black text-white">Sneaker Lab</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-sm">
              La plataforma definitiva para descubrir, personalizar y adquirir las mejores zapatillas del mercado.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Facebook, Youtube].map((Icon, idx) => (
                <button
                  key={idx}
                  className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <Icon className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white font-bold mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2025 Sneaker Lab. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="#" className="text-gray-500 hover:text-white transition-colors">
              Términos
            </Link>
            <Link href="#" className="text-gray-500 hover:text-white transition-colors">
              Privacidad
            </Link>
            <Link href="#" className="text-gray-500 hover:text-white transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;