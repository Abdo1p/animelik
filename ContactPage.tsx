import React, { useState } from 'react';
import { Mail, Send, Shield, AlertCircle, CheckCircle, MessageSquare } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('general');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert('يرجى ملء جميع الحقول المطلوبة');
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setSubmitted(false);
      alert('تم إرسال رسالتك بنجاح إلى إدارة موقع animelik، وسنرد عليك قريباً!');
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 text-right">
      {/* Page Header */}
      <div className="text-center space-y-2 border-b border-[#252836] pb-8">
        <h1 className="text-3xl font-black text-white flex items-center justify-center gap-2">
          <Mail className="w-8 h-8 text-[#e50914]" />
          <span>اتصل بنا • إدارة animelik</span>
        </h1>
        <p className="text-sm text-gray-400 max-w-xl mx-auto">
          نرحب دائماً باقتراحاتكم، استفساراتكم وبلاغات الروابط، وفريقنا متواجد للرد في أسرع وقت ممكن.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Contact Form */}
        <div className="rounded-2xl bg-[#161822] border border-[#272a38] p-6 shadow-xl space-y-5">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#e50914]" />
            <span>نموذج التواصل السريع</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-300">الاسم الكامل:</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="اسمك أو لقبك"
                className="w-full bg-[#12131a] border border-[#2a2e3d] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#e50914]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-300">البريد الإلكتروني للرد:</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your-email@example.com"
                className="w-full bg-[#12131a] border border-[#2a2e3d] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#e50914]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-300">موضوع الرسالة:</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-[#12131a] border border-[#2a2e3d] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#e50914]"
              >
                <option value="general">استفسار عام</option>
                <option value="request">طلب إضافة أنمي أو فيلم</option>
                <option value="bug">إبلاغ عن خطأ تقني في الموقع</option>
                <option value="dmca">حقوق النشر وحذف محتوى (DMCA)</option>
                <option value="partnership">إعلان وشراكات</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-300">نص الرسالة:</label>
              <textarea
                rows={5}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="اكتب تفاصيل رسالتك هنا بوضوح..."
                className="w-full bg-[#12131a] border border-[#2a2e3d] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#e50914] resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitted}
              className="w-full py-3 rounded-xl bg-[#e50914] hover:bg-[#c2050f] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#e50914]/25 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>{submitted ? 'جاري الإرسال...' : 'إرسال الرسالة'}</span>
            </button>
          </form>
        </div>

        {/* DMCA & Legal Policy */}
        <div className="space-y-6">
          <div className="rounded-2xl bg-[#161822] border border-[#272a38] p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-base border-b border-[#252835] pb-3">
              <Shield className="w-5 h-5" />
              <h3>حقوق الملكية الفكرية وDMCA</h3>
            </div>

            <div className="text-xs leading-relaxed text-gray-300 space-y-3">
              <p>
                موقع <strong className="text-white">animelik</strong> يحترم حقوق الملكية الفكرية للآخرين ويلتزم بقوانين حماية حقوق النشر الرقمية (DMCA).
              </p>
              <p>
                نود التوضيح أن موقع <strong className="text-white">animelik</strong> لا يمتلك أي سيرفرات تخزين لملفات الفيديو، ولا يقوم برفع أو بث أي عمل مرئي بشكل مباشر. كافة الروابط المتاحة بالموقع تم جمعها من مواقع طرف ثالث خارجية مثل (Google Drive, Mp4Upload, Vidmoly, StreamWish).
              </p>
              <p>
                إذا كنت مالكاً لحق من حقوق الطبع والنشر وترغب في إزالة أي رابط، يرجى مراسلتنا عبر النموذج مع تحديد الروابط المعنية بدقة وإثبات الملكية، وسيتم اتخاذ الإجراءات وحذف الروابط خلال أقل من 24 ساعة.
              </p>
            </div>
          </div>

          {/* Site Ownership Badge */}
          <div className="rounded-2xl bg-gradient-to-tr from-[#161822] to-[#1d212e] border border-[#2c3142] p-5 shadow-lg text-xs space-y-2">
            <h4 className="font-bold text-white text-sm">الملكية والعلامة التجارية:</h4>
            <p className="text-gray-400">
              جميع الحقوق الفكرية والتصميم والهوية البرمجية لعلامة <span className="text-[#e50914] font-bold">animelik</span> محفوظة © 2024 - 2026.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
