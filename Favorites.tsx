import { Quote } from '../types/quote';
import { Heart, X, Trash2 } from 'lucide-react';

interface FavoritesProps {
  favorites: Quote[];
  onSelectQuote: (quote: Quote) => void;
  onRemoveFavorite: (quote: Quote) => void;
  onClearAll: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Favorites = ({ 
  favorites, 
  onSelectQuote, 
  onRemoveFavorite, 
  onClearAll, 
  isOpen, 
  onClose 
}: FavoritesProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <Heart className="w-6 h-6 text-red-500 fill-current" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              Favorite Quotes
            </h2>
            <span className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300 px-3 py-1 rounded-full text-sm font-medium">
              {favorites.length}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            {favorites.length > 0 && (
              <button
                onClick={onClearAll}
                className="flex items-center space-x-2 px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
                title="Clear all favorites"
              >
                <Trash2 className="w-4 h-4" />
                <span className="text-sm">Clear All</span>
              </button>
            )}
            
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
            >
              <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {favorites.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400 mb-2">
                No favorites yet
              </h3>
              <p className="text-gray-400 dark:text-gray-500">
                Start adding quotes to your favorites by clicking the heart icon
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {favorites.map((quote) => (
                <div
                  key={quote.id}
                  className="group bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-600"
                  onClick={() => {
                    onSelectQuote(quote);
                    onClose();
                  }}
                >
                  <div className="relative">
                    {/* Remove button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveFavorite(quote);
                      }}
                      className="absolute -top-2 -right-2 p-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-200 dark:hover:bg-red-900/50"
                      title="Remove from favorites"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    {/* Quote content */}
                    <blockquote className="mb-3">
                      <p className="text-sm lg:text-base text-gray-700 dark:text-gray-300 leading-relaxed italic mb-2 line-clamp-3">
                        "{quote.text}"
                      </p>
                      <footer className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                        — {quote.author}
                      </footer>
                    </blockquote>

                    {/* Category badge */}
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300 capitalize">
                      {quote.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
