import React, { useState, useEffect } from 'react';
import { Home, User, LayoutGrid, Sparkles, Send, Sun, Moon } from 'lucide-react';

const Dock = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'projects', 'skills', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= -100 && rect.top <= 300) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // Sync with global theme state if possible, or trigger event
    const event = new CustomEvent('themeChange', { detail: { darkMode: !isDarkMode } });
    window.dispatchEvent(event);

    if (isDarkMode) {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  };

  const navItems = [
    { id: 'hero', icon: Home, label: 'Home' },
    { id: 'about', icon: User, label: 'About' },
    { id: 'projects', icon: LayoutGrid, label: 'Projects' },
    { id: 'skills', icon: Sparkles, label: 'Skills' },
    { id: 'contact', icon: Send, label: 'Contact' },
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center gap-2 md:gap-4 z-50 shadow-lg shadow-black/20">
      {navItems.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={`relative p-3 rounded-full transition-all duration-300 group hover:bg-white/10 ${activeSection === item.id ? 'bg-white/20 text-indigo-300' : 'text-gray-400 hover:text-white'}`}
          aria-label={item.label}
        >
          <item.icon size={20} />
          <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {item.label}
          </span>
        </a>
      ))}

      <div className="w-px h-6 bg-white/20 mx-1"></div>

      <button
        onClick={toggleTheme}
        className="relative p-3 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300 group"
        aria-label="Toggle theme"
      >
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Toggle Theme
        </span>
      </button>
    </nav>
  );
};

export default Dock;
