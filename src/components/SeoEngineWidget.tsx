import React, { useState } from 'react';
import { TOP_KEYWORDS } from '../data/seoData';
import { TrendingUp, Search, Calculator, Target, ShieldCheck, Zap } from 'lucide-react';

export const SeoEngineWidget: React.FC = () => {
  const [dailyVisitors, setDailyVisitors] = useState<number>(15000);
  const [avgRpm, setAvgRpm] = useState<number>(3.8);

  const monthlyVisitors = dailyVisitors * 30;
  const monthlyEarnings = Math.round((monthlyVisitors / 1000) * avgRpm);
  const yearlyEarnings = monthlyEarnings * 12;

  return (
    <section id="seo-machine" className="py-14 bg-[#0a0a0e] border-y border-amber-500/20 relative z-10 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header in Gold & Black */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 bg-amber-400/10 border border-amber-400/30 px-3.5 py-1.5 rounded-full mb-3 shadow-xs">
            <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
            <span>المنطق الاستثماري للمشروع · استراتيجية آلة الإعلانات الذاتية</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-3">
            بدلاً من البحث عن عملاء — اجعل جوجل يرسلهم إليك مجاناً
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            محركات البحث تستقبل شهرياً مئات الآلاف من الباحثين عن أدوات سريعة دون تسجيل. كل نقرة "تحميل" تمر عبر مساحات إعلانية مربحة بنظام AdSense وعروض التسويق بالعمولة.
          </p>
        </div>

        {/* 3 Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="p-6 rounded-2xl bg-[#121218] border border-amber-500/20 shadow-lg hover:border-amber-400/50 transition-all">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center font-bold mb-3 border border-amber-400/20">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-1.5">الزر الواحد: رفع ← تحميل</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              تصفير معدل الارتداد (Bounce Rate): الزائر لا يواجه شاشات تسجيل دخول؛ ينجز معاملته في 5 ثوانٍ، مما يدفع جوجل لرفع ترتيب الموقع للصفحة الأولى.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#121218] border border-amber-500/20 shadow-lg hover:border-amber-400/50 transition-all">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center font-bold mb-3 border border-amber-400/20">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-1.5">استهداف الكلمات ذات القيمة العالية</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              سوريون في تركيا وألمانيا، وتجار إنستغرام في السعودية؛ هذه الجماهير تترافق مع إعلانات محامين وشحن واستضافة ذات أعلى سعر للنقرة (High CPC).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#121218] border border-amber-500/20 shadow-lg hover:border-amber-400/50 transition-all">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center font-bold mb-3 border border-amber-400/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-1.5">معالجة آمنة في المتصفح 100%</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              تكلفة استضافة تقارب الصفر (Zero Server Load)! دمج وتوقيع وضغط الملفات يتم داخل معالج جهاز الزائر، مما يعني استيعاب ملايين الزوار بأرخص سيرفر.
            </p>
          </div>
        </div>

        {/* Live Traffic Revenue Calculator in Black & Cyber Gold */}
        <div className="bg-gradient-to-br from-[#121218] via-[#161622] to-[#121218] text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-amber-500/30 mb-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-2">
                <Calculator className="w-4 h-4" />
                <span>محاكي العائد الإعلاني التقديري (AdSense Engine)</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black mb-2 text-white">
                كم تربح المنصة شهرياً من الزوار القادمين من بحث جوجل؟
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mb-6">
                حساب العائد بناءً على الترتيب في الكلمات المفتاحية الأكثر بحثاً ونسبة النقر التلقائية.
              </p>

              {/* Slider for Visitors */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>عدد الزوار اليومي من بحث جوجل:</span>
                    <span className="font-extrabold text-amber-400 text-sm tabular-nums">
                      {dailyVisitors.toLocaleString('ar-EG')} زائر / يوم
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="100000"
                    step="1000"
                    value={dailyVisitors}
                    onChange={(e) => setDailyVisitors(Number(e.target.value))}
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>1,000 زائر</span>
                    <span>50,000 زائر</span>
                    <span>100,000 زائر</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>متوسط عائد الألف ظهور (RPM):</span>
                    <span className="font-bold text-amber-400 text-sm tabular-nums">${avgRpm.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="1.5"
                    max="8.0"
                    step="0.1"
                    value={avgRpm}
                    onChange={(e) => setAvgRpm(Number(e.target.value))}
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Earnings Output Card */}
            <div className="w-full lg:w-72 bg-[#0a0a0e] rounded-2xl p-6 border-2 border-amber-400/40 text-center flex flex-col justify-center shadow-xl shadow-amber-500/10">
              <div className="text-xs text-slate-400 mb-1">العائد الشهري المتوقع</div>
              <div className="text-3xl sm:text-4xl font-black text-amber-400 tabular-nums mb-1">
                ${monthlyEarnings.toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-400 mb-4">
                أي ما يعادل {(monthlyEarnings * 3.75).toLocaleString()} ريال سعودي شهرياً
              </div>

              <div className="border-t border-amber-500/20 pt-3 text-xs text-slate-300 flex justify-between">
                <span>العائد السنوي المتوقع:</span>
                <span className="font-extrabold text-amber-300 tabular-nums">${yearlyEarnings.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Keywords Grid in Black & Gold */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Search className="w-4 h-4 text-amber-400" />
              <span>أبرز الكلمات البحثية المليونية المستهدفة في هذه المنصة</span>
            </h3>
            <span className="text-xs text-amber-400/80 font-mono">بيانات محرك بحث Google</span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-amber-500/20 bg-[#121218]">
            <table className="w-full text-right text-xs">
              <thead className="bg-[#181824] text-amber-400 font-bold border-b border-amber-500/20">
                <tr>
                  <th className="py-3 px-4">الكلمة المفتاحية (Google Query)</th>
                  <th className="py-3 px-4">عمليات البحث الشهرية</th>
                  <th className="py-3 px-4">المنافسة</th>
                  <th className="py-3 px-4">متوسط سعر النقرة (CPC)</th>
                  <th className="py-3 px-4">الجمهور المستهدف والفرصة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-500/10">
                {TOP_KEYWORDS.map((kw, i) => (
                  <tr key={i} className="hover:bg-amber-400/5 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-white">{kw.keyword}</td>
                    <td className="py-3.5 px-4 text-amber-400 font-extrabold tabular-nums">{kw.monthlySearches}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-400/10 text-amber-300 border border-amber-400/30">
                        {kw.competition}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-amber-300 tabular-nums">{kw.avgCpc}</td>
                    <td className="py-3.5 px-4 text-slate-300">{kw.targetAudience}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
