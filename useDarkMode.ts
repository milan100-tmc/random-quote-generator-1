import { useState, useEffect, useCallback } from 'react';

const DARK_MODE_KEY = 'quote-generator-dark-mode';

export const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // Check localStorage first, then system preference
    try {
      const stored = localStorage.getItem(DARK_MODE_KEY);
      if (stored !== null) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error reading dark mode from localStorage:', error);
    }
    
    // Default to system preference
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Apply dark mode class to document
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Save to localStorage whenever dark mode changes
  useEffect(() => {
    try {
      localStorage.setItem(DARK_MODE_KEY, JSON.stringify(isDarkMode));
    } catch (error) {
      console.error('Error saving dark mode to localStorage:', error);
    }
  }, [isDarkMode]);

  // Toggle dark mode
  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  // Set dark mode explicitly
  const setDarkMode = useCallback((value: boolean) => {
    setIsDarkMode(value);
  }, []);

  return {
    isDarkMode,
    toggleDarkMode,
    setDarkMode
  };
};
