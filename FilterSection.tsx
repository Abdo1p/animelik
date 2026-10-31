import React from 'react';
import { Filter, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { FilterState, AnimeType, AnimeStatus } from '../types/anime';
import { ALL_GENRES, SEASONS_LIST } from '../data/animeData';

interface FilterSectionProps {
  filter: FilterState;
  onChange: (updated: Partial<FilterState>) => void;
  onReset: () => void;
  totalResults: number;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  filter,
  onChange,
  onReset,
  totalResults,
}) => {
  return (
    <div className="rounded-2xl bg-[#161822] border border-[#262a38] p-4 sm:p-5 shadow-lg space-y-4">
      {/* Title & Reset */}
      <div className="flex items-center justify-between border-b border-[#252836] pb-3">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-[#e50914]" />
          <h3 className="text-sm font-bold text-white">فلترة وتصفية الأنمي</h3>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400">
            النتائج: <strong className="text-white">{totalResults}</strong>
          </span>
          <button
            onClick={onReset}
            className="text-xs text-[#e50914] hover:underline font-semibold"
          >
            إعادة تعيين
          </button>
        </div>
      </div>

      {/* Selectors Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs">
        {/* Type */}
        <div className="space-y-1 text-right">
          <label className="text-gray-400 font-medium">النوع:</label>
          <select
            value={filter.type}
            onChange={(e) => onChange({ type: e.target.value as any })}
            className="w-full bg-[#1e222e] border border-[#2c3243] text-white rounded-lg px-2.5 py-2 focus:outline-none focus:border-[#e50914]"
          >
            <option value="all">جميع الأنواع</option>
            <option value="tv">مسلسلات تلفزيونية (TV)</option>
            <option value="movie">أفلام أنمي (Movie)</option>
          </select>
        </div>

        {/* Status */}
        <div className="space-y-1 text-right">
          <label className="text-gray-400 font-medium">الحالة:</label>
          <select
            value={filter.status}
            onChange={(e) => onChange({ status: e.target.value as any })}
            className="w-full bg-[#1e222e] border border-[#2c3243] text-white rounded-lg px-2.5 py-2 focus:outline-none focus:border-[#e50914]"
          >
            <option value="all">جميع الحالات</option>
            <option value="ongoing">مستمر (يعرض حالياً)</option>
            <option value="completed">مكتمل</option>
          </select>
        </div>

        {/* Genre */}
        <div className="space-y-1 text-right">
          <label className="text-gray-400 font-medium">التصنيف:</label>
          <select
            value={filter.genre}
            onChange={(e) => onChange({ genre: e.target.value })}
            className="w-full bg-[#1e222e] border border-[#2c3243] text-white rounded-lg px-2.5 py-2 focus:outline-none focus:border-[#e50914]"
          >
            <option value="all">جميع التصنيفات</option>
            {ALL_GENRES.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        {/* Season */}
        <div className="space-y-1 text-right">
          <label className="text-gray-400 font-medium">الموسم:</label>
          <select
            value={filter.season}
            onChange={(e) => onChange({ season: e.target.value })}
            className="w-full bg-[#1e222e] border border-[#2c3243] text-white rounded-lg px-2.5 py-2 focus:outline-none focus:border-[#e50914]"
          >
            <option value="all">جميع المواسم</option>
            {SEASONS_LIST.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div className="space-y-1 text-right">
          <label className="text-gray-400 font-medium">ترتيب حسب:</label>
          <select
            value={filter.sortBy}
            onChange={(e) => onChange({ sortBy: e.target.value as any })}
            className="w-full bg-[#1e222e] border border-[#2c3243] text-white rounded-lg px-2.5 py-2 focus:outline-none focus:border-[#e50914]"
          >
            <option value="latest">الأحدث إضافة</option>
            <option value="rating">الأعلى تقييماً</option>
            <option value="popular">الأكثر شعبية ومشاهدة</option>
            <option value="episodes">عدد الحلقات</option>
          </select>
        </div>
      </div>
    </div>
  );
};
