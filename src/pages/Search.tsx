import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import AnimeCard from '../components/AnimeCard';
import { AnimeCardSkeleton } from '../components/SkeletonLoader';
import { animeAPI } from '../services/api';
import { FiSearch, FiFilter } from 'react-icons/fi';

// TYPES INTERNAL untuk Search
interface SearchAnime {
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

const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  const page = parseInt(searchParams.get('page') || '1');

  const [animeList, setAnimeList] = useState<SearchAnime[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState(query);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const performSearch = useCallback(async () => {
    try {
      setLoading(true);
      const response = await animeAPI.search(query, page);
      if (response.data.data && response.data.data.length > 0) {
        const searchData = response.data.data[0];
        setAnimeList(searchData.result);
        setTotalPages(searchData.pagination.total_pages);
        setTotalResults(searchData.pagination.total);
      } else {
        setAnimeList([]);
      }
    } catch (error) {
      console.error('Error searching anime:', error);
    } finally {
      setLoading(false);
    }
  }, [query, page]);

  useEffect(() => {
    if (query) {
      performSearch();
    }
  }, [query, page, performSearch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchInput)}&page=1`);
    }
  };

  const handlePageChange = (newPage: number) => {
    navigate(`/search?q=${encodeURIComponent(query)}&page=${newPage}`);
  };

  return (
    <div className="min-h-screen bg-dark-900 py-8 px-4">
      <div className="container mx-auto">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Cari Anime</h1>
          
          <form onSubmit={handleSearch} className="max-w-2xl">
            <div className="relative">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Masukkan judul anime..."
                className="w-full px-5 py-3 pl-12 bg-dark-800 border border-dark-600 rounded-xl focus:outline-none focus:border-primary-500 text-white"
              />
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-5 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg font-medium"
              >
                Cari
              </button>
            </div>
          </form>
        </div>

        {/* Results */}
        {query && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">
                {loading ? 'Mencari...' : `Hasil untuk "${query}"`}
              </h2>
              
              {!loading && (
                <div className="flex items-center space-x-2 text-gray-400">
                  <FiFilter />
                  <span>{totalResults} hasil</span>
                </div>
              )}
            </div>

            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {[...Array(10)].map((_, i) => (
                  <AnimeCardSkeleton key={i} />
                ))}
              </div>
            ) : animeList.length > 0 ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                  {animeList.map((anime, index) => (
                    <AnimeCard key={anime.id} anime={anime} index={index} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center space-x-4 mt-8">
                    <button
                      onClick={() => handlePageChange(page - 1)}
                      disabled={page === 1}
                      className="px-4 py-2 bg-dark-800 rounded-lg disabled:opacity-50"
                    >
                      Previous
                    </button>
                    
                    <span className="text-gray-400">
                      Page {page} of {totalPages}
                    </span>
                    
                    <button
                      onClick={() => handlePageChange(page + 1)}
                      disabled={page === totalPages}
                      className="px-4 py-2 bg-dark-800 rounded-lg disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400">Tidak ada hasil ditemukan</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
