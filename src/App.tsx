import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import AnimeGrid from './components/AnimeGrid';
import FilterSidebar from './components/FilterSidebar';
import AnimeModal from './components/AnimeModal';
import { Anime, AnimeFilters } from './types/anime';
import { mockAnimes, collections } from './data/mockData';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState<AnimeFilters>({
    status: [],
    type: [],
    episodeRange: { min: 0, max: 1000 },
    ratingRange: { min: 0, max: 10 },
    has4K: false,
    genres: [],
    year: null
  });

  // Filter and search anime
  const filteredAnimes = useMemo(() => {
    return mockAnimes.filter(anime => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = anime.title.toLowerCase().includes(query) ||
                           anime.titleRu.toLowerCase().includes(query);
        const matchesGenre = anime.genres.some(genre => 
          genre.toLowerCase().includes(query)
        );
        if (!matchesTitle && !matchesGenre) return false;
      }

      // Status filter
      if (filters.status.length > 0 && !filters.status.includes(anime.status)) {
        return false;
      }

      // Type filter
      if (filters.type.length > 0 && !filters.type.includes(anime.type)) {
        return false;
      }

      // Episode range filter
      if (anime.episodes < filters.episodeRange.min || 
          anime.episodes > filters.episodeRange.max) {
        return false;
      }

      // Rating range filter
      if (anime.rating < filters.ratingRange.min || 
          anime.rating > filters.ratingRange.max) {
        return false;
      }

      // 4K filter
      if (filters.has4K && !anime.has4K) {
        return false;
      }

      // Genre filter
      if (filters.genres.length > 0) {
        const hasMatchingGenre = filters.genres.some(filterGenre =>
          anime.genres.includes(filterGenre)
        );
        if (!hasMatchingGenre) return false;
      }

      // Year filter
      if (filters.year && anime.year !== filters.year) {
        return false;
      }

      return true;
    });
  }, [searchQuery, filters]);

  const handleAnimeClick = (anime: Anime) => {
    setSelectedAnime(anime);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedAnime(null);
  };

  return (
    <div className="min-h-screen bg-anime-dark">
      <Header 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      <main>
        <AnimeGrid
          animes={filteredAnimes}
          collections={collections}
          onAnimeClick={handleAnimeClick}
          onFilterClick={() => setIsFilterOpen(true)}
        />
      </main>

      <FilterSidebar
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onFiltersChange={setFilters}
      />

      <AnimeModal
        anime={selectedAnime}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </div>
  );
}

export default App;