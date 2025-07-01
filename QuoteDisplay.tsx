import { Quote } from '../types/quote';
import { Heart, Quote as QuoteIcon } from 'lucide-react';

interface QuoteDisplayProps {
  quote: Quote | null;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  isLoading?: boolean;
}

export const QuoteDisplay = ({ quote, isFavorite, onToggleFavorite, isLoading }: QuoteDisplayProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 dark:border-indigo-400"></div>
      </div>
    );
  }

  if (!quote) {
    return (
      <div className="flex items-center justify-center min-h-[300px] text-gray-500 dark:text-gray-400">
        <p>No quote available. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="quote-display group">
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-2xl p-8 lg:p-12 transition-all duration-500 hover:shadow-2xl dark:hover:shadow-3xl border border-gray-100 dark:border-gray-700">
        {/* Quote Icon */}
        <div className="absolute -top-4 left-8">
          <div className="bg-indigo-600 dark:bg-indigo-500 rounded-full p-3 shadow-lg">
            <QuoteIcon className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Quote Text */}
        <blockquote className="mt-6">
          <p className="text-xl lg:text-2xl xl:text-3xl font-light leading-relaxed text-gray-800 dark:text-gray-100 mb-6 lg:mb-8 text-center italic quote-text">
            "{quote.text}"
          </p>
          
          {/* Author */}
          <footer className="flex items-center justify-between">
            <div className="text-center flex-1">
              <cite className="text-lg lg:text-xl font-medium text-indigo-600 dark:text-indigo-400 not-italic">
                — {quote.author}
              </cite>
            </div>
            
            {/* Favorite Button */}
            <button
              onClick={onToggleFavorite}
              className={`
                ml-4 p-3 rounded-full transition-all duration-300 
                ${isFavorite 
                  ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-red-500 dark:hover:text-red-400'
                }
                hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800
              `}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart 
                className={`w-5 h-5 transition-all duration-300 ${isFavorite ? 'fill-current' : ''}`} 
              />
            </button>
          </footer>
        </blockquote>

        {/* Category Badge */}
        <div className="absolute -bottom-3 right-8">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300 shadow-sm capitalize">
            {quote.category}
          </span>
        </div>
      </div>
    </div>
  );
};
