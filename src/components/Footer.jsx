import React from 'react';
import { Linkedin, Github, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-10 border-t border-white/10 mt-20 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-center space-x-6 mb-6">
          <a href="https://www.linkedin.com/in/sujalchhajed925/" target="_blank" className="text-gray-400 hover:text-blue-400 text-2xl transition-all duration-300 hover:-translate-y-1">
            <Linkedin className="w-6 h-6" />
          </a>
          <a href="https://github.com/Dragonballsuper-1995/" target="_blank" className="text-gray-400 hover:text-white text-2xl transition-all duration-300 hover:-translate-y-1">
            <Github className="w-6 h-6" />
          </a>
          <a href="https://x.com/sujal_chhajed" target="_blank" className="text-gray-400 hover:text-sky-400 text-2xl transition-all duration-300 hover:-translate-y-1">
            <Twitter className="w-6 h-6" />
          </a>
          <a href="https://www.instagram.com/sujalchhajed925/" target="_blank" className="text-gray-400 hover:text-pink-500 text-2xl transition-all duration-300 hover:-translate-y-1">
            <Instagram className="w-6 h-6" />
          </a>
        </div>
        <div className="text-center">
          <p className="text-gray-500">&copy; {new Date().getFullYear()} Sujal Chhajed. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
