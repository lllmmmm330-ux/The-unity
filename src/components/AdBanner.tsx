import React from 'react';
import { ExternalLink } from 'lucide-react';

interface AdBannerProps {
  format: 'leaderboard' | 'rectangle' | 'in-feed';
  niche: 'lawyer-germany' | 'turkey-cargo' | 'ecommerce-sa' | 'general';
  showMetrics?: boolean;
}

const NICHE_ADS = {
  'lawyer-germany': {
    sponsor: 'شبكة المستشارين القانونيين في برلين وفرانكفورت',
    title: 'تثبيت الإقامة وتعديل الشهادات والـ Anerkennung في ألمانيا',
    desc: 'استشارة فورية مع محامين عرب معتمدين لمتابعة أوراق الإقامة واللم الشمل والعمل.',
    cta: 'احجز موعدك المجاني',
    cpc: '$4.20',
    rpmEstimate: '$18.50',
  },
  'turkey-cargo': {
    sponsor: 'أجنحة الشحن السريع - إسطنبول والخليج',
    title: 'شحن بضائع تجار إنستغرام من تركيا إلى السعودية والإمارات',
    desc: 'أسعار جملة خاصة للملابس ومستحضرات التجميل مع التخليص الجمركي حتى باب المنزل.',
    cta: 'احصل على تسعيرة فورية',
    cpc: '$2.85',
    rpmEstimate: '$12.00',
  },
  'ecommerce-sa': {
    sponsor: 'منصة التجارة الإلكترونية المتكاملة',
    title: 'أنشئ متجرك الإلكتروني في دقيقتين واربطه مع إنستغرام والدفع الإلكتروني',
    desc: 'بدون عمولة على المبيعات + دومين مجاني وبوابات مدى وتابي وتمارا جاهزة فوراً.',
    cta: 'جرّب مجاناً 14 يوماً',
    cpc: '$3.50',
    rpmEstimate: '$15.20',
  },
  general: {
    sponsor: 'سحابة الاستضافة السريعة للأعمال',
    title: 'سيرفرات سريعة ودومين مجاني لموقعك الجديد',
    desc: 'احصل على استضافة ووردبريس ومتاجر سريعة مع شهادة SSL مجانية ودعم عربي 24/7.',
    cta: 'ابدأ الآن',
    cpc: '$1.90',
    rpmEstimate: '$9.40',
  },
};

export const AdBanner: React.FC<AdBannerProps> = ({
  format,
  niche,
  showMetrics = false,
}) => {
  const ad = NICHE_ADS[niche];

  if (format === 'leaderboard') {
    return (
      <div className="w-full my-6">
        <div className="max-w-4xl mx-auto border border-dashed border-amber-500/40 rounded-2xl p-3 bg-gradient-to-r from-[#121218] via-[#1a1a24] to-[#121218] relative overflow-hidden transition-all hover:border-amber-400 shadow-lg">
          <div className="flex items-center justify-between text-[11px] text-amber-400/70 mb-1.5 px-1">
            <span className="flex items-center gap-1.5 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              إعلان Google ممول · AdSense Slot 728x90
            </span>
            {showMetrics && (
              <span className="text-amber-300 bg-amber-400/10 border border-amber-400/30 px-2 py-0.5 rounded font-mono font-bold">
                نقرة متوقعة: {ad.cpc} CPC | عائد الـ 1000 زيارة: {ad.rpmEstimate}
              </span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2.5 px-4 bg-[#0a0a0e] rounded-xl border border-amber-500/20 shadow-inner">
            <div className="flex-1 text-right">
              <div className="text-[11px] text-amber-400/80 font-medium">{ad.sponsor}</div>
              <div className="text-sm sm:text-base font-bold text-white line-clamp-1">{ad.title}</div>
              <div className="text-xs text-slate-400 line-clamp-1">{ad.desc}</div>
            </div>
            <button
              onClick={() => alert(`هذه مساحة إعلانية تجارية تفاعلية مدمجة للزوار القادمين من بحث جوجل.\nالمعلن: ${ad.sponsor}\nمتوسط سعر النقرة: ${ad.cpc}`)}
              className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-black font-black text-xs rounded-lg shadow-md shadow-amber-400/20 transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <span>{ad.cta}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (format === 'rectangle') {
    return (
      <div className="w-full border border-dashed border-amber-500/40 rounded-2xl p-3 bg-[#121218]">
        <div className="flex items-center justify-between text-[11px] text-amber-400/70 mb-2">
          <span>إعلان ممول · 300x250</span>
          {showMetrics && (
            <span className="text-amber-300 font-mono text-[10px]">
              CPC: {ad.cpc}
            </span>
          )}
        </div>
        <div className="bg-[#0a0a0e] rounded-xl p-4 border border-amber-500/20 text-center flex flex-col justify-between h-[210px]">
          <div>
            <div className="text-[11px] text-amber-400 font-medium mb-1">{ad.sponsor}</div>
            <h4 className="text-sm font-bold text-white leading-snug mb-2">{ad.title}</h4>
            <p className="text-xs text-slate-400 line-clamp-2">{ad.desc}</p>
          </div>
          <button
            onClick={() => alert(`مساحة إعلانية مستهدفة: ${ad.title}`)}
            className="w-full py-2 bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs rounded-lg transition-colors mt-3"
          >
            {ad.cta}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-amber-500/30 bg-[#121218] rounded-2xl p-4 my-4 flex items-center justify-between gap-4 shadow-md">
      <div>
        <div className="text-[11px] text-amber-400 font-mono">محتوى برعاية شركاء المنصة</div>
        <div className="text-sm font-bold text-white">{ad.title}</div>
        <div className="text-xs text-slate-400">{ad.desc}</div>
      </div>
      <button
        onClick={() => alert(`رابط العرض الترويجي: ${ad.sponsor}`)}
        className="px-3.5 py-1.5 text-xs font-extrabold bg-amber-400 hover:bg-amber-300 text-black rounded-lg transition-all whitespace-nowrap cursor-pointer"
      >
        {ad.cta}
      </button>
    </div>
  );
};
