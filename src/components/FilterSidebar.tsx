import React from 'react';
import { X } from 'lucide-react';
import { AnimeFilters } from '../types/anime';
import { genres } from '../data/mockData';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: AnimeFilters;
  onFiltersChange: (filters: AnimeFilters) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  isOpen,
  onClose,
  filters,
  onFiltersChange
}) => {
  const handleStatusChange = (status: string, checked: boolean) => {
    const newStatus = checked 
      ? [...filters.status, status]
      : filters.status.filter(s => s !== status);
    
    onFiltersChange({ ...filters, status: newStatus });
  };

  const handleTypeChange = (type: string, checked: boolean) => {
    const newType = checked 
      ? [...filters.type, type]
      : filters.type.filter(t => t !== type);
    
    onFiltersChange({ ...filters, type: newType });
  };

  const handleGenreChange = (genre: string, checked: boolean) => {
    const newGenres = checked 
      ? [...filters.genres, genre]
      : filters.genres.filter(g => g !== genre);
    
    onFiltersChange({ ...filters, genres: newGenres });
  };

  const resetFilters = () => {
    onFiltersChange({
      status: [],
      type: [],
      episodeRange: { min: 0, max: 1000 },
      ratingRange: { min: 0, max: 10 },
      has4K: false,
      genres: [],
      year: null
    });
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-anime-gray border-l border-gray-700 z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-white">Фильтры</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto h-[calc(100%-80px)]">
          {/* Status Filter */}
          <div className="mb-6">
            <h3 className="text-white font-medium mb-3">Статус</h3>
            <div className="space-y-2">
              {[
                { key: 'announced', label: 'Анонс' },
                { key: 'ongoing', label: 'Онгоинг' },
                { key: 'completed', label: 'Завершён' }
              ].map(({ key, label }) => (
                <label key={key} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.status.includes(key)}
                    onChange={(e) => handleStatusChange(key, e.target.checked)}
                    className="mr-2 accent-anime-accent"
                  />
                  <span className="text-gray-300">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Type Filter */}
          <div className="mb-6">
            <h3 className="text-white font-medium mb-3">Тип</h3>
            <div className="space-y-2">
              {[
                { key: 'TV', label: 'TV' },
                { key: 'Movie', label: 'Фильм' },
                { key: 'OVA', label: 'OVA' },
                { key: 'ONA', label: 'ONA' },
                { key: 'Special', label: 'Спешл' }
              ].map(({ key, label }) => (
                <label key={key} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.type.includes(key)}
                    onChange={(e) => handleTypeChange(key, e.target.checked)}
                    className="mr-2 accent-anime-accent"
                  />
                  <span className="text-gray-300">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Episode Range */}
          <div className="mb-6">
            <h3 className="text-white font-medium mb-3">Количество эпизодов</h3>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                placeholder="От"
                value={filters.episodeRange.min || ''}
                onChange={(e) => onFiltersChange({
                  ...filters,
                  episodeRange: { ...filters.episodeRange, min: parseInt(e.target.value) || 0 }
                })}
                className="flex-1 bg-anime-dark text-white px-3 py-2 rounded border border-gray-600 focus:outline-none focus:border-anime-accent"
              />
              <span className="text-gray-400">—</span>
              <input
                type="number"
                placeholder="До"
                value={filters.episodeRange.max === 1000 ? '' : filters.episodeRange.max}
                onChange={(e) => onFiltersChange({
                  ...filters,
                  episodeRange: { ...filters.episodeRange, max: parseInt(e.target.value) || 1000 }
                })}
                className="flex-1 bg-anime-dark text-white px-3 py-2 rounded border border-gray-600 focus:outline-none focus:border-anime-accent"
              />
            </div>
          </div>

          {/* Rating Range */}
          <div className="mb-6">
            <h3 className="text-white font-medium mb-3">Оценка</h3>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                step="0.1"
                min="0"
                max="10"
                placeholder="От"
                value={filters.ratingRange.min || ''}
                onChange={(e) => onFiltersChange({
                  ...filters,
                  ratingRange: { ...filters.ratingRange, min: parseFloat(e.target.value) || 0 }
                })}
                className="flex-1 bg-anime-dark text-white px-3 py-2 rounded border border-gray-600 focus:outline-none focus:border-anime-accent"
              />
              <span className="text-gray-400">—</span>
              <input
                type="number"
                step="0.1"
                min="0"
                max="10"
                placeholder="До"
                value={filters.ratingRange.max === 10 ? '' : filters.ratingRange.max}
                onChange={(e) => onFiltersChange({
                  ...filters,
                  ratingRange: { ...filters.ratingRange, max: parseFloat(e.target.value) || 10 }
                })}
                className="flex-1 bg-anime-dark text-white px-3 py-2 rounded border border-gray-600 focus:outline-none focus:border-anime-accent"
              />
            </div>
          </div>

          {/* 4K Filter */}
          <div className="mb-6">
            <h3 className="text-white font-medium mb-3">Другое</h3>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.has4K}
                onChange={(e) => onFiltersChange({ ...filters, has4K: e.target.checked })}
                className="mr-2 accent-anime-accent"
              />
              <span className="text-gray-300">Есть в 4K</span>
            </label>
          </div>

          {/* Genres */}
          <div className="mb-6">
            <h3 className="text-white font-medium mb-3">Жанры</h3>
            <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto">
              {genres.map((genre) => (
                <label key={genre} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.genres.includes(genre)}
                    onChange={(e) => handleGenreChange(genre, e.target.checked)}
                    className="mr-2 accent-anime-accent"
                  />
                  <span className="text-gray-300">{genre}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Reset Button */}
          <button
            onClick={resetFilters}
            className="w-full bg-anime-accent text-black font-medium py-2 px-4 rounded hover:bg-green-400 transition-colors"
          >
            Сбросить фильтры
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;