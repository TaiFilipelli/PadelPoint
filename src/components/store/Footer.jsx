import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 text-white py-8">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
        {/* Sección: Sobre nosotros */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Conocé más de nosotros</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/about" className="hover:underline">¿Quiénes somos?</Link>
            </li>
            <li>
              <Link href="/about#faq" className="hover:underline">FAQ</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">Navegación rápida</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/products" className="hover:underline">Productos</Link>
            </li>
            <li>
              <Link href="/register" className="hover:underline">Unirse a PadelPoint</Link>
            </li>
            <li>
              <Link href="/login" className="hover:underline">Iniciar sesión</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">Contacto</h3>
          <ul className="space-y-2">
            <li>Email: <a href="mailto:nachomerlogm@gmail.com" className="hover:underline">nachomerlogm@gmail.com</a></li>
            <li>Teléfono: <a href="tel:+549336400-3555" className="hover:underline">+54 9 336 400-3555</a></li>
          </ul>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Padel Point. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;

