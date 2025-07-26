import React from 'react';
import { Search, User, Bell, Settings, Menu } from 'lucide-react';

interface HeaderProps {
  onSearchChange: (query: string) => void;
  searchQuery: string;
}

const Header: React.FC<HeaderProps> = ({ onSearchChange, searchQuery }) => {
  return (
    <header className="bg-anime-gray border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-anime-accent">
                anitype
              </h1>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a
                href="#"
                className="text-white hover:text-anime-accent px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Для вас
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-anime-accent px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Библиотека
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-anime-accent px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Скачать приложение
              </a>
            </div>
          </nav>

          {/* Search */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Введите название аниме или начните с @ для поиска пользователей"
                className="w-full bg-anime-dark text-white pl-10 pr-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-anime-accent transition-colors"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
          </div>

          {/* User actions */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-300 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="text-gray-300 hover:text-white transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-anime-accent rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-black" />
              </div>
              <span className="text-white text-sm font-medium">P</span>
            </div>
            <button className="md:hidden text-gray-300 hover:text-white transition-colors">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;