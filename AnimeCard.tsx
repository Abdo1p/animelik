import React from 'react';
import { Play, Star, Bookmark, Check } from 'lucide-react';
import { Anime } from '../types/anime';

interface AnimeCardProps {
  anime: Anime;
  onSelect: (anime: Anime) => void;
  onPlay?: (anime: Anime) => void;
  isWatchlisted?: boolean;
  onToggleWatchlist?: (anime: Anime) => void;
  badgeText?: string;
}

export const AnimeCard: React.FC<AnimeCardProps> = ({
  anime,
  onSelect,
  onPlay,
  isWatchlisted = false,
  onToggleWatchlist,
  badgeText,
}) => {
  return (
    <div className="group relative flex flex-col transition-all duration-200">
      {/* Poster Image Container */}
      <div 
        onClick={() => onSelect(anime)}
        className="relative aspect-[2/3] w-full rounded-xl overflow-hidden bg-[#181a24] border border-[#272b38] shadow-md group-hover:shadow-xl group-hover:border-[#e50914]/50 group-hover:scale-[1.02] transition-all duration-300 cursor-pointer"
      >
        <img
          src={anime.poster}
          alt={anime.titleArabic}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            // fallback if needed
            (e.target as HTMLImageElement).src = 'https://image.tmdb.org/t/p/w500/fUs9KMgEJj3wYJGa75MtPSdyJXk.jpg';
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 opacity-70 group-hover:opacity-90 transition-opacity" />

        {/* Hover Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-12 h-12 rounded-full bg-[#e50914] text-white flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform">
            <Play className="w-5 h-5 fill-current mr-0.5" />
          </div>
        </div>

        {/* Top Badges */}
        <div className="absolute top-2 inset-x-2 flex items-center justify-between pointer-events-none">
          {/* Rating */}
          <div className="px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-sm border border-amber-500/30 text-amber-300 font-bold text-[11px] flex items-center gap-1 shadow">
            <Star className="w-3 h-3 fill-current" />
            <span>{anime.rating}</span>
          </div>

          {/* Type / Season Badge */}
          <span className="px-2 py-0.5 rounded-md bg-[#e50914] text-white font-bold text-[10px] shadow">
            {badgeText || (anime.type === 'movie' ? 'فيلم' : anime.seasonName || `${anime.releaseYear}`)}
          </span>
        </div>

        {/* Bottom Year and Episodes count */}
        <div className="absolute bottom-2 inset-x-2 flex items-center justify-between text-[11px] text-gray-300 font-medium pointer-events-none">
          <span className="bg-black/70 px-1.5 py-0.5 rounded backdrop-blur-xs">
            {anime.releaseYear}
          </span>
          <span className="bg-black/70 px-1.5 py-0.5 rounded backdrop-blur-xs">
            {anime.type === 'movie' ? 'فيلم كامل' : `${anime.episodesCount} حلقة`}
          </span>
        </div>
      </div>

      {/* Title & Info */}
      <div className="mt-2.5 flex items-start justify-between gap-1 text-right">
        <div className="flex-1 min-w-0">
          <h3
            onClick={() => onSelect(anime)}
            className="text-sm font-bold text-gray-100 group-hover:text-[#ff3847] transition-colors truncate cursor-pointer"
            title={anime.titleArabic}
          >
            {anime.titleArabic}
          </h3>
          <p className="text-[11px] text-gray-400 truncate mt-0.5" title={anime.titleEnglish}>
            {anime.titleEnglish}
          </p>
        </div>

        {/* Watchlist Bookmark Icon */}
        {onToggleWatchlist && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWatchlist(anime);
            }}
            title={isWatchlisted ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
            className={`p-1.5 rounded-md border transition-colors mt-0.5 ${
              isWatchlisted
                ? 'bg-[#e50914] border-[#e50914] text-white'
                : 'bg-[#1b1e28] border-[#292e3c] text-gray-400 hover:text-white hover:border-gray-500'
            }`}
          >
            {isWatchlisted ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
          </button>
        )}
      </div>
    </div>
  );
};
