import React, { useState } from 'react';
import { X, AlertTriangle, CheckCircle } from 'lucide-react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  animeTitle: string;
  episodeNumber: number;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  animeTitle,
  episodeNumber,
}) => {
  const [issueType, setIssueType] = useState('video_broken');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-md bg-[#161822] border border-[#2b2f3e] rounded-2xl p-6 shadow-2xl relative space-y-4 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-[#252836] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 border-b border-[#242736] pb-3">
          <div className="p-2 rounded-xl bg-rose-500/10 text-rose-500">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="text-right">
            <h3 className="text-base font-black text-white">الإبلاغ عن مشكلة في الفيديو</h3>
            <p className="text-xs text-gray-400">
              {animeTitle} - الحلقة {episodeNumber}
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
            <h4 className="text-white font-bold text-base">تم إرسال بلاغك بنجاح!</h4>
            <p className="text-xs text-gray-400">
              شكراً لمساعدتك في تحسين جودة خدمات animelik، سيتم فحص الرابط وإصلاحه بأقرب وقت.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-right">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-300">نوع المشكلة:</label>
              <select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                className="w-full bg-[#12131a] border border-[#2a2e3d] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#e50914]"
              >
                <option value="video_broken">الفيديو لا يعمل / السيرفر معطل</option>
                <option value="audio_sync">الصوت غير متطابق مع الترجمة أو مفقود</option>
                <option value="wrong_episode">الحلقة غير صحيحة أو ناقصة</option>
                <option value="download_links">روابط التحميل لا تعمل</option>
                <option value="other">مشكلة أخرى</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-300">تفاصيل إضافية (اختياري):</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="وضح المشكلة أو اسم السيرفر المتأثر..."
                className="w-full bg-[#12131a] border border-[#2a2e3d] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#e50914] resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#e50914] hover:bg-[#c2050f] text-white font-bold text-xs shadow-lg shadow-[#e50914]/25 transition-colors"
            >
              إرسال البلاغ الآن
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
