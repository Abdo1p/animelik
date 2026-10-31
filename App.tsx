import React, { useState, useEffect, useMemo } from 'react';
import { 
  Header 
} from './components/Header';
import { 
  Footer 
} from './components/Footer';
import { 
  FeaturedSlider 
} from './components/FeaturedSlider';
import { 
  AnimeCard 
} from './components/AnimeCard';
import { 
  EpisodeCard 
} from './components/EpisodeCard';
import { 
  VideoPlayer 
} from './components/VideoPlayer';
import { 
  EpisodeSidebar 
} from './components/EpisodeSidebar';
import { 
  DownloadSection 
} from './components/DownloadSection';
import { 
  SearchModal 
} from './components/SearchModal';
import { 
  ScheduleView 
} from './components/ScheduleView';
import { 
  FilterSection 
} from './components/FilterSection';
import { 
  AnimeDetailView 
} from './components/AnimeDetailView';
import { 
  AuthModal 
} from './components/AuthModal';
import { 
  ReportModal 
} from './components/ReportModal';
import { 
  CommentsSection 
} from './components/CommentsSection';
import { 
  ContactPage 
} from './components/ContactPage';
import { 
  ANIME_DATABASE, 
  getLatestEpisodes, 
  WEEKLY_SCHEDULE,
  SEASONS_LIST
} from './data/animeData';
import { Anime, Episode, FilterState } from './types/anime';
import { 
  Play, 
  Sparkles, 
  Pin, 
  Clock, 
  Film, 
  Tv, 
  Calendar, 
  Bookmark, 
  ChevronLeft, 
  ArrowLeft,
  Flame,
  CheckCircle2,
  Trash2
} from 'lucide-react';

export default function App() {
  // Navigation & View State
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedSeasonFilter, setSelectedSeasonFilter] = useState<string>('');
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);
  const [activeEpisode, setActiveEpisode] = useState<Episode | null>(null);

  // Modals
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

  // Theme
  const [isDark, setIsDark] = useState<boolean>(() => {
    return localStorage.getItem('animelik_theme') !== 'light';
  });

  // Watchlist & History
  const [watchlist, setWatchlist] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('animelik_watchlist') || '[]');
    } catch {
      return [];
    }
  });

  const [watchedEpisodes, setWatchedEpisodes] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('animelik_watched') || '[]');
    } catch {
      return [];
    }
  });

  // User auth state
  const [user, setUser] = useState<{ name: string; email: string } | null>(() => {
    try {
      const saved = localStorage.getItem('animelik_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Filter State
  const defaultFilter: FilterState = {
    searchQuery: '',
    type: 'all',
    genre: 'all',
    status: 'all',
    year: 'all',
    season: 'all',
    sortBy: 'latest',
  };
  const [filter, setFilter] = useState<FilterState>(defaultFilter);

  // Sync theme to document
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('animelik_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('animelik_theme', 'light');
    }
  }, [isDark]);

  // Sync watchlist to localStorage
  useEffect(() => {
    localStorage.setItem('animelik_watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  // Sync watched episodes
  useEffect(() => {
    localStorage.setItem('animelik_watched', JSON.stringify(watchedEpisodes));
  }, [watchedEpisodes]);

  // Toggle watchlist
  const handleToggleWatchlist = (anime: Anime) => {
    setWatchlist((prev) => {
      if (prev.includes(anime.id)) {
        return prev.filter((id) => id !== anime.id);
      } else {
        return [...prev, anime.id];
      }
    });
  };

  // Mark episode watched
  const markEpisodeWatched = (episodeId: string) => {
    if (!watchedEpisodes.includes(episodeId)) {
      setWatchedEpisodes((prev) => [...prev, episodeId]);
    }
  };

  // Login handler
  const handleLoginSuccess = (userData: { name: string; email: string }) => {
    setUser(userData);
    localStorage.setItem('animelik_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('animelik_user');
  };

  // Navigation router
  const handleNavigate = (tab: string, param?: any) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (tab === 'season') {
      setSelectedSeasonFilter(param || 'صيف 2024');
      setCurrentTab(`season-${param || 'صيف 2024'}`);
      setFilter({ ...defaultFilter, season: param || 'صيف 2024' });
      return;
    }

    if (tab === 'movies') {
      setFilter({ ...defaultFilter, type: 'movie' });
    } else if (tab === 'library-animes') {
      setFilter({ ...defaultFilter, type: 'tv' });
    } else {
      setFilter(defaultFilter);
    }

    setCurrentTab(tab);
  };

  // Select Anime to view details
  const handleSelectAnime = (anime: Anime) => {
    setSelectedAnime(anime);
    setCurrentTab('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Select Anime by ID
  const handleSelectAnimeById = (id: string) => {
    const found = ANIME_DATABASE.find((a) => a.id === id);
    if (found) {
      handleSelectAnime(found);
    }
  };

  // Play Episode
  const handlePlayEpisode = (anime: Anime, episode?: Episode | number) => {
    setSelectedAnime(anime);
    let targetEp: Episode | undefined;

    if (typeof episode === 'number') {
      targetEp = anime.seasons[0]?.episodes[episode] || anime.seasons[0]?.episodes[0];
    } else if (episode) {
      targetEp = episode;
    } else {
      targetEp = anime.seasons[0]?.episodes[0];
    }

    if (targetEp) {
      setActiveEpisode(targetEp);
      markEpisodeWatched(targetEp.id);
      setCurrentTab('watch');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Prev / Next Episode navigation
  const currentSeason = selectedAnime?.seasons.find((s) =>
    s.episodes.some((e) => e.id === activeEpisode?.id)
  ) || selectedAnime?.seasons[0];

  const currentEpIndex = currentSeason?.episodes.findIndex((e) => e.id === activeEpisode?.id) ?? -1;

  const handlePrevEp = currentSeason && currentEpIndex > 0 ? () => {
    const prev = currentSeason.episodes[currentEpIndex - 1];
    setActiveEpisode(prev);
    markEpisodeWatched(prev.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } : undefined;

  const handleNextEp = currentSeason && currentEpIndex >= 0 && currentEpIndex < currentSeason.episodes.length - 1 ? () => {
    const next = currentSeason.episodes[currentEpIndex + 1];
    setActiveEpisode(next);
    markEpisodeWatched(next.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } : undefined;

  // Filtered anime list for catalog views
  const filteredAnimeList = useMemo(() => {
    return ANIME_DATABASE.filter((anime) => {
      // Type
      if (filter.type !== 'all' && anime.type !== filter.type) return false;
      // Status
      if (filter.status !== 'all' && anime.status !== filter.status) return false;
      // Genre
      if (filter.genre !== 'all' && !anime.genres.includes(filter.genre)) return false;
      // Season
      if (filter.season !== 'all' && anime.seasonName !== filter.season) return false;
      // Year
      if (filter.year !== 'all' && anime.releaseYear !== filter.year) return false;
      // Search
      if (filter.searchQuery.trim()) {
        const q = filter.searchQuery.toLowerCase().trim();
        const matches =
          anime.titleArabic.toLowerCase().includes(q) ||
          anime.titleEnglish.toLowerCase().includes(q) ||
          anime.story.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    }).sort((a, b) => {
      if (filter.sortBy === 'rating') return b.rating - a.rating;
      if (filter.sortBy === 'popular') return b.votesCount - a.votesCount;
      if (filter.sortBy === 'episodes') return b.episodesCount - a.episodesCount;
      return b.releaseYear - a.releaseYear;
    });
  }, [filter]);

  // Data sets for Home Page (matching Animerco!)
  const featuredList = useMemo(() => ANIME_DATABASE.filter((a) => a.isFeatured), []);
  const pinnedList = useMemo(() => ANIME_DATABASE.filter((a) => a.isPinned), []);
  const latestEpisodes = useMemo(() => getLatestEpisodes(), []);
  const latestMovies = useMemo(() => ANIME_DATABASE.filter((a) => a.type === 'movie'), []);
  const watchlistAnime = useMemo(
    () => ANIME_DATABASE.filter((a) => watchlist.includes(a.id)),
    [watchlist]
  );

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? 'bg-[#121318] text-[#c9cbd1]' : 'bg-[#f4f5f9] text-[#2b2d35]'}`}>
      {/* Header */}
      <Header
        currentTab={currentTab}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        isDark={isDark}
        toggleTheme={() => setIsDark(!isDark)}
        watchlistCount={watchlist.length}
        user={user}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* VIEW 1: HOME PAGE (Authentic Animerco Clone!) */}
        {currentTab === 'home' && (
          <div className="space-y-12 pb-16">
            {/* 1. Featured Slider with Vertical Title */}
            <FeaturedSlider
              featuredAnime={featuredList}
              onSelectAnime={handleSelectAnime}
              onPlayEpisode={(anime) => handlePlayEpisode(anime, 0)}
            />

            {/* 2. Pinned Anime (الأنميات المثبتة) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
              <div className="flex items-center justify-between border-b border-[#252836] pb-3">
                <div className="flex items-center gap-2">
                  <Pin className="w-5 h-5 text-[#e50914] rotate-45" />
                  <h2 className="text-xl sm:text-2xl font-black text-white">الأنميات المثبتة</h2>
                </div>
                <button
                  onClick={() => handleNavigate('library-animes')}
                  className="text-xs text-[#e50914] hover:text-[#ff3847] font-bold flex items-center gap-1 transition-colors"
                >
                  <span>عرض الكل</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {pinnedList.slice(0, 6).map((anime) => (
                  <AnimeCard
                    key={anime.id}
                    anime={anime}
                    onSelect={handleSelectAnime}
                    badgeText={anime.seasons[0]?.title || anime.seasonName}
                    isWatchlisted={watchlist.includes(anime.id)}
                    onToggleWatchlist={handleToggleWatchlist}
                  />
                ))}
              </div>
            </section>

            {/* 3. Latest Episodes Added (آخر الحلقات المضافة - Animerco Heartbeat!) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
              <div className="flex items-center justify-between border-b border-[#252836] pb-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#e50914]" />
                  <h2 className="text-xl sm:text-2xl font-black text-white">آخر الحلقات المضافة</h2>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold hidden sm:inline">
                    تحديث فوري
                  </span>
                </div>
                <button
                  onClick={() => handleNavigate('library-episodes')}
                  className="text-xs text-[#e50914] hover:text-[#ff3847] font-bold flex items-center gap-1 transition-colors"
                >
                  <span>قائمة الحلقات</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {latestEpisodes.slice(0, 12).map((item, idx) => (
                  <EpisodeCard
                    key={idx}
                    anime={item.anime}
                    episode={item.episode}
                    timeAgo={item.timeAgo}
                    onPlayEpisode={handlePlayEpisode}
                  />
                ))}
              </div>
            </section>

            {/* 4. Latest Added Anime (آخر الأنميات المضافة) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
              <div className="flex items-center justify-between border-b border-[#252836] pb-3">
                <div className="flex items-center gap-2">
                  <Tv className="w-5 h-5 text-[#e50914]" />
                  <h2 className="text-xl sm:text-2xl font-black text-white">آخر الأنميات المضافة</h2>
                </div>
                <button
                  onClick={() => handleNavigate('library-animes')}
                  className="text-xs text-[#e50914] hover:text-[#ff3847] font-bold flex items-center gap-1 transition-colors"
                >
                  <span>مكتبة الأنمي كاملة</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {ANIME_DATABASE.filter((a) => a.type === 'tv').slice(0, 12).map((anime) => (
                  <AnimeCard
                    key={anime.id}
                    anime={anime}
                    onSelect={handleSelectAnime}
                    isWatchlisted={watchlist.includes(anime.id)}
                    onToggleWatchlist={handleToggleWatchlist}
                  />
                ))}
              </div>
            </section>

            {/* 5. Latest Movies (آخر الأفلام المضافة) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
              <div className="flex items-center justify-between border-b border-[#252836] pb-3">
                <div className="flex items-center gap-2">
                  <Film className="w-5 h-5 text-[#e50914]" />
                  <h2 className="text-xl sm:text-2xl font-black text-white">آخر الأفلام المضافة</h2>
                </div>
                <button
                  onClick={() => handleNavigate('movies')}
                  className="text-xs text-[#e50914] hover:text-[#ff3847] font-bold flex items-center gap-1 transition-colors"
                >
                  <span>قائمة كل الأفلام</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {latestMovies.map((anime) => (
                  <AnimeCard
                    key={anime.id}
                    anime={anime}
                    onSelect={handleSelectAnime}
                    badgeText="فيلم كامل"
                    isWatchlisted={watchlist.includes(anime.id)}
                    onToggleWatchlist={handleToggleWatchlist}
                  />
                ))}
              </div>
            </section>

            {/* 6. Weekly Schedule Preview Banner */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="rounded-2xl bg-gradient-to-r from-[#171924] via-[#1f2231] to-[#171924] border border-[#2b3040] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                <div className="text-right space-y-2">
                  <span className="px-3 py-1 rounded-md bg-[#e50914] text-white font-bold text-xs">
                    جدول الحلقات
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    لا تفوت موعد حلقات أنمياتك المفضلة!
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400">
                    تابع مواعيد البث الأسبوعية الرسمية لجميع الأنميات المستمرة أولاً بأول.
                  </p>
                </div>

                <button
                  onClick={() => handleNavigate('schedule')}
                  className="px-6 py-3 rounded-xl bg-[#e50914] hover:bg-[#c2050f] text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-[#e50914]/25 whitespace-nowrap transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>عرض جدول المواعيد كاملاً</span>
                </button>
              </div>
            </section>
          </div>
        )}

        {/* VIEW 2: EPISODE STREAMING / WATCH PAGE */}
        {currentTab === 'watch' && selectedAnime && activeEpisode && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-xs text-gray-400 flex-wrap">
              <button onClick={() => handleNavigate('home')} className="hover:text-white transition-colors">
                الرئيسية
              </button>
              <span>/</span>
              <button onClick={() => handleNavigate('library-animes')} className="hover:text-white transition-colors">
                قائمة الأنميات
              </button>
              <span>/</span>
              <button onClick={() => handleSelectAnime(selectedAnime)} className="hover:text-[#e50914] font-semibold transition-colors">
                {selectedAnime.titleArabic}
              </button>
              <span>/</span>
              <span className="text-white font-bold">الحلقة {activeEpisode.episodeNumber}</span>
            </div>

            {/* Video Player + Episodes Sidebar Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
              {/* Player Main Area */}
              <div className="lg:col-span-3 space-y-6">
                <VideoPlayer
                  anime={selectedAnime}
                  episode={activeEpisode}
                  onPrevEpisode={handlePrevEp}
                  onNextEpisode={handleNextEp}
                  onOpenReport={() => setIsReportOpen(true)}
                  onOpenDownload={() => {
                    const downloadElem = document.getElementById('download-section');
                    downloadElem?.scrollIntoView({ behavior: 'smooth' });
                  }}
                />

                {/* Download Section */}
                <div id="download-section">
                  <DownloadSection
                    downloads={activeEpisode.downloads}
                    episodeNumber={activeEpisode.episodeNumber}
                    animeTitle={selectedAnime.titleArabic}
                  />
                </div>

                {/* Anime Quick Details Bar */}
                <div className="rounded-2xl bg-[#161822] border border-[#272a38] p-5 shadow-xl flex flex-col sm:flex-row items-center gap-5 text-right">
                  <img
                    src={selectedAnime.poster}
                    alt={selectedAnime.titleArabic}
                    className="w-20 aspect-[2/3] rounded-xl object-cover border border-[#2e3444] shadow-md flex-shrink-0"
                  />
                  <div className="flex-1 space-y-2">
                    <h3 
                      onClick={() => handleSelectAnime(selectedAnime)}
                      className="text-lg font-bold text-white hover:text-[#ff3847] transition-colors cursor-pointer"
                    >
                      {selectedAnime.titleArabic}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
                      {selectedAnime.story}
                    </p>
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {selectedAnime.genres.map((g) => (
                        <span key={g} className="px-2 py-0.5 rounded-full bg-[#1e222e] text-[11px] text-gray-300">
                          {g}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Comments Section */}
                <CommentsSection
                  targetId={activeEpisode.id}
                  targetTitle={`${selectedAnime.titleArabic} - الحلقة ${activeEpisode.episodeNumber}`}
                  user={user}
                  onOpenAuth={() => setIsAuthOpen(true)}
                />
              </div>

              {/* Episodes Sidebar on the Left (in RTL layout) */}
              <div className="lg:col-span-1">
                <EpisodeSidebar
                  anime={selectedAnime}
                  activeEpisode={activeEpisode}
                  onSelectEpisode={(ep) => {
                    setActiveEpisode(ep);
                    markEpisodeWatched(ep.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  watchedEpisodes={watchedEpisodes}
                />
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: ANIME DETAIL PAGE */}
        {currentTab === 'detail' && selectedAnime && (
          <AnimeDetailView
            anime={selectedAnime}
            allAnime={ANIME_DATABASE}
            onPlayEpisode={(anime, ep) => handlePlayEpisode(anime, ep)}
            onSelectAnime={handleSelectAnime}
            isWatchlisted={watchlist.includes(selectedAnime.id)}
            onToggleWatchlist={handleToggleWatchlist}
            user={user}
            onOpenAuth={() => setIsAuthOpen(true)}
          />
        )}

        {/* VIEW 4: CATALOG & FILTERED VIEWS (Movies, Library, Season) */}
        {(currentTab === 'movies' ||
          currentTab === 'library-animes' ||
          currentTab === 'library-seasons' ||
          currentTab.startsWith('season-')) && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            {/* Section Banner Header */}
            <div className="border-b border-[#252836] pb-4">
              <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2.5">
                {currentTab === 'movies' && <Film className="w-7 h-7 text-[#e50914]" />}
                {currentTab === 'library-animes' && <Tv className="w-7 h-7 text-[#e50914]" />}
                {currentTab.startsWith('season-') && <Sparkles className="w-7 h-7 text-[#e50914]" />}
                <span>
                  {currentTab === 'movies' && 'قائمة أفلام الأنمي المترجمة'}
                  {currentTab === 'library-animes' && 'مكتبة مسلسلات الأنمي'}
                  {currentTab === 'library-seasons' && 'قائمة مواسم الأنمي'}
                  {currentTab.startsWith('season-') && `أنميات موسم ${selectedSeasonFilter}`}
                </span>
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                تصفح وشاهد أحدث الإصدارات بجودة فائقة Full HD مع خيارات ترجمة وتحميل سريعة
              </p>
            </div>

            {/* Filter Section */}
            <FilterSection
              filter={filter}
              onChange={(updated) => setFilter({ ...filter, ...updated })}
              onReset={() => setFilter(defaultFilter)}
              totalResults={filteredAnimeList.length}
            />

            {/* Anime Grid */}
            {filteredAnimeList.length === 0 ? (
              <div className="text-center py-20 bg-[#161822] rounded-2xl border border-[#252836] p-8 space-y-3">
                <Film className="w-12 h-12 text-gray-600 mx-auto" />
                <h3 className="text-lg font-bold text-white">لم يتم العثور على أنميات تطابق خيارات الفلترة</h3>
                <p className="text-xs text-gray-400">يرجى تجربة تصنيف أو موسم آخر أو إعادة تعيين الفلتر</p>
                <button
                  onClick={() => setFilter(defaultFilter)}
                  className="px-4 py-2 bg-[#e50914] text-white rounded-lg text-xs font-bold"
                >
                  إعادة تعيين الفلاتر
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {filteredAnimeList.map((anime) => (
                  <AnimeCard
                    key={anime.id}
                    anime={anime}
                    onSelect={handleSelectAnime}
                    isWatchlisted={watchlist.includes(anime.id)}
                    onToggleWatchlist={handleToggleWatchlist}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* VIEW 5: EPISODES CATALOG */}
        {currentTab === 'library-episodes' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            <div className="border-b border-[#252836] pb-4">
              <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2.5">
                <Clock className="w-7 h-7 text-[#e50914]" />
                <span>أحدث حلقات الأنمي المضافة</span>
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                جميع الحلقات الجديدة المترجمة فور نزولها في اليابان
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {latestEpisodes.map((item, idx) => (
                <EpisodeCard
                  key={idx}
                  anime={item.anime}
                  episode={item.episode}
                  timeAgo={item.timeAgo}
                  onPlayEpisode={handlePlayEpisode}
                />
              ))}
            </div>
          </div>
        )}

        {/* VIEW 6: WEEKLY SCHEDULE */}
        {currentTab === 'schedule' && (
          <ScheduleView onSelectAnimeById={handleSelectAnimeById} />
        )}

        {/* VIEW 7: WATCHLIST & SAVED */}
        {currentTab === 'watchlist' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[#252836] pb-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2.5">
                  <Bookmark className="w-7 h-7 text-[#e50914]" />
                  <span>قائمتي والمفضلة</span>
                </h1>
                <p className="text-sm text-gray-400 mt-1">
                  الأنميات والأفلام التي قمت بحفظها للرجوع إليها ومتابعتها لاحقاً
                </p>
              </div>

              {watchlistAnime.length > 0 && (
                <button
                  onClick={() => {
                    if (confirm('هل تريد حقاً مسح قائمة المفضلة بالكامل؟')) {
                      setWatchlist([]);
                    }
                  }}
                  className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>مسح المفضلة</span>
                </button>
              )}
            </div>

            {watchlistAnime.length === 0 ? (
              <div className="text-center py-20 bg-[#161822] rounded-2xl border border-[#252836] p-8 space-y-3">
                <Bookmark className="w-12 h-12 text-gray-600 mx-auto" />
                <h3 className="text-lg font-bold text-white">قائمة المفضلة فارغة حالياً</h3>
                <p className="text-xs text-gray-400">
                  اضغط على أيقونة المفضلة بجانب أي أنمي لإضافته إلى قائمتك هنا
                </p>
                <button
                  onClick={() => handleNavigate('home')}
                  className="px-5 py-2.5 bg-[#e50914] text-white rounded-xl text-xs font-bold inline-block"
                >
                  تصفح الأنميات
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {watchlistAnime.map((anime) => (
                  <AnimeCard
                    key={anime.id}
                    anime={anime}
                    onSelect={handleSelectAnime}
                    isWatchlisted={true}
                    onToggleWatchlist={handleToggleWatchlist}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* VIEW 8: CONTACT & DMCA PAGE */}
        {currentTab === 'contact' && <ContactPage />}
      </main>

      {/* Footer with animelik brand & ownership */}
      <Footer onNavigate={handleNavigate} />

      {/* Global Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        animeList={ANIME_DATABASE}
        onSelectAnime={handleSelectAnime}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {selectedAnime && activeEpisode && (
        <ReportModal
          isOpen={isReportOpen}
          onClose={() => setIsReportOpen(false)}
          animeTitle={selectedAnime.titleArabic}
          episodeNumber={activeEpisode.episodeNumber}
        />
      )}
    </div>
  );
}
