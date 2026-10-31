import React, { useState } from 'react';
import { Calendar, Clock, Play, Tv } from 'lucide-react';
import { WEEKLY_SCHEDULE } from '../data/animeData';
import { Anime } from '../types/anime';

interface ScheduleViewProps {
  onSelectAnimeById: (id: string) => void;
}

export const ScheduleView: React.FC<ScheduleViewProps> = ({ onSelectAnimeById }) => {
  // Current arabic day
  const daysMap = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
  const todayArabic = daysMap[new Date().getDay()] || 'السبت';

  const [activeDay, setActiveDay] = useState<string>(todayArabic);

  const currentDaySchedule = WEEKLY_SCHEDULE.find((d) => d.day === activeDay) || WEEKLY_SCHEDULE[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#252836] pb-4">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center gap-2.5">
            <Calendar className="w-6 h-6 text-[#e50914]" />
            <span>جدول مواعيد نزول حلقات الأنمي الأسبوعية</span>
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            تابع مواعيد وتوقيت بث الحلقات الجديدة مباشرة أولاً بأول حسب توقيت مكة المكرمة
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-gray-300">يتم التحديث تلقائياً فور نزول الحلقة</span>
        </div>
      </div>

      {/* Days Tabs Row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {WEEKLY_SCHEDULE.map((item) => {
          const isActive = activeDay === item.day;
          const isToday = item.day === todayArabic;

          return (
            <button
              key={item.day}
              onClick={() => setActiveDay(item.day)}
              className={`px-4 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap transition-all flex items-center gap-2 ${
                isActive
                  ? 'bg-[#e50914] text-white shadow-lg shadow-[#e50914]/25 scale-105'
                  : 'bg-[#181a24] hover:bg-[#222533] text-gray-300 hover:text-white border border-[#272a38]'
              }`}
            >
              <span>{item.day}</span>
              {isToday && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-extrabold ${
                  isActive ? 'bg-white text-[#e50914]' : 'bg-emerald-500 text-white'
                }`}>
                  اليوم
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Grid of Anime for selected day */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentDaySchedule.animes.map((anime, idx) => (
          <div
            key={idx}
            onClick={() => onSelectAnimeById(anime.id)}
            className="group p-3 rounded-2xl bg-[#161822] hover:bg-[#1f2230] border border-[#252835] hover:border-[#e50914]/50 transition-all duration-200 cursor-pointer shadow-md flex items-center gap-3"
          >
            {/* Poster Thumbnail */}
            <div className="w-16 h-22 rounded-xl overflow-hidden bg-black flex-shrink-0 relative border border-[#2a2e3d]">
              <img
                src={anime.poster}
                alt={anime.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/0 transition-colors flex items-center justify-center">
                <div className="w-7 h-7 rounded-full bg-[#e50914] text-white flex items-center justify-center shadow opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="w-3.5 h-3.5 fill-current mr-0.5" />
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 text-right space-y-1.5">
              <h4 className="text-sm font-bold text-white group-hover:text-[#ff3847] transition-colors truncate">
                {anime.title}
              </h4>
              <div className="inline-block px-2 py-0.5 rounded bg-[#e50914]/15 border border-[#e50914]/30 text-[#ff4b58] font-bold text-xs">
                {anime.ep}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-mono">{anime.time} م</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
