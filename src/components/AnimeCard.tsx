import React from 'react';
import { Star, Play } from 'lucide-react';
import { Anime } from '../types/anime';

interface AnimeCardProps {
  anime: Anime;
  onClick: () => void;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ anime, onClick }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing':
        return 'bg-anime-accent text-black';
      case 'completed':
        return 'bg-blue-600 text-white';
      case 'announced':
        return 'bg-gray-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ongoing':
        return 'Онгоинг';
      case 'completed':
        return 'Завершён';
      case 'announced':
        return 'Анонс';
      default:
        return status;
    }
  };

  return (
    <div 
      className="anime-card cursor-pointer group relative"
      onClick={onClick}
    >
      {/* Poster */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={anime.poster}
          alt={anime.titleRu}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Play overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
          <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Rating badge */}
        <div className="absolute top-2 left-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm font-medium flex items-center">
          <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
          {anime.rating}
        </div>

        {/* 4K badge */}
        {anime.has4K && (
          <div className="absolute top-2 right-2 bg-anime-accent text-black px-2 py-1 rounded text-xs font-bold">
            4K
          </div>
        )}

        {/* Status badge */}
        <div className={`absolute bottom-2 left-2 ${getStatusColor(anime.status)} px-2 py-1 rounded text-xs font-medium`}>
          {getStatusText(anime.status)}
        </div>

        {/* Episodes count */}
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
          {anime.episodes} эп.
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2 group-hover:text-anime-accent transition-colors">
          {anime.titleRu}
        </h3>
        <p className="text-gray-400 text-xs mb-2">
          {anime.title}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>{anime.year}</span>
          <span>{anime.type}</span>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {anime.genres.slice(0, 2).map((genre, index) => (
            <span
              key={index}
              className="anime-badge bg-gray-700 text-gray-300"
            >
              {genre}
            </span>
          ))}
          {anime.genres.length > 2 && (
            <span className="anime-badge bg-gray-700 text-gray-300">
              +{anime.genres.length - 2}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimeCard;