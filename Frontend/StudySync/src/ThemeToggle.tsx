import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { accThemeSun, accThemeMoon } from './assets';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const theme = document.documentElement.getAttribute('data-theme');
    setIsDark(theme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setIsDark(!isDark);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme-mode', newTheme);
  };

  return (
    <button 
      onClick={toggleTheme}
      className="theme-toggle-btn"
      aria-label="Toggle theme"
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <div className={`theme-toggle-track ${isDark ? 'dark' : 'light'}`}>
        <motion.div 
          className="theme-toggle-thumb"
          layout
          transition={{ type: "spring", stiffness: 700, damping: 30 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {isDark ? (
            <img src={accThemeMoon} width={14} height={14} alt="Dark" style={{ filter: 'brightness(10)' }} />
          ) : (
            <img src={accThemeSun} width={14} height={14} alt="Light" />
          )}
        </motion.div>
      </div>
    </button>
  );
}
