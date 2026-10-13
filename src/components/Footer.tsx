import React from 'react';
import { ActiveTool } from '../types';
import { Language, DICTIONARY } from '../translations';
import { ShieldCheck, MessageCircle, Mail, Sparkles } from 'lucide-react';

interface FooterProps {
  onSelectTool: (tool: ActiveTool) => void;
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTool, lang }) => {
  const t = DICTIONARY[lang];
  const phoneNumber = '05359726667';
  const emailAddress = 'lllmmmm330@gmail.com';

  return (
    <footer className="relative bg-[#060608] text-slate-400 text-xs border-t border-amber-500/20 no-print overflow-hidden">
      {/* Decorative cyber grid in gold & black */}
      <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:32px_32px] opacity-5 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Prominent Contact Banner in Luxury Black & Gold */}
        <div className="mb-12 p-6 rounded-3xl bg-gradient-to-r from-[#121218] via-[#1a1a24] to-[#121218] border-2 border-amber-500/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-right md:text-right">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Sparkles className="w-4 h-4" />
              <span>{lang === 'ar' ? 'مساحة الإعلانات والشراكات الرسمية' : lang === 'tr' ? 'Resmi Reklam ve İş Ortaklığı' : 'Official Advertising & Sponsorship'}</span>
            </div>
            <div className="text-white font-black text-lg">
              {lang === 'ar' ? 'تواصل معنا مباشرة لنشر إعلاناتك أو شراء قوالب مخصصة' : lang === 'tr' ? 'Reklam vermek veya özel araçlar için hemen iletişime geçin' : 'Contact directly for ad placements or customized tool engines'}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://wa.me/905359726667"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-black text-xs shadow-lg shadow-amber-400/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-black" />
              <span>واتساب: {phoneNumber}</span>
            </a>

            <a
              href={`mailto:${emailAddress}`}
              className="px-5 py-2.5 rounded-xl bg-[#0a0a0e] hover:bg-[#181822] text-amber-300 font-bold text-xs border border-amber-500/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Mail className="w-4 h-4 text-amber-400" />
              <span className="font-mono">{emailAddress}</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Brand & Philosophy */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <div className="w-7 h-7 rounded-lg bg-amber-400 text-black flex items-center justify-center text-xs font-black shadow-md shadow-amber-400/20">
                ع
              </div>
              <span className="text-amber-300">{t.appName}</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              {t.subTagline}
            </p>
            <div className="flex items-center gap-2 text-[11px] text-amber-400">
              <ShieldCheck className="w-4 h-4" />
              <span>{t.privacyGuarantee}</span>
            </div>
          </div>

          {/* Col 2: PDF Tools */}
          <div className="space-y-2">
            <div className="text-amber-400 font-bold text-xs">{t.pdfTools}</div>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => onSelectTool('pdf-merge')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  {t.mergePdf}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTool('pdf-compress')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  {t.compressPdf}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTool('pdf-sign')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  {t.signPdf}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTool('img-to-pdf')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  {t.imgToPdf}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: E-commerce & Resumes */}
          <div className="space-y-2">
            <div className="text-amber-400 font-bold text-xs">{t.productStudio} & CV</div>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => onSelectTool('bg-remove')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  {t.productStudio}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTool('cv-maker')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  {t.cvMaker}
                </button>
              </li>
              <li>
                <a href="#seo-machine" className="hover:text-amber-300 transition-colors">
                  {t.seoLogic}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* SEO Tag Cloud */}
        <div className="border-t border-amber-500/10 pt-6 pb-6 text-[11px] text-slate-500 flex flex-wrap gap-x-4 gap-y-2">
          <span className="text-amber-400 font-semibold">Google Search Queries:</span>
          <span>دمج PDF سريع</span>
          <span>·</span>
          <span>CV جاهز في تركيا</span>
          <span>·</span>
          <span>Lebenslauf سوريين في ألمانيا</span>
          <span>·</span>
          <span>Instagram background remover</span>
          <span>·</span>
          <span>PDF birleştirme ücretsiz</span>
          <span>·</span>
          <span>Türkiye çalışma izni CV şablonu</span>
          <span>·</span>
          <span>تفريغ صور منتجات سلة</span>
        </div>

        {/* Copyright */}
        <div className="border-t border-amber-500/10 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
          <div>{t.allRightsReserved}</div>
          <div className="flex items-center gap-2 text-amber-400/80 font-mono">
            <span>WhatsApp: {phoneNumber}</span>
            <span>·</span>
            <span>{emailAddress}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
