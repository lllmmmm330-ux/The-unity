import React, { useState } from 'react';
import { MessageCircle, Mail, Copy, Check, Sparkles, ExternalLink, X } from 'lucide-react';
import { Language, DICTIONARY } from '../translations';

interface ContactFloatingBarProps {
  lang: Language;
}

export const ContactFloatingBar: React.FC<ContactFloatingBarProps> = ({ lang }) => {
  const [copied, setCopied] = useState<'phone' | 'email' | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const t = DICTIONARY[lang];
  const phoneNumber = '05359726667';
  const emailAddress = 'lllmmmm330@gmail.com';
  const whatsappUrl = `https://wa.me/905359726667?text=${encodeURIComponent(
    lang === 'ar'
      ? 'مرحباً، أود التواصل بخصوص مشروع الأدوات والإعلانات'
      : lang === 'tr'
      ? 'Merhaba, ücretsiz araçlar ve reklam ortaklığı hakkında görüşmek istiyorum'
      : 'Hello, I would like to get in touch regarding the tools platform and ads'
  )}`;

  const copyToClipboard = (text: string, type: 'phone' | 'email') => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2500);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 no-print flex flex-col items-end">
      {/* Expanded Quick Contact Popover in Luxury Black & Gold */}
      {isOpen && (
        <div className="mb-3 w-80 bg-[#0e0e14]/95 backdrop-blur-2xl border-2 border-amber-500/50 rounded-2xl p-4 shadow-2xl shadow-black/90 animate-in fade-in slide-in-from-bottom-4 duration-200 text-slate-100">
          <div className="flex items-center justify-between pb-3 border-b border-amber-500/20">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-300 text-black flex items-center justify-center font-black shadow-md shadow-amber-500/30">
                <Sparkles className="w-4 h-4 fill-black" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">
                  {lang === 'ar' ? 'التواصل المباشر والشراكات' : lang === 'tr' ? 'Doğrudan İletişim & Ortaklık' : 'Direct Contact & Partnerships'}
                </div>
                <div className="text-[10px] text-amber-400 font-semibold">
                  {lang === 'ar' ? 'متاح دائماً على الواتساب والإيميل' : lang === 'tr' ? 'WhatsApp ve E-posta ile 7/24' : 'Available on WhatsApp & Email'}
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-slate-400 hover:text-amber-400 rounded-lg hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2.5 pt-3">
            {/* WhatsApp Direct Action in Gold & Black */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-3 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/40 transition-all text-right shadow-xs"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-400 text-black flex items-center justify-center shadow-md group-hover:scale-105 transition-transform font-bold">
                  <MessageCircle className="w-5 h-5 fill-black" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1">
                    <span>{t.instantChat}</span>
                    <ExternalLink className="w-3 h-3 text-amber-400" />
                  </div>
                  <div className="text-xs font-mono font-bold text-amber-400 dir-ltr">{phoneNumber}</div>
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  copyToClipboard(phoneNumber, 'phone');
                }}
                className="p-1.5 text-slate-400 hover:text-amber-300 rounded-md hover:bg-white/10 transition-colors"
                title="نسخ الرقم"
              >
                {copied === 'phone' ? <Check className="w-4 h-4 text-amber-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </a>

            {/* Email Direct Action */}
            <a
              href={`mailto:${emailAddress}?subject=Inquiry`}
              className="group flex items-center justify-between p-3 rounded-xl bg-[#14141c] hover:bg-[#1c1c28] border border-amber-500/20 transition-all text-right shadow-xs"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#242434] text-amber-400 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">
                    {lang === 'ar' ? 'البريد الإلكتروني الرسمي' : lang === 'tr' ? 'Resmi E-posta' : 'Official Email'}
                  </div>
                  <div className="text-[11px] font-mono text-amber-300 truncate max-w-[150px]">{emailAddress}</div>
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  copyToClipboard(emailAddress, 'email');
                }}
                className="p-1.5 text-slate-400 hover:text-amber-300 rounded-md hover:bg-white/10 transition-colors"
                title="نسخ الإيميل"
              >
                {copied === 'email' ? <Check className="w-4 h-4 text-amber-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </a>
          </div>

          <div className="mt-3 pt-2 border-t border-amber-500/20 text-center">
            <span className="text-[10px] text-slate-400">
              {lang === 'ar'
                ? 'استفسارات الإعلانات، الشراكات وتطوير المنصة'
                : lang === 'tr'
                ? 'Reklam ve geliştirme talepleri için anında ulaşın'
                : 'Ads, sponsorships & custom platform queries'}
            </span>
          </div>
        </div>
      )}

      {/* Main Pill Button in Black & Gold */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2.5 pl-4 pr-3 py-2.5 rounded-full bg-[#0a0a0e] hover:bg-amber-400 text-amber-400 hover:text-black font-extrabold text-xs shadow-2xl border-2 border-amber-400 transition-all cursor-pointer group shadow-amber-500/20 hover:scale-105"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-400"></span>
        </span>

        <span className="flex items-center gap-1.5 tracking-wide">
          <MessageCircle className="w-4 h-4 text-amber-400 group-hover:text-black transition-transform" />
          <span>{phoneNumber}</span>
        </span>

        <div className="w-px h-3.5 bg-amber-500/40"></div>

        <span className="text-[11px] font-mono hidden sm:inline">{emailAddress}</span>
      </button>
    </div>
  );
};
