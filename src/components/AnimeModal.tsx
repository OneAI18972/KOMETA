import React from 'react';
import { X, Star, Play, Calendar, Clock, Tv } from 'lucide-react';
import { Anime } from '../types/anime';

interface AnimeModalProps {
  anime: Anime | null;
  isOpen: boolean;
  onClose: () => void;
}

const AnimeModal: React.FC<AnimeModalProps> = ({ anime, isOpen, onClose }) => {
  if (!isOpen || !anime) return null;

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

  const getTypeText = (type: string) => {
    switch (type) {
      case 'TV':
        return 'ТВ Сериал';
      case 'Movie':
        return 'Фильм';
      case 'OVA':
        return 'OVA';
      case 'ONA':
        return 'ONA';
      case 'Special':
        return 'Спешл';
      default:
        return type;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-anime-gray rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">{anime.titleRu}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Poster and main info */}
            <div className="lg:col-span-1">
              <div className="relative mb-4">
                <img
                  src={anime.poster}
                  alt={anime.titleRu}
                  className="w-full rounded-lg"
                />
                {anime.has4K && (
                  <div className="absolute top-2 right-2 bg-anime-accent text-black px-3 py-1 rounded text-sm font-bold">
                    4K
                  </div>
                )}
              </div>

              {/* Watch button */}
              <button className="w-full bg-anime-accent text-black font-semibold py-3 px-4 rounded-lg hover:bg-green-400 transition-colors flex items-center justify-center mb-4">
                <Play className="w-5 h-5 mr-2" />
                Смотреть
              </button>

              {/* Rating */}
              <div className="flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 mr-2" />
                <span className="text-2xl font-bold text-white">{anime.rating}</span>
                <span className="text-gray-400 ml-1">/10</span>
              </div>

              {/* Quick info */}
              <div className="space-y-3">
                <div className="flex items-center text-gray-300">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{anime.year}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Tv className="w-4 h-4 mr-2" />
                  <span>{getTypeText(anime.type)}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{anime.episodes} эпизодов</span>
                </div>
                <div className="text-gray-300">
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                    anime.status === 'ongoing' ? 'bg-anime-accent text-black' :
                    anime.status === 'completed' ? 'bg-blue-600' : 'bg-gray-600'
                  }`}>
                    {getStatusText(anime.status)}
                  </span>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-2">Описание</h3>
                <p className="text-gray-300 leading-relaxed">{anime.description}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-3">Жанры</h3>
                <div className="flex flex-wrap gap-2">
                  {anime.genres.map((genre, index) => (
                    <span
                      key={index}
                      className="anime-badge bg-anime-card text-gray-300 border border-gray-600"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-3">Информация</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-gray-400 block">Оригинальное название:</span>
                    <span className="text-white">{anime.title}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Год выпуска:</span>
                    <span className="text-white">{anime.year}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Тип:</span>
                    <span className="text-white">{getTypeText(anime.type)}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Статус:</span>
                    <span className="text-white">{getStatusText(anime.status)}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Эпизоды:</span>
                    <span className="text-white">{anime.episodes}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Рейтинг:</span>
                    <span className="text-white">{anime.rating}/10</span>
                  </div>
                </div>
              </div>

              {/* Similar anime placeholder */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Похожие аниме</h3>
                <p className="text-gray-400">Скоро здесь появятся рекомендации похожих аниме</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeModal;