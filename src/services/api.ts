import axios from 'axios';

// TYPES INTERNAL untuk API
interface ApiAnime {
  id: string;
  url: string;
  judul: string;
  cover: string;
  lastch?: string;
  lastup?: string;
  genre: string[];
  sinopsis?: string;
  studio?: string;
  score?: string;
  status?: string;
  rilis?: string;
  total_episode?: number;
}

interface ApiAnimeDetail {
  id: number;
  series_id: string;
  bookmark: string | null;
  cover: string;
  judul: string;
  type: string;
  countdown: string | null;
  status: string;
  rating: string;
  published: string;
  author: string;
  genre: string[];
  genreurl: string[];
  sinopsis: string;
  history: string[];
  historyDurasi: number[];
  historyDurasiFull: number[];
  chapter: Array<{
    id: number;
    ch: string;
    url: string;
    date: string;
    history: string;
    lastDurasi: number | null;
    fullDurasi: number | null;
  }>;
}

interface ApiMovie {
  id: number;
  url: string;
  judul: string;
  cover: string;
  lastch: string;
  lastup: string;
}

interface ApiVideoStream {
  reso: string;
  link: string;
  provide: number;
  id: number;
}

interface ApiVideoData {
  episode_id: number;
  likeCount: number;
  dislikeCount: number;
  userLikeStatus: number;
  reso: string[];
  stream: ApiVideoStream[];
}

interface ApiSearchResponse {
  data: Array<{
    jumlah: number;
    result: ApiAnime[];
    pagination: {
      page: number;
      per_page: number;
      total: number;
      total_pages: number;
      has_next: boolean;
      next_page: string;
      next_offset: string;
    };
  }>;
}

interface ApiResponse<T> {
  data: T;
}

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Logging untuk debugging
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.status, error.config?.url);
    return Promise.reject(error);
  }
);

export const animeAPI = {
  // Anime terbaru
  getLatest: (page: number = 1) => 
    api.get<ApiAnime[]>(`/anime/latest?page=${page}`),
  
  // Cari anime
  search: (query: string, page: number = 1) => 
    api.get<ApiSearchResponse>(`/anime/search?query=${query}&page=${page}`),
  
  // Detail anime
  getDetail: (urlId: string) => {
    const cleanId = urlId
      .replace(/:/g, '%3A')
      .replace(/\s+/g, '-')
      .toLowerCase();
    
    console.log('Fetching detail for ID:', cleanId);
    return api.get<ApiResponse<ApiAnimeDetail[]>>(`/anime/detail?urlId=${cleanId}`);
  },
  
  // Movie
  getMovies: () => 
    api.get<ApiMovie[]>(`/anime/movie`),
  
  // Video
  getVideo: (chapterUrlId: string, reso: string = '720p') => 
    api.get<ApiResponse<ApiVideoData[]>>(`/anime/getvideo?chapterUrlId=${chapterUrlId}&reso=${reso}`),
};

export default api;
