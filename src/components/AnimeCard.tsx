import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiStar, FiPlay, FiCalendar, FiTv } from 'react-icons/fi';

// TYPES INTERNAL - Tidak perlu import dari luar
interface AnimeCardAnime {
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

interface AnimeCardProps {
  anime: AnimeCardAnime;
  index: number;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ anime, index }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = 'https://placehold.co/300x400/1e293b/94a3b8?text=Anime+Image';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.02 }}
      className="h-full"
    >
      <Link 
        to={`/anime/${encodeURIComponent(anime.url)}`}
        className="block h-full"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <div className="group relative overflow-hidden rounded-xl bg-gradient-to-b from-dark-800 to-dark-900 border border-dark-700 h-full flex flex-col transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/30">
          
          {/* Image Container */}
          <div className="relative aspect-[3/4] overflow-hidden flex-shrink-0">
            <img
              src={anime.cover}
              alt={anime.judul}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
              onError={handleImageError}
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent" />
            
            {/* Top Badges */}
            <div className="absolute top-3 left-3 right-3 z-10 flex justify-between">
              {anime.lastup && (
                <span className="px-3 py-1.5 text-xs font-bold bg-primary-600 rounded-lg shadow-lg animate-pulse">
                  {anime.lastup}
                </span>
              )}
              
              {anime.score && (
                <span className="px-3 py-1.5 text-xs font-bold bg-yellow-600/90 rounded-lg shadow-lg flex items-center">
                  <FiStar className="mr-1" size={12} />
                  {parseFloat(anime.score).toFixed(1)}
                </span>
              )}
            </div>
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
              <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center shadow-2xl">
                <FiPlay className="text-white text-2xl ml-1" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 flex-grow flex flex-col">
            {/* Title */}
            <h3 className="font-bold text-lg mb-3 line-clamp-2 group-hover:text-primary-400 transition-colors flex-grow">
              {anime.judul}
            </h3>

            {/* Info Row */}
            <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
              {anime.status && (
                <div className="flex items-center space-x-2">
                  <FiTv size={14} />
                  <span className={`font-medium ${
                    anime.status === 'Ongoing' ? 'text-green-400' : 'text-blue-400'
                  }`}>
                    {anime.status}
                  </span>
                </div>
              )}
              
              {anime.rilis && (
                <div className="flex items-center space-x-1">
                  <FiCalendar size={14} />
                  <span>{anime.rilis.split(',')[0]}</span>
                </div>
              )}
            </div>

            {/* Episode Count */}
            {anime.total_episode && (
              <div className="mb-3">
                <span className="text-sm text-gray-400">
                  <span className="text-primary-300 font-medium">{anime.total_episode}</span> episodes
                </span>
              </div>
            )}

            {/* Genres */}
            {anime.genre && anime.genre.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {anime.genre.slice(0, 2).map((genre, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 text-xs bg-dark-700 rounded border border-dark-600"
                  >
                    {genre}
                  </span>
                ))}
                {anime.genre.length > 2 && (
                  <span className="px-2.5 py-1 text-xs bg-dark-700 rounded border border-dark-600">
                    +{anime.genre.length - 2}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default AnimeCard;
