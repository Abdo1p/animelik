import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Star, Calendar, ArrowLeft, Film, Tv } from 'lucide-react';
import { Anime } from '../types/anime';
import { ALL_GENRES } from '../data/animeData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  animeList: Anime[];
  onSelectAnime: (anime: Anime) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  animeList,
  onSelectAnime,
}) => {
  const [query, setQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setSelectedGenre(null);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Filter items
  const filtered = animeList.filter((anime) => {
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q ||
      anime.titleArabic.toLowerCase().includes(q) ||
      anime.titleEnglish.toLowerCase().includes(q) ||
      (anime.titleJapanese && anime.titleJapanese.toLowerCase().includes(q)) ||
      anime.story.toLowerCase().includes(q);

    const matchesGenre = !selectedGenre || anime.genres.includes(selectedGenre);

    return matchesQuery && matchesGenre;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-14 sm:pt-20 px-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl bg-[#161822] border border-[#2b2f3e] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header & Search Form */}
        <div className="p-4 sm:p-5 border-b border-[#262a38] bg-[#1a1c26]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-bold text-sm flex items-center gap-2">
              <Search className="w-4 h-4 text-[#e50914]" />
              <span>بحث سريع في مكتبة animelik</span>
            </h3>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-[#252836] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="اكتب اسم الأنمي، الفيلم، الشخصية أو التصنيف..."
              className="w-full bg-[#12131a] border border-[#2c3140] rounded-xl pr-11 pl-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#e50914] shadow-inner"
            />
            <Search className="w-5 h-5 text-gray-400 absolute right-3.5 top-3.5" />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute left-3 top-3 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Genres tags */}
          <div className="flex items-center gap-1.5 mt-3 overflow-x-auto pb-1 pt-1 no-scrollbar">
            <button
              onClick={() => setSelectedGenre(null)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedGenre === null
                  ? 'bg-[#e50914] text-white'
                  : 'bg-[#222532] text-gray-400 hover:text-white'
              }`}
            >
              الكل
            </button>
            {ALL_GENRES.slice(0, 8).map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(selectedGenre === genre ? null : genre)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedGenre === genre
                    ? 'bg-[#e50914] text-white'
                    : 'bg-[#222532] text-gray-400 hover:text-white'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* Results Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filtered.length === 0 ? (
            <div className="text-center py-14 space-y-2">
              <Film className="w-10 h-10 text-gray-600 mx-auto" />
              <p className="text-sm font-semibold text-gray-300">لم يتم العثور على نتائج تطابق بحثك</p>
              <p className="text-xs text-gray-500">جرب كتابة الاسم باللغة الإنجليزية أو العربية</p>
            </div>
          ) : (
            filtered.map((anime) => (
              <div
                key={anime.id}
                onClick={() => {
                  onSelectAnime(anime);
                  onClose();
                }}
                className="p-2.5 rounded-xl bg-[#1b1d28] hover:bg-[#232736] border border-[#252938] hover:border-[#e50914]/50 transition-all flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-16 rounded-lg overflow-hidden bg-black flex-shrink-0 border border-[#2c303f]">
                    <img
                      src={anime.poster}
                      alt={anime.titleArabic}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      loading="lazy"
                    />
                  </div>

                  <div className="min-w-0 text-right space-y-1">
                    <h4 className="text-sm font-bold text-white group-hover:text-[#ff3847] transition-colors truncate">
                      {anime.titleArabic}
                    </h4>
                    <p className="text-xs text-gray-400 truncate">
                      {anime.titleEnglish}
                    </p>
                    <div className="flex items-center gap-2 text-[11px] text-gray-400">
                      <span className="flex items-center gap-0.5 text-amber-300 font-bold">
                        <Star className="w-3 h-3 fill-current" />
                        {anime.rating}
                      </span>
                      <span>•</span>
                      <span>{anime.releaseYear}</span>
                      <span>•</span>
                      <span className="text-[#e50914] font-semibold">
                        {anime.type === 'movie' ? 'فيلم' : anime.seasonName}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center mr-2 text-gray-500 group-hover:text-[#e50914] transition-colors">
                  <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-[#13141c] border-t border-[#232634] flex items-center justify-between text-xs text-gray-500">
          <span>نتائج البحث: {filtered.length} عمل</span>
          <span>اضغط Esc للإغلاق</span>
        </div>
      </div>
    </div>
  );
};
