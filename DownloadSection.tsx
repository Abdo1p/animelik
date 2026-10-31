import React, { useState } from 'react';
import { Download, Check, ExternalLink, HardDrive, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { DownloadLink } from '../types/anime';

interface DownloadSectionProps {
  downloads: DownloadLink[];
  episodeNumber: number;
  animeTitle: string;
}

export const DownloadSection: React.FC<DownloadSectionProps> = ({
  downloads,
  episodeNumber,
  animeTitle,
}) => {
  const [downloadingServer, setDownloadingServer] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleDownload = (link: DownloadLink) => {
    setDownloadingServer(link.server + link.quality);
    setTimeout(() => {
      setDownloadingServer(null);
      setToastMessage(`بدأ تحميل الحلقة ${episodeNumber} من سيرفر ${link.server} بجودة ${link.quality}`);
      setTimeout(() => setToastMessage(null), 4000);
      
      // If direct link or file download
      if (link.url && link.url !== '#') {
        window.open(link.url, '_blank');
      }
    }, 800);
  };

  return (
    <div className="rounded-2xl bg-[#161822] border border-[#272a38] p-5 shadow-xl space-y-4 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center justify-between gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-gray-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Title */}
      <div className="flex items-center justify-between border-b border-[#262a38] pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-white font-bold text-base">روابط تحميل الحلقة {episodeNumber}</h3>
            <p className="text-xs text-gray-400">اختر الجودة والسيرفر المناسب لسرعة اتصالك</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
          <ShieldCheck className="w-4 h-4" />
          <span>روابط فحصت وخالية من الفيروسات</span>
        </div>
      </div>

      {/* Downloads Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-right text-xs">
          <thead>
            <tr className="border-b border-[#252836] text-gray-400">
              <th className="py-2.5 px-3 font-semibold">السيرفر</th>
              <th className="py-2.5 px-3 font-semibold">الجودة</th>
              <th className="py-2.5 px-3 font-semibold">الحجم</th>
              <th className="py-2.5 px-3 font-semibold text-center">الرابط المباشر</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#232634]">
            {downloads.map((item, idx) => {
              const isAction = downloadingServer === item.server + item.quality;
              return (
                <tr key={idx} className="hover:bg-[#1c1f2b] transition-colors">
                  <td className="py-3 px-3 font-bold text-white flex items-center gap-2">
                    <HardDrive className="w-3.5 h-3.5 text-gray-400" />
                    <span>{item.server}</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.quality.includes('FHD') 
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        : item.quality.includes('HD')
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                    }`}>
                      {item.quality}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-gray-300 font-mono">
                    {item.size}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <button
                      onClick={() => handleDownload(item)}
                      disabled={isAction}
                      className={`px-3 py-1.5 rounded-lg font-bold inline-flex items-center gap-1.5 shadow-sm transition-all ${
                        isAction
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#242938] hover:bg-[#e50914] text-gray-200 hover:text-white border border-[#2f3547]'
                      }`}
                    >
                      {isAction ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>جاري التحميل...</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-3.5 h-3.5" />
                          <span>تحميل</span>
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
