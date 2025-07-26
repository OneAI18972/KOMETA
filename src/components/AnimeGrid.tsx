import React from 'react';
import { ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import AnimeCard from './AnimeCard';
import { Anime, Collection } from '../types/anime';

interface AnimeGridProps {
  animes: Anime[];
  collections: Collection[];
  onAnimeClick: (anime: Anime) => void;
  onFilterClick: () => void;
}

const AnimeGrid: React.FC<AnimeGridProps> = ({ 
  animes, 
  collections, 
  onAnimeClick,
  onFilterClick 
}) => {
  const getAnimeById = (id: string) => animes.find(anime => anime.id === id);

  const scrollCarousel = (containerId: string, direction: 'left' | 'right') => {
    const container = document.getElementById(containerId);
    if (container) {
      const scrollAmount = 300;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const CollectionCarousel: React.FC<{ collection: Collection }> = ({ collection }) => {
    const collectionAnimes = collection.animes
      .map(getAnimeById)
      .filter(Boolean) as Anime[];

    if (collectionAnimes.length === 0) return null;

    return (
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">{collection.name}</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => scrollCarousel(`carousel-${collection.id}`, 'left')}
              className="p-2 bg-anime-gray rounded-full text-gray-400 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollCarousel(`carousel-${collection.id}`, 'right')}
              className="p-2 bg-anime-gray rounded-full text-gray-400 hover:text-white transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div 
          id={`carousel-${collection.id}`}
          className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {collectionAnimes.map((anime) => (
            <div key={anime.id} className="flex-shrink-0 w-48">
              <AnimeCard anime={anime} onClick={() => onAnimeClick(anime)} />
            </div>
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header with filters */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Каталог аниме</h1>
        <button
          onClick={onFilterClick}
          className="flex items-center space-x-2 bg-anime-gray text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <Filter className="w-4 h-4" />
          <span>Фильтры</span>
        </button>
      </div>

      {/* Collections */}
      {collections.map((collection) => (
        <CollectionCarousel key={collection.id} collection={collection} />
      ))}

      {/* All anime grid */}
      {animes.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-white mb-4">Все аниме</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {animes.map((anime) => (
              <AnimeCard 
                key={anime.id} 
                anime={anime} 
                onClick={() => onAnimeClick(anime)} 
              />
            ))}
          </div>
        </section>
      )}

      {animes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">Аниме не найдено</p>
          <p className="text-gray-500 text-sm mt-2">Попробуйте изменить фильтры или поисковой запрос</p>
        </div>
      )}
    </div>
  );
};

export default AnimeGrid;