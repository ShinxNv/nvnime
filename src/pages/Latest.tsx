import React, { useState, useEffect, useCallback } from 'react';
import AnimeCard from '../components/AnimeCard';
import { AnimeCardSkeleton } from '../components/SkeletonLoader';
import { animeAPI } from '../services/api';
import { FiRefreshCw } from 'react-icons/fi';

// TYPES INTERNAL untuk Latest
interface LatestAnime {
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

const Latest: React.FC = () => {
  const [latestAnime, setLatestAnime] = useState<LatestAnime[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchLatestAnime = useCallback(async () => {
    try {
      setLoading(true);
      const response = await animeAPI.getLatest(page);
      if (page === 1) {
        setLatestAnime(response.data);
      } else {
        setLatestAnime(prev => [...prev, ...response.data]);
      }
      
      if (response.data.length < 20) {
        setHasMore(false);
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

  const refresh = () => {
    setPage(1);
    setLatestAnime([]);
    setHasMore(true);
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-dark-900 py-8 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Anime Terbaru</h1>
            <p className="text-gray-400">Update anime terbaru setiap hari</p>
          </div>
          <button
            onClick={refresh}
            disabled={loading}
            className="flex items-center space-x-2 px-4 py-2 bg-dark-800 rounded-lg disabled:opacity-50"
          >
            <FiRefreshCw className={loading ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Anime Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-3 gap-6">
          {latestAnime.map((anime, index) => (
            <AnimeCard key={`${anime.id}-${index}`} anime={anime} index={index} />
          ))}
          
          {loading && (
            [...Array(10)].map((_, i) => (
              <AnimeCardSkeleton key={`skeleton-${i}`} />
            ))
          )}
        </div>

        {/* Load More Button */}
        {hasMore && latestAnime.length > 0 && (
          <div className="flex justify-center mt-8">
            <button
              onClick={loadMore}
              disabled={loading}
              className="px-6 py-3 bg-primary-600 hover:bg-primary-700 rounded-lg font-medium disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Latest;
