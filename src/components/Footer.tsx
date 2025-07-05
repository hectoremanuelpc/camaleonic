import Image from 'next/image';
import { Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Logo and description */}
          <div className="space-y-4 mt-1">
            <div className="flex items-center space-x-6 group">
              <Image
                src="/logo_camaleonic.png"
                alt="Camaleonic Logo"
                width={32}
                height={32}
                className="object-contain transform transition-transform group-hover:rotate-12 duration-300"
              />
              <p className="text-gray-400 text-sm group-hover:text-white transition-colors duration-300">
                Adaptive solutions for your digital needs.
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="transform hover:translate-x-1 transition-transform duration-300 group/contact mx-auto">
            <h3 className="text-lg font-semibold mb-4 gradient-text md:opacity-70 group-hover/contact:opacity-100 transition-opacity duration-300">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:contact@camaleonic.com" className="md:text-gray-400 text-white hover:text-white transition-colors duration-300 flex items-center group">
                  <Mail className="h-5 w-5 mr-2 transform transition-transform duration-300 group-hover:scale-110" />
                  <span className="transform transition-all duration-300 group-hover:translate-x-1">contact@camaleonic.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p className="hover:text-white transition-colors duration-300">&copy; {new Date().getFullYear()} Camaleonic. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 