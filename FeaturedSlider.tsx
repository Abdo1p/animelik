import React, { useState, useEffect } from 'react';
import { Play, Star, ChevronRight, ChevronLeft, Calendar, Tv } from 'lucide-react';
import { Anime } from '../types/anime';

interface FeaturedSliderProps {
  featuredAnime: Anime[];
  onSelectAnime: (anime: Anime) => void;
  onPlayEpisode: (anime: Anime, epIndex?: number) => void;
}

export const FeaturedSlider: React.FC<FeaturedSliderProps> = ({
  featuredAnime,
  onSelectAnime,
  onPlayEpisode,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 6 seconds
  useEffect(() => {
    if (featuredAnime.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredAnime.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [featuredAnime.length]);

  if (!featuredAnime.length) return null;

  const current = featuredAnime[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? featuredAnime.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredAnime.length);
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <div className="relative rounded-2xl overflow-hidden bg-[#161822] border border-[#262a38] shadow-2xl">
        {/* Vertical Title Badge on the right edge (authentic Animerco signature!) */}
        <div className="hidden lg:flex absolute right-0 top-0 bottom-0 w-11 bg-gradient-to-b from-[#191b26] to-[#12131b] border-l border-[#2c303f] items-center justify-center z-20 pointer-events-none select-none">
          <span className="vertical-title-badge text-[#f1f3f7] font-black text-xs tracking-[0.3em] uppercase opacity-90 drop-shadow">
            أنــــمــــيــــات مــــمــــيــــزة
          </span>
        </div>

        {/* Hero Background Banner with radial gradients */}
        <div className="relative min-h-[420px] md:min-h-[460px] flex items-center lg:pr-14">
          {/* Background Backdrop Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-all duration-700 scale-105"
            style={{ 
              backgroundImage: `url(${current.backdrop || current.poster})`,
            }}
          >
            {/* Dark & Gradient Overlays for readability and Animerco aesthetics */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#14161f] via-[#14161f]/85 to-[#14161f]/60" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#14161f] via-[#14161f]/90 to-transparent" />
            <div className="absolute inset-0 backdrop-blur-[2px]" />
          </div>

          {/* Content Box */}
          <div className="relative z-10 w-full p-6 sm:p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Left/Poster on desktop */}
            <div className="hidden sm:block relative flex-shrink-0 group cursor-pointer" onClick={() => onSelectAnime(current)}>
              <div className="w-48 md:w-56 aspect-[2/3] rounded-xl overflow-hidden shadow-2xl shadow-black/80 border-2 border-[#313645] relative transition-transform duration-300 group-hover:scale-105">
                <img
                  src={current.poster}
                  alt={current.titleArabic}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#e50914] text-white flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                    <Play className="w-6 h-6 fill-current mr-0.5" />
                  </div>
                </div>

                {/* Score badge on poster */}
                <div className="absolute top-2 right-2 px-2 py-1 rounded-md bg-black/80 backdrop-blur-md border border-amber-500/40 text-amber-400 font-bold text-xs flex items-center gap-1 shadow-md">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{current.rating}</span>
                </div>
              </div>
            </div>

            {/* Right/Info block */}
            <div className="flex-1 text-right space-y-4 max-w-2xl">
              {/* Badges row */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-[#e50914] text-white text-xs font-bold shadow-md shadow-[#e50914]/30">
                  مميز الآن
                </span>
                <span className="px-2.5 py-1 rounded-md bg-[#242836] border border-[#313749] text-gray-200 text-xs font-semibold flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-sky-400" />
                  <span>{current.releaseYear}</span>
                </span>
                <span className="px-2.5 py-1 rounded-md bg-[#242836] border border-[#313749] text-gray-200 text-xs font-semibold flex items-center gap-1">
                  <Tv className="w-3 h-3 text-emerald-400" />
                  <span>{current.seasonName}</span>
                </span>
                <span className="px-2.5 py-1 rounded-md bg-[#242836] border border-[#313749] text-amber-300 text-xs font-bold flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  <span>{current.rating} / 10</span>
                </span>
              </div>

              {/* Title */}
              <div>
                <h1 
                  onClick={() => onSelectAnime(current)}
                  className="text-2xl sm:text-3xl md:text-4xl font-black text-white hover:text-[#ff3847] transition-colors cursor-pointer leading-tight"
                >
                  {current.titleArabic}
                </h1>
                <p className="text-sm text-gray-400 font-medium mt-1">
                  {current.titleEnglish} {current.titleJapanese && `• ${current.titleJapanese}`}
                </p>
              </div>

              {/* Story / Synopsis */}
              <p className="text-sm md:text-base text-gray-300 line-clamp-3 leading-relaxed">
                {current.story}
              </p>

              {/* Genres Chips */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {current.genres.map((genre) => (
                  <span
                    key={genre}
                    className="px-2.5 py-0.5 rounded-full bg-[#1e222e] border border-[#2d3243] text-gray-300 text-xs font-medium hover:border-[#e50914] hover:text-[#e50914] transition-colors cursor-pointer"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onPlayEpisode(current, 0)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#e50914] to-[#f92e3c] hover:from-[#c2050f] hover:to-[#e50914] text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-[#e50914]/30 hover:scale-[1.02] transition-all"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>مشاهدة الحلقة الأولى</span>
                </button>

                <button
                  onClick={() => onSelectAnime(current)}
                  className="px-5 py-3 rounded-xl bg-[#202431] hover:bg-[#282d3d] border border-[#2f3547] text-gray-200 hover:text-white font-bold text-sm transition-all"
                >
                  تفاصيل الأنمي والمواسم
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2">
            <button
              onClick={handlePrev}
              title="السابق"
              className="w-9 h-9 rounded-lg bg-black/60 hover:bg-[#e50914] border border-white/10 text-white flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="text-xs font-bold text-gray-300 px-1 bg-black/40 py-1 rounded">
              {currentIndex + 1} / {featuredAnime.length}
            </div>
            <button
              onClick={handleNext}
              title="التالي"
              className="w-9 h-9 rounded-lg bg-black/60 hover:bg-[#e50914] border border-white/10 text-white flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Thumbnail Dots Bar */}
        <div className="bg-[#11131a] border-t border-[#222634] px-4 py-2 flex items-center justify-center gap-1.5 overflow-x-auto">
          {featuredAnime.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'w-8 bg-[#e50914]' : 'w-2 bg-[#2d3243] hover:bg-gray-500'
              }`}
              title={item.titleArabic}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
