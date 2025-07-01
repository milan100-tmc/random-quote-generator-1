import { Category } from '../types/quote';
import { 
  Sparkles, 
  Brain, 
  Smile, 
  Trophy, 
  Heart,
  Star,
  Grid3X3
} from 'lucide-react';

interface CategorySelectorProps {
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
}

const categoryConfig = {
  all: { 
    label: 'All Quotes', 
    icon: Grid3X3, 
    color: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
    activeColor: 'bg-gray-600 dark:bg-gray-500 text-white'
  },
  motivational: { 
    label: 'Motivational', 
    icon: Sparkles, 
    color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
    activeColor: 'bg-blue-600 dark:bg-blue-500 text-white'
  },
  wisdom: { 
    label: 'Wisdom', 
    icon: Brain, 
    color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
    activeColor: 'bg-purple-600 dark:bg-purple-500 text-white'
  },
  humor: { 
    label: 'Humor', 
    icon: Smile, 
    color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
    activeColor: 'bg-yellow-600 dark:bg-yellow-500 text-white'
  },
  success: { 
    label: 'Success', 
    icon: Trophy, 
    color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
    activeColor: 'bg-green-600 dark:bg-green-500 text-white'
  },
  life: { 
    label: 'Life', 
    icon: Heart, 
    color: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
    activeColor: 'bg-red-600 dark:bg-red-500 text-white'
  },
  inspiration: { 
    label: 'Inspiration', 
    icon: Star, 
    color: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300',
    activeColor: 'bg-indigo-600 dark:bg-indigo-500 text-white'
  }
} as const;

export const CategorySelector = ({ selectedCategory, onCategoryChange }: CategorySelectorProps) => {
  return (
    <div className="category-selector">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 text-center">
        Choose a Category
      </h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
        {Object.entries(categoryConfig).map(([key, config]) => {
          const Icon = config.icon;
          const isActive = selectedCategory === key;
          
          return (
            <button
              key={key}
              onClick={() => onCategoryChange(key as Category)}
              className={`
                group relative p-4 rounded-xl transition-all duration-300 
                ${isActive ? config.activeColor : config.color}
                hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900
                border border-transparent hover:border-gray-200 dark:hover:border-gray-600
              `}
            >
              <div className="flex flex-col items-center space-y-2">
                <Icon className={`w-6 h-6 transition-transform duration-300 group-hover:scale-110`} />
                <span className="text-sm font-medium text-center leading-tight">
                  {config.label}
                </span>
              </div>
              
              {/* Active indicator */}
              {isActive && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-white dark:bg-gray-800 rounded-full border-2 border-current"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
