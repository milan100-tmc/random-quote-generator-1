import { useState, useEffect, useCallback } from 'react';
import { Quote, QuoteData, Category } from '../types/quote';

export const useQuotes = () => {
  const [quotes, setQuotes] = useState<QuoteData | null>(null);
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load quotes from JSON file
  useEffect(() => {
    const loadQuotes = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/data/quotes.json');
        if (!response.ok) {
          throw new Error('Failed to load quotes');
        }
        const data: QuoteData = await response.json();
        setQuotes(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    loadQuotes();
  }, []);

  // Get all quotes from selected category
  const getQuotesFromCategory = useCallback((category: Category): Quote[] => {
    if (!quotes) return [];
    
    if (category === 'all') {
      return Object.values(quotes.categories).flat();
    }
    
    return quotes.categories[category] || [];
  }, [quotes]);

  // Get random quote from selected category
  const getRandomQuote = useCallback((category: Category = selectedCategory): Quote | null => {
    const categoryQuotes = getQuotesFromCategory(category);
    if (categoryQuotes.length === 0) return null;
    
    const randomIndex = Math.floor(Math.random() * categoryQuotes.length);
    return categoryQuotes[randomIndex];
  }, [getQuotesFromCategory, selectedCategory]);

  // Generate new random quote
  const generateNewQuote = useCallback(() => {
    const newQuote = getRandomQuote();
    setCurrentQuote(newQuote);
  }, [getRandomQuote]);

  // Change category and generate new quote
  const changeCategory = useCallback((category: Category) => {
    setSelectedCategory(category);
    const newQuote = getRandomQuote(category);
    setCurrentQuote(newQuote);
  }, [getRandomQuote]);

  // Initialize with first quote when quotes are loaded
  useEffect(() => {
    if (quotes && !currentQuote) {
      generateNewQuote();
    }
  }, [quotes, currentQuote, generateNewQuote]);

  return {
    quotes,
    currentQuote,
    selectedCategory,
    isLoading,
    error,
    generateNewQuote,
    changeCategory,
    getQuotesFromCategory
  };
};
