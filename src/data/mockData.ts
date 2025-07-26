import { Anime, Collection } from '../types/anime';

export const mockAnimes: Anime[] = [
  {
    id: '1',
    title: 'Koe no Katachi',
    titleRu: 'Форма голоса',
    poster: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop',
    rating: 8.9,
    year: 2016,
    episodes: 1,
    status: 'completed',
    type: 'Movie',
    genres: ['Драма', 'Школа', 'Романтика'],
    description: 'История о мальчике, который издевался над глухой девочкой в школе, и его пути к искуплению.',
    screenshots: [],
    has4K: true
  },
  {
    id: '2',
    title: 'Your Name',
    titleRu: 'Твоё имя',
    poster: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop',
    rating: 8.4,
    year: 2016,
    episodes: 1,
    status: 'completed',
    type: 'Movie',
    genres: ['Романтика', 'Драма', 'Фантастика'],
    description: 'Два подростка из разных миров начинают меняться телами.',
    screenshots: [],
    has4K: true
  },
  {
    id: '3',
    title: 'Attack on Titan',
    titleRu: 'Атака титанов',
    poster: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop',
    rating: 9.0,
    year: 2013,
    episodes: 87,
    status: 'completed',
    type: 'TV',
    genres: ['Экшен', 'Драма', 'Фэнтези'],
    description: 'Человечество борется за выживание против гигантских титанов.',
    screenshots: [],
    has4K: false
  },
  {
    id: '4',
    title: 'Demon Slayer',
    titleRu: 'Клинок, рассекающий демонов',
    poster: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop',
    rating: 8.7,
    year: 2019,
    episodes: 44,
    status: 'ongoing',
    type: 'TV',
    genres: ['Экшен', 'Сёнэн', 'Историческое'],
    description: 'Танджиро становится охотником на демонов, чтобы спасти свою сестру.',
    screenshots: [],
    has4K: true
  },
  {
    id: '5',
    title: 'One Piece',
    titleRu: 'Ван Пис',
    poster: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop',
    rating: 9.2,
    year: 1999,
    episodes: 1000,
    status: 'ongoing',
    type: 'TV',
    genres: ['Приключения', 'Экшен', 'Комедия'],
    description: 'Пират Луффи ищет легендарный клад One Piece.',
    screenshots: [],
    has4K: false
  },
  {
    id: '6',
    title: 'My Hero Academia',
    titleRu: 'Моя геройская академия',
    poster: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop',
    rating: 8.5,
    year: 2016,
    episodes: 138,
    status: 'ongoing',
    type: 'TV',
    genres: ['Экшен', 'Школа', 'Супергерои'],
    description: 'В мире, где у людей есть суперсилы, мальчик без способностей мечтает стать героем.',
    screenshots: [],
    has4K: true
  },
  {
    id: '7',
    title: 'Spirited Away',
    titleRu: 'Унесённые призраками',
    poster: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop',
    rating: 9.3,
    year: 2001,
    episodes: 1,
    status: 'completed',
    type: 'Movie',
    genres: ['Приключения', 'Семейный', 'Фэнтези'],
    description: 'Девочка попадает в мир духов и должна найти способ вернуться домой.',
    screenshots: [],
    has4K: true
  },
  {
    id: '8',
    title: 'Death Note',
    titleRu: 'Тетрадь смерти',
    poster: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop',
    rating: 9.0,
    year: 2006,
    episodes: 37,
    status: 'completed',
    type: 'TV',
    genres: ['Психологический', 'Детектив', 'Триллер'],
    description: 'Студент находит тетрадь, которая может убивать людей.',
    screenshots: [],
    has4K: false
  },
  {
    id: '9',
    title: 'Naruto',
    titleRu: 'Наруто',
    poster: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop',
    rating: 8.3,
    year: 2002,
    episodes: 720,
    status: 'completed',
    type: 'TV',
    genres: ['Экшен', 'Боевые искусства', 'Сёнэн'],
    description: 'Молодой ниндзя мечтает стать лидером своей деревни.',
    screenshots: [],
    has4K: false
  },
  {
    id: '10',
    title: 'Princess Mononoke',
    titleRu: 'Принцесса Мононоке',
    poster: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop',
    rating: 8.4,
    year: 1997,
    episodes: 1,
    status: 'completed',
    type: 'Movie',
    genres: ['Приключения', 'Драма', 'Фэнтези'],
    description: 'Принц пытается найти лекарство от проклятия в борьбе между людьми и лесными духами.',
    screenshots: [],
    has4K: true
  }
];

export const collections: Collection[] = [
  {
    id: '1',
    name: 'Сейчас смотрят',
    animes: ['1', '2', '3', '4', '5']
  },
  {
    id: '2',
    name: 'Доступно в 4K',
    animes: ['1', '2', '4', '6', '7', '10']
  },
  {
    id: '3',
    name: 'Романтика от ВИ',
    animes: ['1', '2']
  },
  {
    id: '4',
    name: 'Sword Art Online (Кайфовое аниме)',
    animes: ['3', '4', '5']
  },
  {
    id: '5',
    name: 'Смотри артем',
    animes: ['6', '7', '8']
  },
  {
    id: '6',
    name: 'The best',
    animes: ['7', '8', '9']
  }
];

export const genres = [
  'Экшен', 'Приключения', 'Комедия', 'Драма', 'Фэнтези', 'Романтика',
  'Триллер', 'Хоррор', 'Школа', 'Сёнэн', 'Боевые искусства', 'Психологический',
  'Детектив', 'Историческое', 'Семейный', 'Супергерои', 'Фантастика'
];