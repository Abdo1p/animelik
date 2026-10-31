import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Moon, 
  Sun, 
  User, 
  Menu, 
  X, 
  ChevronDown, 
  Film, 
  Tv, 
  Calendar, 
  Bookmark, 
  Mail, 
  Sparkles,
  LogOut,
  Download
} from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  onNavigate: (tab: string, param?: any) => void;
  onOpenSearch: () => void;
  onOpenAuth: () => void;
  isDark: boolean;
  toggleTheme: () => void;
  watchlistCount: number;
  user: { name: string; email: string } | null;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate,
  onOpenSearch,
  onOpenAuth,
  isDark,
  toggleTheme,
  watchlistCount,
  user,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [libraryDropdownOpen, setLibraryDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-200 border-b ${
        isScrolled 
          ? 'bg-[#121318]/95 backdrop-blur-md border-[#262933] shadow-lg shadow-black/40' 
          : 'bg-[#14161d] border-[#22252e]'
      }`}
    >
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => {
                onNavigate('home');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 group text-right focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#b7060f] to-[#ff2b38] flex items-center justify-center shadow-lg shadow-[#e50914]/25 group-hover:scale-105 transition-transform">
                <span className="text-white font-black text-xl tracking-tighter">AL</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-white group-hover:text-[#ff3847] transition-colors flex items-center gap-1.5">
                  anime<span className="text-[#e50914]">lik</span>
                </span>
                <span className="text-[10px] text-gray-400 font-medium -mt-1 tracking-wider">
                  أنمي ليك • عالم الأنمي المترجم
                </span>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 mr-6">
              <button
                onClick={() => onNavigate('home')}
                className={`px-3 py-1.5 text-sm font-semibold rounded-md transition-colors ${
                  currentTab === 'home'
                    ? 'text-white bg-[#e50914]'
                    : 'text-gray-300 hover:text-white hover:bg-[#1f222b]'
                }`}
              >
                الرئيسية
              </button>

              <button
                onClick={() => onNavigate('movies')}
                className={`px-3 py-1.5 text-sm font-semibold rounded-md transition-colors ${
                  currentTab === 'movies'
                    ? 'text-white bg-[#e50914]'
                    : 'text-gray-300 hover:text-white hover:bg-[#1f222b]'
                }`}
              >
                قائمة الأفلام
              </button>

              {/* Anime Library Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setLibraryDropdownOpen(!libraryDropdownOpen)}
                  onBlur={() => setTimeout(() => setLibraryDropdownOpen(false), 200)}
                  className={`px-3 py-1.5 text-sm font-semibold rounded-md transition-colors flex items-center gap-1 ${
                    currentTab.startsWith('library')
                      ? 'text-white bg-[#e50914]'
                      : 'text-gray-300 hover:text-white hover:bg-[#1f222b]'
                  }`}
                >
                  <span>مكتبة الأنمي</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                </button>

                {libraryDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg bg-[#191b22] border border-[#2b2f3a] shadow-xl py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <button
                      onClick={() => {
                        onNavigate('library-animes');
                        setLibraryDropdownOpen(false);
                      }}
                      className="w-full text-right px-4 py-2 text-sm text-gray-200 hover:bg-[#252934] hover:text-[#e50914] flex items-center justify-between"
                    >
                      <span>قائمة الأنميات</span>
                      <Tv className="w-4 h-4 opacity-50" />
                    </button>
                    <button
                      onClick={() => {
                        onNavigate('library-seasons');
                        setLibraryDropdownOpen(false);
                      }}
                      className="w-full text-right px-4 py-2 text-sm text-gray-200 hover:bg-[#252934] hover:text-[#e50914] flex items-center justify-between"
                    >
                      <span>قائمة المواسم</span>
                      <Sparkles className="w-4 h-4 opacity-50" />
                    </button>
                    <button
                      onClick={() => {
                        onNavigate('library-episodes');
                        setLibraryDropdownOpen(false);
                      }}
                      className="w-full text-right px-4 py-2 text-sm text-gray-200 hover:bg-[#252934] hover:text-[#e50914] flex items-center justify-between"
                    >
                      <span>قائمة الحلقات</span>
                      <Film className="w-4 h-4 opacity-50" />
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={() => onNavigate('season', 'صيف 2024')}
                className={`px-3 py-1.5 text-sm font-semibold rounded-md transition-colors ${
                  currentTab === 'season-صيف 2024'
                    ? 'text-white bg-[#e50914]'
                    : 'text-gray-300 hover:text-white hover:bg-[#1f222b]'
                }`}
              >
                صيف 2024
              </button>

              <button
                onClick={() => onNavigate('season', 'ربيع 2024')}
                className={`px-3 py-1.5 text-sm font-semibold rounded-md transition-colors ${
                  currentTab === 'season-ربيع 2024'
                    ? 'text-white bg-[#e50914]'
                    : 'text-gray-300 hover:text-white hover:bg-[#1f222b]'
                }`}
              >
                ربيع 2024
              </button>

              <button
                onClick={() => onNavigate('schedule')}
                className={`px-3 py-1.5 text-sm font-semibold rounded-md transition-colors flex items-center gap-1.5 ${
                  currentTab === 'schedule'
                    ? 'text-white bg-[#e50914]'
                    : 'text-gray-300 hover:text-white hover:bg-[#1f222b]'
                }`}
              >
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                <span>مواعيد الحلقات</span>
              </button>

              <button
                onClick={() => onNavigate('watchlist')}
                className={`px-3 py-1.5 text-sm font-semibold rounded-md transition-colors flex items-center gap-1.5 relative ${
                  currentTab === 'watchlist'
                    ? 'text-white bg-[#e50914]'
                    : 'text-gray-300 hover:text-white hover:bg-[#1f222b]'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5 text-amber-400" />
                <span>المفضلة</span>
                {watchlistCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-[#e50914] text-white text-[10px] font-bold flex items-center justify-center">
                    {watchlistCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className={`px-3 py-1.5 text-sm font-semibold rounded-md transition-colors ${
                  currentTab === 'contact'
                    ? 'text-white bg-[#e50914]'
                    : 'text-gray-300 hover:text-white hover:bg-[#1f222b]'
                }`}
              >
                اتصل بنا
              </button>
            </nav>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Button */}
            <button
              onClick={onOpenSearch}
              title="بحث سريع"
              className="p-2 sm:px-3 sm:py-2 text-gray-300 hover:text-white bg-[#1a1c24] hover:bg-[#232631] border border-[#272b36] rounded-lg transition-all flex items-center gap-2 text-sm group"
            >
              <Search className="w-4 h-4 text-[#e50914] group-hover:scale-110 transition-transform" />
              <span className="hidden md:inline font-medium text-xs text-gray-400">بحث عن أنمي أو فيلم...</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] bg-[#121318] text-gray-500 rounded border border-[#2b2e3a]">
                Ctrl+K
              </kbd>
            </button>

            {/* ZIP Download Button */}
            <a
              href="/animelik.zip"
              download="animelik.zip"
              title="تحميل كود المشروع الكامل (ZIP)"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 border border-emerald-500/40 rounded-lg shadow-md shadow-emerald-900/30 transition-all hover:scale-105"
            >
              <Download className="w-3.5 h-3.5" />
              <span>تحميل ZIP</span>
            </a>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              title={isDark ? 'الوضع النهاري' : 'الوضع الليلي'}
              className="p-2 text-gray-300 hover:text-white bg-[#1a1c24] hover:bg-[#232631] border border-[#272b36] rounded-lg transition-colors"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-sky-400" />}
            </button>

            {/* User Account Menu */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                onBlur={() => setTimeout(() => setUserMenuOpen(false), 200)}
                title="الحساب"
                className="p-2 text-gray-300 hover:text-white bg-[#1a1c24] hover:bg-[#232631] border border-[#272b36] rounded-lg transition-colors flex items-center gap-1.5"
              >
                <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-[10px] font-bold text-white">
                  {user ? user.name.slice(0, 1).toUpperCase() : <User className="w-3.5 h-3.5" />}
                </div>
                {user && (
                  <span className="hidden sm:inline text-xs font-semibold max-w-[80px] truncate text-gray-200">
                    {user.name}
                  </span>
                )}
              </button>

              {userMenuOpen && (
                <div className="absolute left-0 mt-2 w-52 rounded-lg bg-[#191b22] border border-[#2b2f3a] shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  {user ? (
                    <>
                      <div className="px-4 py-2 border-b border-[#252834] mb-1">
                        <p className="text-xs font-bold text-white truncate">{user.name}</p>
                        <p className="text-[11px] text-gray-400 truncate">{user.email}</p>
                      </div>
                      <button
                        onClick={() => {
                          onNavigate('watchlist');
                          setUserMenuOpen(false);
                        }}
                        className="w-full text-right px-4 py-2 text-sm text-gray-300 hover:bg-[#232632] hover:text-white flex items-center justify-between"
                      >
                        <span>قائمتي والمفضلة</span>
                        <Bookmark className="w-4 h-4 opacity-50" />
                      </button>
                      <button
                        onClick={() => {
                          onLogout();
                          setUserMenuOpen(false);
                        }}
                        className="w-full text-right px-4 py-2 text-sm text-rose-400 hover:bg-[#232632] flex items-center justify-between"
                      >
                        <span>تسجيل الخروج</span>
                        <LogOut className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          onOpenAuth();
                          setUserMenuOpen(false);
                        }}
                        className="w-full text-right px-4 py-2 text-sm text-gray-300 hover:bg-[#232632] hover:text-white font-medium"
                      >
                        تسجيل الدخول
                      </button>
                      <button
                        onClick={() => {
                          onOpenAuth();
                          setUserMenuOpen(false);
                        }}
                        className="w-full text-right px-4 py-2 text-sm text-[#e50914] hover:bg-[#232632] font-semibold"
                      >
                        إنشاء حساب جديد
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-300 hover:text-white bg-[#1a1c24] hover:bg-[#232631] border border-[#272b36] rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#161820] border-b border-[#262933] px-4 pt-2 pb-5 space-y-1">
          <button
            onClick={() => {
              onNavigate('home');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-right px-3 py-2 rounded-md text-sm font-semibold ${
              currentTab === 'home' ? 'bg-[#e50914] text-white' : 'text-gray-300 hover:bg-[#1f222b]'
            }`}
          >
            الرئيسية
          </button>
          <button
            onClick={() => {
              onNavigate('movies');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-right px-3 py-2 rounded-md text-sm font-semibold ${
              currentTab === 'movies' ? 'bg-[#e50914] text-white' : 'text-gray-300 hover:bg-[#1f222b]'
            }`}
          >
            قائمة الأفلام
          </button>
          <button
            onClick={() => {
              onNavigate('library-animes');
              setMobileMenuOpen(false);
            }}
            className="w-full text-right px-3 py-2 rounded-md text-sm font-semibold text-gray-300 hover:bg-[#1f222b]"
          >
            قائمة الأنميات
          </button>
          <button
            onClick={() => {
              onNavigate('library-seasons');
              setMobileMenuOpen(false);
            }}
            className="w-full text-right px-3 py-2 rounded-md text-sm font-semibold text-gray-300 hover:bg-[#1f222b]"
          >
            قائمة المواسم
          </button>
          <button
            onClick={() => {
              onNavigate('library-episodes');
              setMobileMenuOpen(false);
            }}
            className="w-full text-right px-3 py-2 rounded-md text-sm font-semibold text-gray-300 hover:bg-[#1f222b]"
          >
            قائمة الحلقات
          </button>
          <button
            onClick={() => {
              onNavigate('schedule');
              setMobileMenuOpen(false);
            }}
            className="w-full text-right px-3 py-2 rounded-md text-sm font-semibold text-gray-300 hover:bg-[#1f222b]"
          >
            مواعيد الحلقات
          </button>
          <button
            onClick={() => {
              onNavigate('watchlist');
              setMobileMenuOpen(false);
            }}
            className="w-full text-right px-3 py-2 rounded-md text-sm font-semibold text-gray-300 hover:bg-[#1f222b] flex items-center justify-between"
          >
            <span>المفضلة</span>
            {watchlistCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-[#e50914] text-white text-xs">
                {watchlistCount}
              </span>
            )}
          </button>
          <button
            onClick={() => {
              onNavigate('contact');
              setMobileMenuOpen(false);
            }}
            className="w-full text-right px-3 py-2 rounded-md text-sm font-semibold text-gray-300 hover:bg-[#1f222b]"
          >
            اتصل بنا
          </button>
        </div>
      )}
    </header>
  );
};
