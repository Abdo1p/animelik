import React, { useState } from 'react';
import { 
  Play, 
  Star, 
  Calendar, 
  Clock, 
  Tv, 
  Bookmark, 
  Check, 
  Share2, 
  Film, 
  ChevronRight,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';
import { Anime, Episode } from '../types/anime';
import { CommentsSection } from './CommentsSection';

interface AnimeDetailViewProps {
  anime: Anime;
  allAnime: Anime[];
  onPlayEpisode: (anime: Anime, episode: Episode) => void;
  onSelectAnime: (anime: Anime) => void;
  isWatchlisted: boolean;
  onToggleWatchlist: (anime: Anime) => void;
  user: { name: string; email: string } | null;
  onOpenAuth: () => void;
}

export const AnimeDetailView: React.FC<AnimeDetailViewProps> = ({
  anime,
  allAnime,
  onPlayEpisode,
  onSelectAnime,
  isWatchlisted,
  onToggleWatchlist,
  user,
  onOpenAuth,
}) => {
  const [selectedSeasonId, setSelectedSeasonId] = useState(
    anime.seasons[0]?.id || ''
  );
  const [showTrailer, setShowTrailer] = useState(false);

  const currentSeason = anime.seasons.find((s) => s.id === selectedSeasonId) || anime.seasons[0];
  const episodes = currentSeason?.episodes || [];

  // Similar anime recommendation
  const similar = allAnime
    .filter((a) => a.id !== anime.id && a.genres.some((g) => anime.genres.includes(g)))
    .slice(0, 6);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: anime.titleArabic,
        text: `شاهد ${anime.titleArabic} مترجم على animelik`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('تم نسخ رابط الأنمي إلى الحافظة!');
    }
  };

  return (
    <div className="w-full space-y-10 pb-16">
      {/* Hero Backdrop Banner */}
      <div className="relative min-h-[460px] md:min-h-[500px] flex items-end">
        {/* Backdrop Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${anime.backdrop || anime.poster})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#121318] via-[#121318]/80 to-[#121318]/40" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#121318]/60 to-[#121318]" />
        </div>

        {/* Content Box */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex flex-col md:flex-row items-center md:items-end gap-8 text-right">
          {/* Poster */}
          <div className="w-52 sm:w-60 md:w-64 aspect-[2/3] rounded-2xl overflow-hidden bg-black shadow-2xl border-2 border-[#2f3547] flex-shrink-0 group relative">
            <img
              src={anime.poster}
              alt={anime.titleArabic}
              className="w-full h-full object-cover"
            />
            {episodes[0] && (
              <div 
                onClick={() => onPlayEpisode(anime, episodes[0])}
                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full bg-[#e50914] text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                  <Play className="w-7 h-7 fill-current mr-1" />
                </div>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex-1 space-y-4">
            {/* Meta tags */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-md bg-[#e50914] text-white font-black text-xs shadow-md">
                {anime.type === 'movie' ? 'فيلم أنمي' : 'مسلسل أنمي'}
              </span>
              <span className="px-3 py-1 rounded-md bg-[#1f2230] border border-[#2d3243] text-gray-200 text-xs font-bold flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-sky-400" />
                <span>{anime.releaseYear}</span>
              </span>
              <span className="px-3 py-1 rounded-md bg-[#1f2230] border border-[#2d3243] text-gray-200 text-xs font-bold flex items-center gap-1">
                <Tv className="w-3.5 h-3.5 text-emerald-400" />
                <span>{anime.seasonName}</span>
              </span>
              <span className="px-3 py-1 rounded-md bg-[#1f2230] border border-[#2d3243] text-amber-300 text-xs font-black flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{anime.rating} / 10 ({anime.votesCount.toLocaleString()} تصويت)</span>
              </span>
              <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                anime.status === 'ongoing'
                  ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                  : 'bg-sky-500/10 border border-sky-500/30 text-sky-400'
              }`}>
                {anime.status === 'ongoing' ? 'مستمر' : 'مكتمل'}
              </span>
            </div>

            {/* Titles */}
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                {anime.titleArabic}
              </h1>
              <div className="flex flex-wrap items-center gap-2 text-sm text-gray-400 mt-1 font-medium">
                <span>{anime.titleEnglish}</span>
                {anime.titleJapanese && (
                  <>
                    <span>•</span>
                    <span className="font-sans">{anime.titleJapanese}</span>
                  </>
                )}
                {anime.studio && (
                  <>
                    <span>•</span>
                    <span className="text-gray-300">الاستوديو: {anime.studio}</span>
                  </>
                )}
              </div>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {anime.genres.map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-1 rounded-full bg-[#1e222e] border border-[#2d3345] text-gray-300 text-xs font-semibold hover:border-[#e50914] hover:text-[#e50914] transition-colors cursor-pointer"
                >
                  {genre}
                </span>
              ))}
            </div>

            {/* Story */}
            <div className="bg-[#181a24]/90 backdrop-blur-sm border border-[#262a39] rounded-xl p-4 text-sm text-gray-300 leading-relaxed max-w-3xl">
              <h4 className="text-white font-bold mb-1 flex items-center gap-1.5 text-xs text-[#e50914]">
                <Info className="w-4 h-4" />
                <span>قصة الأنمي:</span>
              </h4>
              <p>{anime.story}</p>
            </div>

            {/* Buttons row */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {episodes[0] && (
                <button
                  onClick={() => onPlayEpisode(anime, episodes[0])}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#e50914] to-[#f92e3c] hover:from-[#c2050f] hover:to-[#e50914] text-white font-bold text-sm flex items-center gap-2 shadow-xl shadow-[#e50914]/30 hover:scale-[1.02] transition-all"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>بدء المشاهدة (الحلقة 1)</span>
                </button>
              )}

              {anime.trailerYoutubeId && (
                <button
                  onClick={() => setShowTrailer(!showTrailer)}
                  className="px-5 py-3 rounded-xl bg-[#202431] hover:bg-[#282d3e] border border-[#2f3547] text-white font-bold text-sm flex items-center gap-2 transition-all"
                >
                  <Film className="w-4 h-4 text-rose-400" />
                  <span>العرض الدعائي (Trailer)</span>
                </button>
              )}

              <button
                onClick={() => onToggleWatchlist(anime)}
                className={`px-4 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all border ${
                  isWatchlisted
                    ? 'bg-[#e50914] border-[#e50914] text-white shadow-md shadow-[#e50914]/25'
                    : 'bg-[#1e222e] border-[#2c3243] text-gray-300 hover:text-white hover:bg-[#272c3d]'
                }`}
              >
                {isWatchlisted ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                <span>{isWatchlisted ? 'في المفضلة' : 'إضافة إلى المفضلة'}</span>
              </button>

              <button
                onClick={handleShare}
                className="p-3 rounded-xl bg-[#1e222e] hover:bg-[#272c3d] border border-[#2c3243] text-gray-300 hover:text-white transition-colors"
                title="مشاركة"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Modal / Embed Container */}
      {showTrailer && anime.trailerYoutubeId && (
        <div className="max-w-4xl mx-auto px-4">
          <div className="rounded-2xl overflow-hidden bg-black border border-[#2d3243] shadow-2xl p-2 relative">
            <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 mb-2">
              <h4 className="text-white font-bold text-sm">العرض التشويقي الرسمي</h4>
              <button
                onClick={() => setShowTrailer(false)}
                className="text-xs text-rose-400 hover:underline font-bold"
              >
                إغلاق
              </button>
            </div>
            <div className="aspect-video w-full rounded-xl overflow-hidden">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${anime.trailerYoutubeId}?autoplay=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}

      {/* Seasons & Episodes Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Seasons switcher tabs */}
        <div className="flex items-center justify-between border-b border-[#252836] pb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#e50914]" />
            <h3 className="text-xl font-black text-white">
              {anime.type === 'movie' ? 'مشاهدة الفيلم' : 'قائمة الحلقات والمواسم'}
            </h3>
          </div>

          {anime.seasons.length > 1 && (
            <div className="flex items-center gap-2">
              {anime.seasons.map((season) => (
                <button
                  key={season.id}
                  onClick={() => setSelectedSeasonId(season.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedSeasonId === season.id
                      ? 'bg-[#e50914] text-white shadow-md shadow-[#e50914]/25'
                      : 'bg-[#1b1e2a] hover:bg-[#232737] text-gray-300 border border-[#282d3d]'
                  }`}
                >
                  {season.title}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Episodes Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {episodes.map((ep) => (
            <div
              key={ep.id}
              onClick={() => onPlayEpisode(anime, ep)}
              className="group rounded-xl bg-[#161822] hover:bg-[#202433] border border-[#252836] hover:border-[#e50914]/60 p-2.5 transition-all duration-200 cursor-pointer shadow-md hover:-translate-y-1 text-right flex flex-col justify-between"
            >
              <div className="aspect-[16/10] w-full rounded-lg overflow-hidden bg-[#1f2230] relative mb-2">
                <img
                  src={ep.thumbnail || anime.poster}
                  alt={ep.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-[#e50914] text-white flex items-center justify-center shadow opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-4 h-4 fill-current mr-0.5" />
                  </div>
                </div>
                <div className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded bg-[#e50914] text-white font-extrabold text-[11px] shadow">
                  {ep.episodeNumber}
                </div>
              </div>

              <div>
                <h5 className="text-xs font-bold text-white group-hover:text-[#ff3847] transition-colors truncate">
                  {ep.title || `الحلقة ${ep.episodeNumber}`}
                </h5>
                <span className="text-[10px] text-gray-400 block mt-0.5 font-mono">
                  {ep.duration}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended / Similar Anime Section */}
      {similar.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 pt-6 border-t border-[#232635]">
          <h3 className="text-xl font-black text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#e50914]" />
            <span>أنميات مشابهة قد تعجبك</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {similar.map((sim) => (
              <div
                key={sim.id}
                onClick={() => {
                  onSelectAnime(sim);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group cursor-pointer space-y-2 text-right"
              >
                <div className="aspect-[2/3] w-full rounded-xl overflow-hidden bg-black border border-[#272b38] group-hover:border-[#e50914] transition-all relative shadow-md">
                  <img
                    src={sim.poster}
                    alt={sim.titleArabic}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    loading="lazy"
                  />
                  <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-amber-300 font-bold text-[10px] flex items-center gap-0.5">
                    <Star className="w-3 h-3 fill-current" />
                    <span>{sim.rating}</span>
                  </div>
                </div>
                <h4 className="text-xs font-bold text-white truncate group-hover:text-[#e50914] transition-colors">
                  {sim.titleArabic}
                </h4>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Comments & Discussions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CommentsSection
          targetId={anime.id}
          targetTitle={anime.titleArabic}
          user={user}
          onOpenAuth={onOpenAuth}
        />
      </div>
    </div>
  );
};
