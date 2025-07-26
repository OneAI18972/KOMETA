export interface Anime {
  id: string;
  title: string;
  titleRu: string;
  poster: string;
  rating: number;
  year: number;
  episodes: number;
  status: 'ongoing' | 'completed' | 'announced';
  type: 'TV' | 'OVA' | 'Movie' | 'Special' | 'ONA';
  genres: string[];
  description: string;
  screenshots: string[];
  has4K: boolean;
}

export interface AnimeFilters {
  status: string[];
  type: string[];
  episodeRange: {
    min: number;
    max: number;
  };
  ratingRange: {
    min: number;
    max: number;
  };
  has4K: boolean;
  genres: string[];
  year: number | null;
}

export interface Collection {
  id: string;
  name: string;
  description?: string;
  animes: string[];
}