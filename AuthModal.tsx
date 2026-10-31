import React, { useState } from 'react';
import { X, User, Mail, Lock, LogIn, UserPlus } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: { name: string; email: string }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (isRegister && !name)) {
      alert('يرجى ملء جميع الحقول المطلوبة');
      return;
    }
    const displayName = isRegister ? name : email.split('@')[0];
    onLoginSuccess({ name: displayName, email });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-md bg-[#161822] border border-[#292d3c] rounded-2xl p-6 shadow-2xl relative space-y-5 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-[#252836] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#b7060f] to-[#ff2b38] mx-auto flex items-center justify-center shadow-lg shadow-[#e50914]/25 mb-2">
            <span className="text-white font-black text-xl">AL</span>
          </div>
          <h3 className="text-xl font-black text-white">
            {isRegister ? 'إنشاء حساب في animelik' : 'تسجيل الدخول إلى animelik'}
          </h3>
          <p className="text-xs text-gray-400">
            {isRegister
              ? 'انضم إلينا لحفظ أنمياتك المفضلة وسجل مشاهداتك'
              : 'أهلاً بك مجدداً في مجتمع عشاق الأنمي'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-right">
          {isRegister && (
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-300">اسم المستخدم:</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="مثال: OtakuKing"
                  className="w-full bg-[#12131a] border border-[#2a2e3d] rounded-xl pr-9 pl-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#e50914]"
                />
                <User className="w-4 h-4 text-gray-500 absolute right-3 top-3" />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-300">البريد الإلكتروني:</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-[#12131a] border border-[#2a2e3d] rounded-xl pr-9 pl-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#e50914]"
              />
              <Mail className="w-4 h-4 text-gray-500 absolute right-3 top-3" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-300">كلمة المرور:</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#12131a] border border-[#2a2e3d] rounded-xl pr-9 pl-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#e50914]"
              />
              <Lock className="w-4 h-4 text-gray-500 absolute right-3 top-3" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#e50914] to-[#f92e3c] text-white font-bold text-sm shadow-lg shadow-[#e50914]/25 hover:opacity-95 transition-all mt-4 flex items-center justify-center gap-2"
          >
            {isRegister ? <UserPlus className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
            <span>{isRegister ? 'إنشاء حساب جديد' : 'دخول'}</span>
          </button>
        </form>

        {/* Toggle Mode */}
        <div className="text-center pt-2 border-t border-[#232634] text-xs text-gray-400">
          {isRegister ? (
            <p>
              لديك حساب بالفعل؟{' '}
              <button
                type="button"
                onClick={() => setIsRegister(false)}
                className="text-[#e50914] font-bold hover:underline"
              >
                تسجيل الدخول
              </button>
            </p>
          ) : (
            <p>
              ليس لديك حساب بعد؟{' '}
              <button
                type="button"
                onClick={() => setIsRegister(true)}
                className="text-[#e50914] font-bold hover:underline"
              >
                إنشاء حساب جديد مجاناً
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
