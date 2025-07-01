import { useState, useEffect, useCallback } from 'react';
import { Quote } from '../types/quote';

const FAVORITES_KEY = 'quote-generator-favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Quote[]>([]);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem(FAVORITES_KEY);
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites from localStorage:', error);
    }
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error);
    }
  }, [favorites]);

  // Check if quote is in favorites
  const isFavorite = useCallback((quote: Quote | null): boolean => {
    if (!quote) return false;
    return favorites.some(fav => fav.id === quote.id);
  }, [favorites]);

  // Add quote to favorites
  const addToFavorites = useCallback((quote: Quote) => {
    setFavorites(prev => {
      // Check if already exists
      if (prev.some(fav => fav.id === quote.id)) {
        return prev;
      }
      return [...prev, quote];
    });
  }, []);

  // Remove quote from favorites
  const removeFromFavorites = useCallback((quote: Quote) => {
    setFavorites(prev => prev.filter(fav => fav.id !== quote.id));
  }, []);

  // Toggle favorite status
  const toggleFavorite = useCallback((quote: Quote) => {
    if (isFavorite(quote)) {
      removeFromFavorites(quote);
    } else {
      addToFavorites(quote);
    }
  }, [isFavorite, addToFavorites, removeFromFavorites]);

  // Clear all favorites
  const clearFavorites = useCallback(() => {
    setFavorites([]);
  }, []);

  return {
    favorites,
    isFavorite,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    clearFavorites
  };
};
