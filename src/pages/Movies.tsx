import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import AnimeCard from '../components/AnimeCard';
import { AnimeCardSkeleton } from '../components/SkeletonLoader';
import { animeAPI } from '../services/api';
import { FiFilm, FiAlertCircle } from 'react-icons/fi';

// Define Movie interface locally to avoid import issues
interface Movie {
  id: number;
  url: string;
  judul: string;
  cover: string;
  lastch: string;
  lastup: string;
}

const Movies: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await animeAPI.getMovies();
      setMovies(response.data);
    } catch (err) {
      console.error('Error fetching movies:', err);
      setError('Gagal memuat data movie. Silakan coba lagi.');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  if (loading) {
    return (
      <div className="min-h-screen py-12 bg-dark-900">
        <div className="container mx-auto px-4">
          {/* Header Skeleton */}
          <div className="flex items-center space-x-4 mb-8 animate-pulse">
            <div className="w-12 h-12 bg-dark-700 rounded-lg"></div>
            <div>
              <div className="w-48 h-8 bg-dark-700 rounded mb-2"></div>
              <div className="w-64 h-4 bg-dark-700 rounded"></div>
            </div>
          </div>

          {/* Movies Grid Skeleton */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
              <AnimeCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 bg-dark-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-4 mb-8"
        >
          <div className="p-3 nvrg rounded-xl shadow-lg">
            <FiFilm className="text-white text-2xl" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">Anime Movies</h1>
            <p className="text-gray-400">Koleksi film anime berkualitas tinggi</p>
          </div>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-xl"
          >
            <div className="flex items-center space-x-3">
              <FiAlertCircle className="text-red-500 text-xl" />
              <div>
                <p className="text-red-400 font-medium">{error}</p>
                <button
                  onClick={fetchMovies}
                  className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium transition-colors"
                >
                  Coba Lagi
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Movies Count */}
        {!error && movies.length > 0 && (
          <div className="mb-6">
            <p className="text-gray-400">
              Menampilkan <span className="text-primary-400 font-semibold">{movies.length}</span> movie
            </p>
          </div>
        )}

        {/* Movies Grid */}
        {movies.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-6"
          >
            {movies.map((movie, index) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <AnimeCard
                  anime={{
                    id: movie.id.toString(),
                    url: movie.url,
                    judul: movie.judul,
                    cover: movie.cover,
                    lastch: movie.lastch,
                    lastup: movie.lastup,
                    genre: [], // Movie tidak punya genre dari API
                    score: '', // Movie tidak punya score dari API
                    status: 'Movie',
                    rilis: '',
                    total_episode: 1, // Movie biasanya 1 episode
                  }}
                  index={index}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : !loading && !error ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-dark-800 rounded-full mb-6">
              <FiFilm className="text-gray-500 text-3xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-300 mb-2">Tidak Ada Movie</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Belum ada movie yang tersedia. Silakan coba lagi nanti atau cek halaman lain.
            </p>
          </motion.div>
        ) : null}

        {/* Refresh Button */}
        {!loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center mt-12"
          >
            <button
              onClick={fetchMovies}
              disabled={loading}
              className="px-6 py-3 bg-dark-800 hover:bg-dark-700 border border-dark-600 rounded-xl font-medium transition-colors disabled:opacity-50 flex items-center space-x-2"
            >
              <FiFilm />
              <span>{loading ? 'Memuat...' : 'Refresh Movies'}</span>
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Movies;
