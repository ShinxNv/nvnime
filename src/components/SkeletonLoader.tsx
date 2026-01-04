import React from 'react';

export const AnimeCardSkeleton: React.FC = () => {
  return (
    <div className="rounded-xl bg-dark-800 border border-dark-700 overflow-hidden animate-pulse">
      <div className="bg-dark-700 aspect-[3/4] w-full"></div>
      <div className="p-4 space-y-3">
        <div className="bg-dark-700 h-6 w-3/4 rounded"></div>
        <div className="flex justify-between">
          <div className="bg-dark-700 h-4 w-16 rounded"></div>
          <div className="bg-dark-700 h-4 w-20 rounded"></div>
        </div>
        <div className="flex gap-2">
          <div className="bg-dark-700 h-6 w-12 rounded"></div>
          <div className="bg-dark-700 h-6 w-12 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export const EpisodeSkeleton: React.FC = () => {
  return (
    <div className="bg-dark-800 border border-dark-700 rounded-lg p-4 space-y-3 animate-pulse">
      <div className="bg-dark-700 h-5 w-1/3 rounded"></div>
      <div className="bg-dark-700 h-4 w-1/4 rounded"></div>
      <div className="bg-dark-700 h-8 w-24 rounded-md"></div>
    </div>
  );
};
