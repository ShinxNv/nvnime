// Ganti 'any' dengan tipe yang lebih spesifik atau gunakan unknown

export interface Anime {
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

export interface AnimeDetail {
  id: number;
  series_id: string;
  bookmark: string | null; // Ganti any dengan string | null
  cover: string;
  judul: string;
  type: string;
  countdown: string | null; // Ganti any dengan string | null
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
  chapter: Chapter[];
}

export interface Chapter {
  id: number;
  ch: string;
  url: string;
  date: string;
  history: string;
  lastDurasi: number | null; // Ganti any dengan number | null
  fullDurasi: number | null; // Ganti any dengan number | null
}

export interface Movie {
  id: number;
  url: string;
  judul: string;
  cover: string;
  lastch: string;
  lastup: string;
}

export interface VideoStream {
  reso: string;
  link: string;
  provide: number;
  id: number;
}

export interface VideoData {
  episode_id: number;
  likeCount: number;
  dislikeCount: number;
  userLikeStatus: number;
  reso: string[];
  stream: VideoStream[];
}

export interface SearchResponse {
  data: {
    jumlah: number;
    result: Anime[];
    pagination: {
      page: number;
      per_page: number;
      total: number;
      total_pages: number;
      has_next: boolean;
      next_page: string;
      next_offset: string;
    };
  }[];
}

export interface ApiResponse<T> {
  data: T;
}
