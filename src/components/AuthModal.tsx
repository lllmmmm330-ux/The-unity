import React, { useState } from 'react';
import { AppUser } from '../types';
import { Language, DICTIONARY } from '../translations';
import { X, Mail, Phone, User, Lock, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: AppUser) => void;
  lang: Language;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  lang,
}) => {
  const t = DICTIONARY[lang];
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');
  const [isRegister, setIsRegister] = useState(true);

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [countryCode, setCountryCode] = useState('+90'); // Default Turkey / Arab diaspora
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  // 1. Google 1-Click Sign-in Action
  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      const googleUser: AppUser = {
        id: `google-${Date.now()}`,
        name: name.trim() || 'محمد العلي (Google Member)',
        email: email.trim() || 'user.google@gmail.com',
        phone: phone.trim() || '+90 535 972 66 67',
        photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        provider: 'google',
        createdAt: new Date().toLocaleDateString('ar-EG'),
        savedFilesCount: 4,
      };

      localStorage.setItem('arabtools_user', JSON.stringify(googleUser));
      onLoginSuccess(googleUser);
      setLoading(false);
      onClose();

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });
    }, 600);
  };

  // 2. Email or Phone Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (authMethod === 'email') {
      if (!email.includes('@')) {
        setError(lang === 'ar' ? 'يرجى إدخال بريد إلكتروني صالح' : 'Please enter a valid email address');
        return;
      }
      if (!name.trim()) {
        setError(lang === 'ar' ? 'يرجى إدخال الاسم' : 'Please enter your name');
        return;
      }
    } else {
      if (!phone.trim() || phone.length < 7) {
        setError(lang === 'ar' ? 'يرجى إدخال رقم هاتف صحيح' : 'Please enter a valid phone number');
        return;
      }
      if (!name.trim()) {
        setError(lang === 'ar' ? 'يرجى إدخال الاسم' : 'Please enter your name');
        return;
      }
    }

    setLoading(true);
    setTimeout(() => {
      const newUser: AppUser = {
        id: `user-${Date.now()}`,
        name: name.trim(),
        email: email.trim() || `${phone.replace(/\D/g, '')}@arabtools.com`,
        phone: authMethod === 'phone' ? `${countryCode} ${phone.trim()}` : phone.trim(),
        provider: authMethod,
        createdAt: new Date().toLocaleDateString('ar-EG'),
        savedFilesCount: 1,
      };

      localStorage.setItem('arabtools_user', JSON.stringify(newUser));
      onLoginSuccess(newUser);
      setLoading(false);
      onClose();

      confetti({
        particleCount: 45,
        spread: 55,
        origin: { y: 0.6 },
      });
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#121218] border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/90 text-slate-100 overflow-hidden">
        {/* Decorative Top Accent Glow */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 p-2 text-slate-400 hover:text-amber-400 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6 pt-2">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-400/10 text-amber-400 flex items-center justify-center font-black mb-3 border border-amber-400/30 shadow-md">
            <Sparkles className="w-6 h-6 fill-amber-400" />
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white mb-1">
            {t.loginTitle}
          </h3>
          <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
            {t.loginSub}
          </p>
        </div>

        {/* Google 1-Click Button with Real Colored Google 'G' Icon */}
        <div className="mb-5">
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full py-3 px-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-sm shadow-md flex items-center justify-center gap-3 transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.99] border border-slate-200"
          >
            {/* Real Official Google SVG Icon */}
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>{t.continueWithGoogle}</span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center mb-5">
          <div className="w-full border-t border-amber-500/20"></div>
          <span className="absolute bg-[#121218] px-3 text-[11px] text-slate-400 font-medium whitespace-nowrap">
            {t.orContinueWith}
          </span>
        </div>

        {/* Tab Toggle: Email vs Phone */}
        <div className="grid grid-cols-2 gap-1 p-1 bg-[#0a0a0e] rounded-xl border border-amber-500/20 mb-4 text-xs font-bold">
          <button
            type="button"
            onClick={() => setAuthMethod('email')}
            className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              authMethod === 'email'
                ? 'bg-amber-400 text-black shadow-xs font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>{t.tabEmail}</span>
          </button>

          <button
            type="button"
            onClick={() => setAuthMethod('phone')}
            className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              authMethod === 'phone'
                ? 'bg-amber-400 text-black shadow-xs font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{t.tabPhone}</span>
          </button>
        </div>

        {error && (
          <div className="mb-4 p-2.5 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs text-center font-medium">
            {error}
          </div>
        )}

        {/* Form Fields: Name, Email / Phone, Password */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* 1. Name Field (Always included) */}
          <div>
            <label className="block text-[11px] font-bold text-slate-300 mb-1 flex items-center gap-1">
              <User className="w-3 h-3 text-amber-400" />
              <span>{t.enterName}:</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={lang === 'ar' ? 'محمد العلي' : 'John Doe'}
              className="w-full bg-[#181822] border border-amber-500/30 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* 2. Email Option */}
          {authMethod === 'email' ? (
            <div>
              <label className="block text-[11px] font-bold text-slate-300 mb-1 flex items-center gap-1">
                <Mail className="w-3 h-3 text-amber-400" />
                <span>{t.tabEmail}:</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@example.com"
                className="w-full bg-[#181822] border border-amber-500/30 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>
          ) : (
            /* 3. Phone Option with Country Prefix */
            <div>
              <label className="block text-[11px] font-bold text-slate-300 mb-1 flex items-center gap-1">
                <Phone className="w-3 h-3 text-amber-400" />
                <span>{t.tabPhone}:</span>
              </label>
              <div className="flex gap-2">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="bg-[#181822] border border-amber-500/30 rounded-xl px-2 text-xs text-amber-300 font-mono focus:outline-none"
                >
                  <option value="+90">🇹🇷 +90</option>
                  <option value="+966">🇸🇦 +966</option>
                  <option value="+963">🇸🇾 +963</option>
                  <option value="+49">🇩🇪 +49</option>
                  <option value="+971">🇦🇪 +971</option>
                  <option value="+20">🇪🇬 +20</option>
                </select>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0535 972 66 67"
                  className="flex-1 bg-[#181822] border border-amber-500/30 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono"
                />
              </div>
            </div>
          )}

          {/* 4. Password Field */}
          <div>
            <label className="block text-[11px] font-bold text-slate-300 mb-1 flex items-center gap-1">
              <Lock className="w-3 h-3 text-amber-400" />
              <span>{t.enterPassword}:</span>
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#181822] border border-amber-500/30 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Submit Button in Cyber Gold & Black */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 bg-amber-400 hover:bg-amber-300 text-black font-black text-sm rounded-xl shadow-lg shadow-amber-400/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>{isRegister ? t.createAccount : t.loginBtn}</span>
              </>
            )}
          </button>
        </form>

        {/* Footer Toggle: Register vs Login */}
        <div className="mt-4 pt-3 border-t border-amber-500/15 text-center">
          <button
            type="button"
            onClick={() => setIsRegister((prev) => !prev)}
            className="text-xs text-amber-400 hover:text-amber-300 font-bold transition-colors cursor-pointer"
          >
            {isRegister ? t.alreadyHaveAccount : t.dontHaveAccount}
          </button>
        </div>
      </div>
    </div>
  );
};
