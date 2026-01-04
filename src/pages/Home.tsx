import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import AnimeCard from '../components/AnimeCard';
import { AnimeCardSkeleton } from '../components/SkeletonLoader';
import { animeAPI } from '../services/api';
import { FiTrendingUp, FiClock, FiStar, FiFilm } from 'react-icons/fi';
import { Link } from 'react-router-dom';

// TYPES INTERNAL untuk Home
interface HomeAnime {
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

const Home: React.FC = () => {
  const [latestAnime, setLatestAnime] = useState<HomeAnime[]>([]);
  const [featuredAnime, setFeaturedAnime] = useState<HomeAnime[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const fetchLatestAnime = useCallback(async () => {
    try {
      setLoading(true);
      const response = await animeAPI.getLatest(page);
      setLatestAnime(response.data);
      
      if (page === 1) {
        setFeaturedAnime(response.data.slice(0, 5));
      }
    } catch (error) {
      console.error('Error fetching latest anime:', error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchLatestAnime();
  }, [fetchLatestAnime]);

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Hero Section */}
      <section className="relative py-12 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/20 to-purple-900/20" />
        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r nvrg">
                Jelajahi Dunia
              </span>
              <br />
              <span className="text-white">Anime Tanpa Batas</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl">
              Temukan anime terbaru, movie populer, dan streaming dengan kualitas terbaik.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Anime */}
      {featuredAnime.length > 0 && (
        <section className="py-8 px-4">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Featured Anime</h2>
              <Link to="/latest" className="text-primary-400 hover:text-primary-300 transition-colors">
                Lihat Semua →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {featuredAnime.map((anime, index) => (
                <AnimeCard key={anime.id} anime={anime} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest Anime */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-white">Anime Terbaru</h2>
          
          {loading && page === 1 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
              {[...Array(10)].map((_, i) => (
                <AnimeCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-e lg:grid-cols-3 gap-6">
                {latestAnime.map((anime, index) => (
                  <AnimeCard key={`${anime.id}-${index}`} anime={anime} index={index} />
                ))}
              </div>
              
              <div className="flex justify-center mt-8">
                <button
                  onClick={loadMore}
                  disabled={loading}
                  className="px-6 py-3 bg-primary-600 hover:bg-primary-700 rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  {loading ? 'Loading...' : 'Load More'}
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
