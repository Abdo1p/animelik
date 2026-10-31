import React from 'react';
import { Send, Twitter, Facebook, Shield, Heart, Film, ArrowUp, Download } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string, param?: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0e0f14] border-t border-[#1e212b] text-gray-400 mt-20 relative">
      {/* Scroll to Top Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute -top-5 left-1/2 -translate-x-1/2">
          <button
            onClick={scrollToTop}
            title="الصعود للأعلى"
            className="w-10 h-10 rounded-full bg-[#1b1e27] border border-[#2d313e] text-gray-300 hover:text-white hover:bg-[#e50914] hover:border-[#e50914] flex items-center justify-center transition-all shadow-lg hover:shadow-[#e50914]/30 hover:-translate-y-1"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#b7060f] to-[#ff2b38] flex items-center justify-center shadow-lg shadow-[#e50914]/25">
                <span className="text-white font-black text-lg">AL</span>
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                anime<span className="text-[#e50914]">lik</span>
              </span>
            </div>

            <p className="text-sm leading-relaxed text-gray-400">
              موقع <strong className="text-gray-200">animelik</strong> هو بوابتك الرائدة لمشاهدة وتحميل أحدث حلقات ومواسم مسلسلات وأفلام الأنمي الياباني المترجمة باحترافية، بجودات متعددة وسيرفرات مشاهدة سريعة بدون تقطيع.
            </p>

            {/* ZIP download button in footer */}
            <div className="pt-1">
              <a
                href="/animelik.zip"
                download="animelik.zip"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-900/30 transition-all hover:scale-105"
              >
                <Download className="w-4 h-4" />
                <span>تحميل ملفات المشروع كاملة (ZIP)</span>
              </a>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://t.me/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-[#191b24] hover:bg-[#229ed9] text-gray-300 hover:text-white flex items-center justify-center transition-colors border border-[#262a36]"
                title="قناة التيليجرام"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-[#191b24] hover:bg-black text-gray-300 hover:text-white flex items-center justify-center transition-colors border border-[#262a36]"
                title="تويتر / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-[#191b24] hover:bg-[#1877f2] text-gray-300 hover:text-white flex items-center justify-center transition-colors border border-[#262a36]"
                title="فيسبوك"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-base font-bold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#e50914]" />
              روابط سريعة
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#e50914] transition-colors"
                >
                  الرئيسية
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('movies')}
                  className="hover:text-[#e50914] transition-colors"
                >
                  قائمة الأفلام
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('library-animes')}
                  className="hover:text-[#e50914] transition-colors"
                >
                  قائمة الأنميات
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('library-seasons')}
                  className="hover:text-[#e50914] transition-colors"
                >
                  قائمة المواسم
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('library-episodes')}
                  className="hover:text-[#e50914] transition-colors"
                >
                  قائمة الحلقات
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('schedule')}
                  className="hover:text-[#e50914] transition-colors"
                >
                  مواعيد الحلقات الأسبوعية
                </button>
              </li>
            </ul>
          </div>

          {/* Anime Seasons */}
          <div>
            <h4 className="text-white text-base font-bold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#e50914]" />
              مواسم الأنمي
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('season', 'شتاء 2025')}
                  className="hover:text-[#e50914] transition-colors"
                >
                  أنميات شتاء 2025
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('season', 'خريف 2024')}
                  className="hover:text-[#e50914] transition-colors"
                >
                  أنميات خريف 2024
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('season', 'صيف 2024')}
                  className="hover:text-[#e50914] transition-colors"
                >
                  أنميات صيف 2024
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('season', 'ربيع 2024')}
                  className="hover:text-[#e50914] transition-colors"
                >
                  أنميات ربيع 2024
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('watchlist')}
                  className="hover:text-[#e50914] transition-colors"
                >
                  قائمة المشاهدة لاحقاً
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & DMCA */}
          <div>
            <h4 className="text-white text-base font-bold mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#e50914]" />
              إخلاء المسؤولية وحقوق النشر
            </h4>
            <p className="text-xs leading-relaxed text-gray-500 mb-4 text-justify">
              الموقع لا يقوم بتخزين أو رفع أي محتوى مرئي على خوادمه إطلاقاً. كافة الروابط وملفات الفيديو المضمنة مأخوذة من خدمات مشاركة الفيديو التابعة لأطراف ثالثة (مثل Google Drive, Dailymotion, Mp4Upload, Vidmoly).
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  حقوق الملكية الفكرية (DMCA)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  شروط الاستخدام وسياسة الخصوصية
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  اتصل بإدارة الموقع
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[#1b1d26] flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p className="text-center sm:text-right">
            جميع الحقوق محفوظة لموقع <span className="text-white font-bold">animelik</span> © 2024 - 2026.
          </p>
          <div className="flex items-center gap-1 text-gray-500">
            <span>صُنع بشغف لمحبي وعشاق الأنمي في الوطن العربي</span>
            <Heart className="w-3.5 h-3.5 text-[#e50914] fill-current inline mx-1" />
          </div>
        </div>
      </div>
    </footer>
  );
};
