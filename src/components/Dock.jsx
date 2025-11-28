import React, { useState, useEffect } from 'react';
import { Home, User2, LayoutGrid, Sparkles, Send, Sun, Moon } from 'lucide-react';

const Dock = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'projects', 'skills', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Sync theme with initial state
    if (document.body.classList.contains('light-mode')) {
        setIsLightMode(true);
    }

    // Observer for theme changes on body
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                setIsLightMode(document.body.classList.contains('light-mode'));
            }
        });
    });
    observer.observe(document.body, { attributes: true });

    return () => {
        window.removeEventListener('scroll', handleScroll);
        observer.disconnect();
    };
  }, []);

  const toggleTheme = () => {
    if (isLightMode) {
        document.body.classList.remove('light-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
    }
    setIsLightMode(!isLightMode);
  };

  return (
    <nav id="content-dock" className="glass-ui">
      <a href="#hero" className={`dock-link social-icon ${activeSection === 'hero' ? 'active' : ''}`} data-tooltip="Home">
        <Home size={20} />
        <span className="sr-only">Home</span>
      </a>
      <a href="#about" className={`dock-link social-icon ${activeSection === 'about' ? 'active' : ''}`} data-tooltip="About">
        <User2 size={20} />
        <span className="sr-only">About</span>
      </a>
      <a href="#projects" className={`dock-link social-icon ${activeSection === 'projects' ? 'active' : ''}`} data-tooltip="Projects">
        <LayoutGrid size={20} />
        <span className="sr-only">Projects</span>
      </a>
      <a href="#skills" className={`dock-link social-icon ${activeSection === 'skills' ? 'active' : ''}`} data-tooltip="Skills">
        <Sparkles size={20} />
        <span className="sr-only">Skills</span>
      </a>
      <a href="#contact" className={`dock-link social-icon ${activeSection === 'contact' ? 'active' : ''}`} data-tooltip="Contact">
        <Send size={20} />
        <span className="sr-only">Contact</span>
      </a>
      <button id="dock-theme-toggle" className="dock-link social-icon" data-tooltip="Toggle theme" onClick={toggleTheme}>
        {isLightMode ? <Moon size={20} /> : <Sun size={20} />}
      </button>
    </nav>
  );
};

export default Dock;
