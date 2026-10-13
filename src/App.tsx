import React, { useState, useEffect } from 'react';
import { ActiveTool, AppUser } from './types';
import { Language, DICTIONARY } from './translations';
import { Header } from './components/Header';
import { AuthModal } from './components/AuthModal';
import { AdBanner } from './components/AdBanner';
import { SeoEngineWidget } from './components/SeoEngineWidget';
import { DigitalMatrixBackground } from './components/DigitalMatrixBackground';
import { ContactFloatingBar } from './components/ContactFloatingBar';
import { PdfMerge } from './components/PdfTools/PdfMerge';
import { PdfCompress } from './components/PdfTools/PdfCompress';
import { PdfSign } from './components/PdfTools/PdfSign';
import { ImagesToPdf } from './components/PdfTools/ImagesToPdf';
import { ProductStudio } from './components/ImageBgRemover/ProductStudio';
import { CvMaker } from './components/ResumeBuilder/CvMaker';
import { Footer } from './components/Footer';
import { TOOL_FAQS } from './data/seoData';
import { Zap, Sparkles, ChevronDown, Briefcase, CheckCircle2, User } from 'lucide-react';

export default function App() {
  const [activeTool, setActiveTool] = useState<ActiveTool>('pdf-merge');
  const [lang, setLang] = useState<Language>('ar');
  const [showAdMetrics, setShowAdMetrics] = useState<boolean>(true);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // User state loaded from localStorage
  const [currentUser, setCurrentUser] = useState<AppUser | null>(() => {
    try {
      const saved = localStorage.getItem('arabtools_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const t = DICTIONARY[lang];
  const isRtl = lang === 'ar';
  const faqs = TOOL_FAQS[activeTool] || TOOL_FAQS['pdf-merge'];

  useEffect(() => {
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang, isRtl]);

  const handleLogout = () => {
    localStorage.removeItem('arabtools_user');
    setCurrentUser(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0e] text-slate-100 relative font-sans">
      {/* 1. Dynamic Animated Matrix Background */}
      <DigitalMatrixBackground />

      {/* 2. Floating Contact Bar (WhatsApp & Email in Gold & Black) */}
      <ContactFloatingBar lang={lang} />

      {/* 3. Top Bar Navigation with Google Sign In & User Profile */}
      <Header
        activeTool={activeTool}
        onSelectTool={setActiveTool}
        showAdMetrics={showAdMetrics}
        onToggleAdMetrics={() => setShowAdMetrics((prev) => !prev)}
        lang={lang}
        onSelectLanguage={setLang}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* 4. Login & Registration Modal (Google, Email, Phone, Name) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(user) => setCurrentUser(user)}
        lang={lang}
      />

      {/* Main Container */}
      <main className="flex-1 relative z-10">
        {/* Top Hero Section in Professional Black & Yellow with Light Feather Cosmic Aura */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#14151f]/80 via-[#0e0f16]/70 to-[#0a0a0e]/90 border-b border-amber-500/20 pt-10 pb-10 no-print backdrop-blur-[2px]">
          {/* Ambient Glowing Feather-Ash & Golden Celestial Orbs */}
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-slate-300/10 rounded-full blur-[130px] pointer-events-none -z-10"></div>
          <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-amber-400/15 rounded-full blur-[130px] pointer-events-none -z-10"></div>
          <div className="absolute -bottom-20 right-1/3 w-[450px] h-[450px] bg-slate-400/10 rounded-full blur-[140px] pointer-events-none -z-10"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Logged in notification banner if user exists */}
            {currentUser && (
              <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 bg-amber-400/10 border border-amber-400/30 px-4 py-1.5 rounded-full mb-3 shadow-sm animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>{t.welcomeUser}، {currentUser.name}! ({currentUser.email || currentUser.phone})</span>
              </div>
            )}

            {/* Top Concept Hook with Yellow Badge */}
            <div className="block">
              <div className="inline-flex items-center gap-2 text-xs font-black text-amber-300 bg-amber-400/10 border border-amber-400/30 px-4 py-1.5 rounded-full mb-4 shadow-sm backdrop-blur-md">
                <Zap className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>{t.heroBadge}</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4 leading-tight">
              <span className="bg-gradient-to-r from-white via-amber-200 to-amber-400 bg-clip-text text-transparent">
                {t.tagline}
              </span>
            </h1>

            <p className="max-w-3xl mx-auto text-sm sm:text-base text-slate-300 mb-8 leading-relaxed font-normal">
              {t.subTagline}
            </p>

            {/* Segmented Tool Switcher Buttons in Black & Cyber Yellow */}
            <div className="inline-flex flex-wrap items-center justify-center p-2 bg-[#121218]/90 backdrop-blur-xl rounded-2xl gap-1.5 max-w-full shadow-2xl border border-amber-500/30">
              <button
                type="button"
                onClick={() => setActiveTool('pdf-merge')}
                className={`px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-black rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                  activeTool === 'pdf-merge'
                    ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/30'
                    : 'text-slate-300 hover:text-amber-300 hover:bg-white/5'
                }`}
              >
                {t.mergePdf}
              </button>

              <button
                type="button"
                onClick={() => setActiveTool('pdf-compress')}
                className={`px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-black rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                  activeTool === 'pdf-compress'
                    ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/30'
                    : 'text-slate-300 hover:text-amber-300 hover:bg-white/5'
                }`}
              >
                {t.compressPdf}
              </button>

              <button
                type="button"
                onClick={() => setActiveTool('pdf-sign')}
                className={`px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-black rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                  activeTool === 'pdf-sign'
                    ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/30'
                    : 'text-slate-300 hover:text-amber-300 hover:bg-white/5'
                }`}
              >
                {t.signPdf}
              </button>

              <button
                type="button"
                onClick={() => setActiveTool('img-to-pdf')}
                className={`px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-black rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                  activeTool === 'img-to-pdf'
                    ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/30'
                    : 'text-slate-300 hover:text-amber-300 hover:bg-white/5'
                }`}
              >
                {t.imgToPdf}
              </button>

              <button
                type="button"
                onClick={() => setActiveTool('bg-remove')}
                className={`px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-black rounded-xl transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  activeTool === 'bg-remove'
                    ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/30'
                    : 'text-amber-300 hover:text-amber-200 hover:bg-amber-400/10'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.productStudio}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTool('cv-maker')}
                className={`px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-black rounded-xl transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  activeTool === 'cv-maker'
                    ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/30'
                    : 'text-amber-300 hover:text-amber-200 hover:bg-amber-400/10'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>{t.cvMaker}</span>
              </button>
            </div>
          </div>
        </section>

        {/* Top AdSense Leaderboard Banner */}
        <div className="max-w-5xl mx-auto px-4 no-print">
          <AdBanner
            format="leaderboard"
            niche={
              activeTool === 'cv-maker'
                ? 'lawyer-germany'
                : activeTool === 'bg-remove'
                ? 'ecommerce-sa'
                : 'turkey-cargo'
            }
            showMetrics={showAdMetrics}
          />
        </div>

        {/* Active Tool Workspace Section with Gold Glowing Frame */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mb-8">
          <div className="relative rounded-3xl p-1 bg-gradient-to-b from-amber-500/30 via-yellow-400/20 to-amber-500/30 shadow-2xl shadow-black/80">
            {activeTool === 'pdf-merge' && <PdfMerge />}
            {activeTool === 'pdf-compress' && <PdfCompress />}
            {activeTool === 'pdf-sign' && <PdfSign />}
            {activeTool === 'img-to-pdf' && <ImagesToPdf />}
            {activeTool === 'bg-remove' && <ProductStudio />}
            {activeTool === 'cv-maker' && <CvMaker />}
          </div>
        </section>

        {/* Mid-content Ad Banner */}
        <div className="max-w-5xl mx-auto px-4 mb-8 no-print">
          <AdBanner
            format="in-feed"
            niche="general"
            showMetrics={showAdMetrics}
          />
        </div>

        {/* SEO FAQ Section in Black & Gold */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10 mb-8 no-print">
          <div className="text-center mb-6">
            <h3 className="text-xl sm:text-2xl font-black text-white mb-1">
              {lang === 'ar'
                ? 'الأسئلة الشائعة وتفاصيل الخدمة'
                : lang === 'tr'
                ? 'Sıkça Sorulan Sorular ve Hizmet Detayları'
                : 'Frequently Asked Questions & Service Details'}
            </h3>
            <p className="text-xs text-slate-400">
              {lang === 'ar'
                ? 'إجابات دقيقة مصممة للظهور في النتائج الأولى على محرك بحث Google'
                : lang === 'tr'
                ? 'Google arama motoru ilk sıra kriterlerine uygun yanıtlar'
                : 'Structured answers optimized for Google search featured snippets'}
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((item, idx) => (
              <div
                key={idx}
                className="border border-amber-500/20 rounded-2xl bg-[#121218] overflow-hidden transition-all shadow-md"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 text-right flex items-center justify-between gap-3 font-bold text-sm text-white hover:bg-amber-400/5 transition-colors cursor-pointer"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-amber-400 transition-transform ${
                      openFaq === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="p-4 pt-0 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-amber-500/10 bg-[#0a0a0e]/60">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* The SEO Traffic & Ad Monetization Engine */}
        <div className="no-print">
          <SeoEngineWidget />
        </div>
      </main>

      {/* Footer in Deep Black & Gold */}
      <Footer onSelectTool={setActiveTool} lang={lang} />
    </div>
  );
}
