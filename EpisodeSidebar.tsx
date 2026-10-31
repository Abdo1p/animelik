import React, { useState, useMemo } from 'react';
import { Search, Play, CheckCircle2, Film } from 'lucide-react';
import { Anime, Episode } from '../types/anime';

interface EpisodeSidebarProps {
  anime: Anime;
  activeEpisode: Episode;
  onSelectEpisode: (episode: Episode) => void;
  watchedEpisodes?: string[];
}

export const EpisodeSidebar: React.FC<EpisodeSidebarProps> = ({
  anime,
  activeEpisode,
  onSelectEpisode,
  watchedEpisodes = [],
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeasonId, setSelectedSeasonId] = useState(
    anime.seasons[0]?.id || ''
  );

  // Active season episodes
  const currentSeason = anime.seasons.find((s) => s.id === selectedSeasonId) || anime.seasons[0];
  const episodes = currentSeason?.episodes || [];

  // Filter episodes by search number or title
  const filteredEpisodes = useMemo(() => {
    if (!searchTerm.trim()) return episodes;
    return episodes.filter(
      (ep) =>
        ep.episodeNumber.toString().includes(searchTerm.trim()) ||
        ep.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [episodes, searchTerm]);

  return (
    <div className="w-full bg-[#161822] border border-[#272a38] rounded-2xl overflow-hidden flex flex-col h-[520px] shadow-xl">
      {/* Header */}
      <div className="p-3.5 bg-[#1b1e2a] border-b border-[#292d3c] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Film className="w-4 h-4 text-[#e50914]" />
          <h3 className="text-white font-bold text-sm">قائمة الحلقات</h3>
        </div>
        <span className="text-xs px-2 py-0.5 rounded bg-black/40 text-gray-400 font-semibold">
          {episodes.length} حلقة
        </span>
      </div>

      {/* Season Selector (if more than 1 season) */}
      {anime.seasons.length > 1 && (
        <div className="p-2 border-b border-[#252836] bg-[#14161f]">
          <select
            value={selectedSeasonId}
            onChange={(e) => setSelectedSeasonId(e.target.value)}
            className="w-full bg-[#1e222e] border border-[#2e3445] text-white text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#e50914]"
          >
            {anime.seasons.map((season) => (
              <option key={season.id} value={season.id}>
                {season.title} ({season.episodesCount} حلقة)
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Search Input inside sidebar */}
      <div className="p-2.5 border-b border-[#252836]">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="البحث عن حلقة (مثال: 5)"
            className="w-full bg-[#12131a] border border-[#272b38] rounded-lg pr-8 pl-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#e50914]"
          />
          <Search className="w-3.5 h-3.5 text-gray-500 absolute right-2.5 top-2.5" />
        </div>
      </div>

      {/* Episodes List Scrollable */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {filteredEpisodes.length === 0 ? (
          <div className="text-center py-10 text-xs text-gray-500">
            لم يتم العثور على حلقة بهذا الرقم
          </div>
        ) : (
          filteredEpisodes.map((ep) => {
            const isActive = activeEpisode.id === ep.id;
            const isWatched = watchedEpisodes.includes(ep.id);

            return (
              <button
                key={ep.id}
                onClick={() => onSelectEpisode(ep)}
                className={`w-full text-right px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${
                  isActive
                    ? 'bg-[#e50914] text-white shadow-md shadow-[#e50914]/25 scale-[1.01]'
                    : 'bg-[#1b1e28] hover:bg-[#232734] text-gray-300 hover:text-white border border-[#252936]'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-[#13151d] text-gray-400'
                  }`}>
                    {ep.episodeNumber}
                  </div>
                  <span className="truncate">
                    {ep.title || `الحلقة ${ep.episodeNumber}`}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0 mr-2">
                  {isWatched && (
                    <span title="تمت المشاهدة" className="text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </span>
                  )}
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    isActive ? 'bg-white text-[#e50914]' : 'bg-[#13151d] text-gray-400'
                  }`}>
                    <Play className="w-3 h-3 fill-current mr-0.5" />
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};
