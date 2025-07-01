import { useState } from 'react';
import { Shuffle, ArrowRight } from 'lucide-react';

// Components
import { Header } from './components/Header';
import { QuoteDisplay } from './components/QuoteDisplay';
import { CategorySelector } from './components/CategorySelector';
import { SocialShare } from './components/SocialShare';
import { Favorites } from './components/Favorites';

// Hooks
import { useQuotes } from './hooks/useQuotes';
import { useFavorites } from './hooks/useFavorites';
import { useDarkMode } from './hooks/useDarkMode';

// Types
import { Quote } from './types/quote';

function App() {
  const [showFavorites, setShowFavorites] = useState(false);
  
  // Custom hooks
  const { 
    currentQuote, 
    selectedCategory, 
    isLoading, 
    error, 
    generateNewQuote, 
    changeCategory 
  } = useQuotes();
  
  const { 
    favorites, 
    isFavorite, 
    toggleFavorite, 
    clearFavorites 
  } = useFavorites();
  
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const handleSelectFavoriteQuote = (quote: Quote) => {
    // This would ideally update the current quote to the selected favorite
    // For now, we'll generate a new quote since we don't have a direct way to set it
    generateNewQuote();
  };

  if (error) {
    return (
      <div className="min-h-screen bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
            Oops! Something went wrong
          </h1>
          <p className="text-red-500 dark:text-red-300 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Header */}
      <Header
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
        favoritesCount={favorites.length}
        onOpenFavorites={() => setShowFavorites(true)}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Category Selector */}
        <div className="mb-8 lg:mb-12">
          <CategorySelector
            selectedCategory={selectedCategory}
            onCategoryChange={changeCategory}
          />
        </div>

        {/* Quote Display */}
        <div className="mb-8 lg:mb-12">
          <QuoteDisplay
            quote={currentQuote}
            isFavorite={isFavorite(currentQuote)}
            onToggleFavorite={() => currentQuote && toggleFavorite(currentQuote)}
            isLoading={isLoading}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 lg:mb-12">
          <button
            onClick={generateNewQuote}
            disabled={isLoading}
            className="group flex items-center space-x-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
          >
            <Shuffle className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
            <span>Generate New Quote</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>

        {/* Social Share */}
        {currentQuote && !isLoading && (
          <div className="mb-8">
            <SocialShare quote={currentQuote} />
          </div>
        )}

        {/* Footer */}
        <footer className="text-center py-8 border-t border-gray-200 dark:border-gray-700 mt-12">
          <p className="text-gray-600 dark:text-gray-400">
            Made with ❤️ for inspiration seekers everywhere
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            Share wisdom • Spread positivity • Inspire others
          </p>
        </footer>
      </main>

      {/* Favorites Modal */}
      <Favorites
        favorites={favorites}
        onSelectQuote={handleSelectFavoriteQuote}
        onRemoveFavorite={toggleFavorite}
        onClearAll={clearFavorites}
        isOpen={showFavorites}
        onClose={() => setShowFavorites(false)}
      />
    </div>
  );
}

export default App;
