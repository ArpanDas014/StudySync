import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

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
        >
          {isDark ? <Moon size={14} color="#FFF" /> : <Sun size={14} color="#F59E0B" />}
        </motion.div>
      </div>
    </button>
  );
}
