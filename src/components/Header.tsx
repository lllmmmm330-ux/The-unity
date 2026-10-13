import React, { useState } from 'react';
import { ActiveTool, AppUser } from '../types';
import { Language, DICTIONARY } from '../translations';
import { FileText, Image, Briefcase, Layers, Globe, MessageCircle, ChevronDown, User, LogOut, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  activeTool: ActiveTool;
  onSelectTool: (tool: ActiveTool) => void;
  showAdMetrics: boolean;
  onToggleAdMetrics: () => void;
  lang: Language;
  onSelectLanguage: (lang: Language) => void;
  currentUser: AppUser | null;
  onOpenAuth: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTool,
  onSelectTool,
  showAdMetrics,
  onToggleAdMetrics,
  lang,
  onSelectLanguage,
  currentUser,
  onOpenAuth,
  onLogout,
}) => {
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const t = DICTIONARY[lang];

  const languages: { id: Language; label: string; flag: string }[] = [
    { id: 'ar', label: 'العربية', flag: '🇸🇦' },
    { id: 'en', label: 'English', flag: '🇬🇧' },
    { id: 'tr', label: 'Türkçe', flag: '🇹🇷' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0a0a0e]/95 backdrop-blur-xl border-b border-amber-500/20 shadow-lg shadow-black/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 h-16">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onSelectTool('pdf-merge');
            }}
            className="flex items-center gap-2.5 text-lg sm:text-xl font-black tracking-tight text-white whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity"
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 flex items-center justify-center text-black font-black shadow-md shadow-amber-500/30">
                ع
              </div>
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400"></span>
              </span>
            </div>
            <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent font-black">
              {t.appName.split('·')[0]}
            </span>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 text-xs sm:text-sm font-semibold text-slate-300">
            <button
              onClick={() => onSelectTool('pdf-merge')}
              className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 py-1 flex items-center gap-1.5 cursor-pointer ${
                activeTool.startsWith('pdf-') || activeTool === 'img-to-pdf'
                  ? 'text-amber-400 font-bold border-b-2 border-amber-400'
                  : ''
              }`}
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span>{t.pdfTools}</span>
            </button>

            <button
              onClick={() => onSelectTool('bg-remove')}
              className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 py-1 flex items-center gap-1.5 cursor-pointer ${
                activeTool === 'bg-remove'
                  ? 'text-amber-400 font-bold border-b-2 border-amber-400'
                  : ''
              }`}
            >
              <Image className="w-4 h-4 text-amber-400" />
              <span>{t.productStudio}</span>
            </button>

            <button
              onClick={() => onSelectTool('cv-maker')}
              className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 py-1 flex items-center gap-1.5 cursor-pointer ${
                activeTool === 'cv-maker'
                  ? 'text-amber-400 font-bold border-b-2 border-amber-400'
                  : ''
              }`}
            >
              <Briefcase className="w-4 h-4 text-amber-400" />
              <span>{t.cvMaker}</span>
            </button>

            <a
              href="#seo-machine"
              className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 py-1 flex items-center gap-1.5"
            >
              <Layers className="w-4 h-4 text-amber-400" />
              <span>{t.seoLogic}</span>
            </a>
          </nav>

          {/* Zone 3: Actions - Login / User Profile & Language Selector */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Quick WhatsApp Badge */}
            <a
              href="https://wa.me/905359726667"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 border border-amber-400/40 text-xs font-bold transition-all shadow-xs"
              title="تواصل مباشر عبر الواتساب: 05359726667"
            >
              <MessageCircle className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-mono">05359726667</span>
            </a>

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangMenuOpen((prev) => !prev)}
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold rounded-lg border border-amber-500/30 bg-[#121218] hover:bg-[#1a1a22] text-slate-200 hover:text-amber-300 shadow-xs transition-colors cursor-pointer"
                title="تغيير لغة المنصة"
              >
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">
                  {languages.find((l) => l.id === lang)?.flag}{' '}
                  {languages.find((l) => l.id === lang)?.label}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {langMenuOpen && (
                <div className="absolute top-full mt-1.5 right-0 z-50 w-36 bg-[#14141c] border border-amber-500/30 rounded-xl shadow-2xl py-1 text-xs">
                  {languages.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        onSelectLanguage(item.id);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-right flex items-center justify-between hover:bg-amber-400/10 transition-colors cursor-pointer ${
                        lang === item.id ? 'font-bold text-amber-400 bg-amber-400/15' : 'text-slate-300'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <span>{item.flag}</span>
                        <span>{item.label}</span>
                      </span>
                      {lang === item.id && <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Authentication Action: Sign-in / User Profile Button with Google Icon */}
            {currentUser ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserMenuOpen((prev) => !prev)}
                  className="flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-xl border border-amber-400/40 bg-[#14141c] hover:bg-[#1c1c28] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-lg bg-amber-400 text-black flex items-center justify-center font-black text-xs">
                    {currentUser.name.charAt(0)}
                  </div>
                  <span className="max-w-[100px] truncate">{currentUser.name}</span>
                  <ChevronDown className="w-3 h-3 text-amber-400" />
                </button>

                {userMenuOpen && (
                  <div className="absolute top-full mt-2 left-0 sm:right-0 z-50 w-64 bg-[#14141c] border-2 border-amber-500/40 rounded-2xl shadow-2xl p-3 text-slate-200">
                    <div className="pb-3 border-b border-amber-500/20">
                      <div className="text-xs font-bold text-white flex items-center gap-1">
                        <span>{currentUser.name}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                      </div>
                      <div className="text-[11px] text-amber-400/80 font-mono truncate">{currentUser.email}</div>
                      {currentUser.phone && (
                        <div className="text-[11px] text-slate-400 font-mono">{currentUser.phone}</div>
                      )}
                    </div>

                    <div className="py-2 text-[11px] text-slate-400">
                      <div className="flex justify-between py-1">
                        <span>نوع الحساب:</span>
                        <span className="text-amber-300 font-bold">عضو موثق</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span>الملفات المنجزة:</span>
                        <span className="text-white font-mono">{currentUser.savedFilesCount} ملف</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-amber-500/20">
                      <button
                        type="button"
                        onClick={() => {
                          onLogout();
                          setUserMenuOpen(false);
                        }}
                        className="w-full py-2 px-3 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>{t.logoutBtn}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={onOpenAuth}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-black text-xs shadow-md shadow-amber-400/20 transition-all cursor-pointer whitespace-nowrap shrink-0 hover:scale-[1.02]"
              >
                {/* Official Google SVG Icon */}
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
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
                <span>{t.loginBtn}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
