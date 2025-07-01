import { Sun, Moon, Heart, Quote } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
}

export const Header = ({ isDarkMode, onToggleDarkMode, favoritesCount, onOpenFavorites }: HeaderProps) => {
  return (
    <header className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 dark:from-indigo-800 dark:via-purple-800 dark:to-indigo-900"></div>
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3">
              <Quote className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white">
                Quote Generator
              </h1>
              <p className="text-indigo-100 dark:text-indigo-200 text-sm lg:text-base mt-1">
                Discover wisdom, inspiration, and motivation
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-3">
            {/* Favorites Button */}
            <button
              onClick={onOpenFavorites}
              className="relative flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <Heart className="w-5 h-5" />
              <span className="hidden sm:inline text-sm font-medium">Favorites</span>
              {favoritesCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-medium">
                  {favoritesCount > 99 ? '99+' : favoritesCount}
                </span>
              )}
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className="flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              {isDarkMode ? (
                <>
                  <Sun className="w-5 h-5" />
                  <span className="hidden sm:inline text-sm font-medium">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-5 h-5" />
                  <span className="hidden sm:inline text-sm font-medium">Dark</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Subtitle */}
        <div className="mt-6 text-center">
          <p className="text-xl lg:text-2xl text-white/90 font-light max-w-3xl mx-auto">
            Find the perfect quote to inspire your day, share wisdom with others, and keep your favorites close
          </p>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-purple-400/20 rounded-full blur-3xl"></div>
      </div>
    </header>
  );
};
