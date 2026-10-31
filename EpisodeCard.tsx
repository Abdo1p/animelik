import React from 'react';
import { Play, Clock } from 'lucide-react';
import { Anime, Episode } from '../types/anime';

interface EpisodeCardProps {
  anime: Anime;
  episode: Episode;
  timeAgo?: string;
  onPlayEpisode: (anime: Anime, episode: Episode) => void;
}

export const EpisodeCard: React.FC<EpisodeCardProps> = ({
  anime,
  episode,
  timeAgo,
  onPlayEpisode,
}) => {
  return (
    <div 
      onClick={() => onPlayEpisode(anime, episode)}
      className="group relative flex flex-col bg-[#161822] border border-[#252835] hover:border-[#e50914]/60 rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-1 shadow-md hover:shadow-xl cursor-pointer"
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#1f2230]">
        <img
          src={episode.thumbnail || anime.backdrop || anime.poster}
          alt={`${anime.titleArabic} - الحلقة ${episode.episodeNumber}`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = anime.poster;
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

        {/* Hover Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="w-11 h-11 rounded-full bg-[#e50914] text-white flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform">
            <Play className="w-5 h-5 fill-current mr-0.5" />
          </div>
        </div>

        {/* Episode Number Badge (Top Right) */}
        <div className="absolute top-2 right-2">
          <span className="px-2.5 py-0.5 rounded-md bg-[#e50914] text-white font-extrabold text-xs shadow-md">
            الحلقة {episode.episodeNumber}
          </span>
        </div>

        {/* Duration (Top Left) */}
        <div className="absolute top-2 left-2">
          <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-xs text-gray-300 font-medium text-[11px]">
            {episode.duration || '24 دقيقة'}
          </span>
        </div>

        {/* Time Ago (Bottom Right) */}
        {timeAgo && (
          <div className="absolute bottom-2 right-2 flex items-center gap-1 text-[11px] text-gray-300 bg-black/70 px-2 py-0.5 rounded backdrop-blur-xs">
            <Clock className="w-3 h-3 text-[#e50914]" />
            <span>{timeAgo}</span>
          </div>
        )}
      </div>

      {/* Episode Info */}
      <div className="p-3 text-right">
        <h4 
          className="text-sm font-bold text-gray-100 group-hover:text-[#ff3847] transition-colors truncate"
          title={`${anime.titleArabic} - الحلقة ${episode.episodeNumber}`}
        >
          {anime.titleArabic}
        </h4>
        <p className="text-xs text-gray-400 mt-1 truncate">
          {episode.title ? episode.title : `الحلقة ${episode.episodeNumber} مترجمة`}
        </p>
      </div>
    </div>
  );
};
