import React, { useState, useEffect } from 'react';
import { Menu, Sun, Moon, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Check initial theme preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      setIsDarkMode(false);
    }

    // Check local storage
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light') {
      setIsDarkMode(false);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[min(92vw,1100px)] z-50">
      <nav className="flex justify-between items-center px-8 py-5 rounded-[50px] bg-white/10 backdrop-blur-md border border-white/20">
        <a href="#hero" className="text-2xl font-bold text-white no-underline">Sujal.</a>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-8 list-none m-0 p-0">
          <li><a href="#hero" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
          <li><a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a></li>
          <li><a href="#projects" className="text-gray-300 hover:text-white transition-colors">Projects</a></li>
          <li><a href="#skills" className="text-gray-300 hover:text-white transition-colors">Skills</a></li>
          <li><a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
        </ul>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="w-14 h-7 bg-transparent border-none cursor-pointer relative"
            aria-label="Toggle theme"
          >
            <span className="block w-full h-full bg-white/10 rounded-full border border-white/20 relative">
              <span className={`absolute top-0.5 left-0.5 w-[22px] h-[22px] rounded-full flex items-center justify-center transition-transform duration-300 ${!isDarkMode ? 'translate-x-[28px] bg-gradient-to-br from-amber-400 to-amber-500' : 'bg-gradient-to-br from-indigo-300 to-indigo-500'}`}>
                {isDarkMode ? (
                  <Moon size={14} className="text-white" />
                ) : (
                  <Sun size={14} className="text-white" />
                )}
              </span>
            </span>
          </button>

          <button
            onClick={toggleMenu}
            className="md:hidden bg-transparent border-none text-white cursor-pointer"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full mt-4 left-0 w-full bg-[#0f172a]/95 backdrop-blur-xl rounded-2xl p-6 border border-white/10 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4">
          <a href="#hero" className="text-gray-200 text-lg py-2 border-b border-white/10" onClick={() => setIsMenuOpen(false)}>Home</a>
          <a href="#about" className="text-gray-200 text-lg py-2 border-b border-white/10" onClick={() => setIsMenuOpen(false)}>About</a>
          <a href="#projects" className="text-gray-200 text-lg py-2 border-b border-white/10" onClick={() => setIsMenuOpen(false)}>Projects</a>
          <a href="#skills" className="text-gray-200 text-lg py-2 border-b border-white/10" onClick={() => setIsMenuOpen(false)}>Skills</a>
          <a href="#contact" className="text-gray-200 text-lg py-2" onClick={() => setIsMenuOpen(false)}>Contact</a>
        </div>
      )}
    </header>
  );
};

export default Navbar;
