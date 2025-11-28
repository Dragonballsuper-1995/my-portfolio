import React, { useState, useEffect } from 'react';
import { Menu, Sun, Moon, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    // Check initial theme preference
    if (localStorage.getItem('theme') === 'light') {
      setIsLightMode(true);
      document.body.classList.add('light-mode');
    }
  }, []);

  const toggleTheme = () => {
    setIsLightMode(!isLightMode);
    if (!isLightMode) {
      document.body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    } else {
      document.body.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <nav className="navbar container">
        <a href="#hero" className="logo">Sujal.</a>
        <ul className="nav-links">
          <li><a href="#hero" className="nav-link">Home</a></li>
          <li><a href="#about" className="nav-link">About</a></li>
          <li><a href="#projects" className="nav-link">Projects</a></li>
          <li><a href="#skills" className="nav-link">Skills</a></li>
          <li><a href="#contact" className="nav-link">Contact</a></li>
        </ul>
        <div className="navbar-right flex items-center gap-4">
          <button
            id="navbar-theme-toggle"
            className="theme-toggle-switch"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <span className="toggle-track">
              <span className={`toggle-thumb ${isLightMode ? 'translate-x-[28px] bg-gradient-to-br from-amber-400 to-amber-600' : ''}`}>
                {isLightMode ? (
                   <Moon size={14} className="text-white" />
                ) : (
                   <Sun size={14} className="text-white" />
                )}
              </span>
            </span>
          </button>

          <button
            id="menu-toggle"
            className="menu-toggle"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`} id="mobile-menu">
        <a href="#hero" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</a>
        <a href="#about" className="nav-link" onClick={() => setIsMenuOpen(false)}>About</a>
        <a href="#projects" className="nav-link" onClick={() => setIsMenuOpen(false)}>Projects</a>
        <a href="#skills" className="nav-link" onClick={() => setIsMenuOpen(false)}>Skills</a>
        <a href="#contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>Contact</a>
      </div>
    </header>
  );
};

export default Header;
