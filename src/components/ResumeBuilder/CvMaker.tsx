import React, { useState } from 'react';
import { CvData } from '../../types';
import { Briefcase, Download, Printer, Sparkles, Plus, Trash2, Globe, MapPin, Mail, Phone, User } from 'lucide-react';
import confetti from 'canvas-confetti';

const DEMO_SYRIAN_GERMANY: CvData = {
  fullName: 'أحمد الحسين',
  jobTitle: 'مطور برمجيات Full Stack / Softwareentwickler',
  email: 'ahmad.alhussein@email.de',
  phone: '+49 176 12345678',
  countryCity: 'برلين، ألمانيا (Berlin, Germany)',
  residenceStatus: 'إقامة عمل في ألمانيا (Aufenthaltstitel §18b Abs. 1)',
  birthDate: '15.04.1994',
  summary: 'مهندس برمجيات ذو خبرة تزيد عن 5 سنوات في تطوير تطبيقات الويب الحديثة، أتقن React وNode.js وقواعد البيانات. أعيش في برلين وأبحث عن فرصة جديدة ضمن بيئة عمل تقنية مرنة ودولية.',
  photoUrl: '',
  skills: ['TypeScript & JavaScript', 'React & Next.js', 'Node.js & Express', 'PostgreSQL & Docker', 'Git & CI/CD', 'حل المشكلات البرمجية'],
  languages: [
    { name: 'العربية (Arabisch)', level: 'اللغة الأم (Muttersprache)' },
    { name: 'الألمانية (Deutsch)', level: 'B2 معتمد من معهد غوته' },
    { name: 'الإنجليزية (Englisch)', level: 'C1 طليق في بيئة العمل' },
  ],
  experiences: [
    {
      id: '1',
      role: 'مطور واجهات أمامية أول (Senior Frontend Developer)',
      company: 'TechNova Solutions GmbH',
      location: 'برلين، ألمانيا',
      startDate: '2022',
      endDate: 'حتى الآن',
      current: true,
      description: 'بناء واجهات مستخدم عالية الأداء، تحسين سرعة التطبيق بنسبة 35%، وقيادة فريق مكون من 4 مطورين.',
    },
    {
      id: '2',
      role: 'مطور برمجيات ويب (Web Developer)',
      company: 'Digital Solutions Co.',
      location: 'إسطنبول، تركيا',
      startDate: '2019',
      endDate: '2022',
      current: false,
      description: 'تطوير منصات التجارة الإلكترونية، ربط بوابات الدفع، وإدارة قواعد البيانات.',
    },
  ],
  education: [
    {
      id: '1',
      degree: 'بكالوريوس في هندسة الحواسيب والمعلوماتية',
      institution: 'جامعة دمشق (معادلة رسمياً في ألمانيا Anabin: H+)',
      location: 'دمشق، سوريا',
      year: '2012 - 2017',
    },
  ],
  template: 'german',
};

const DEMO_SYRIAN_TURKEY: CvData = {
  fullName: 'محمود الصالح',
  jobTitle: 'محاسب مالي وإداري / Muhasebeci',
  email: 'mahmoud.finance@gmail.com',
  phone: '+90 534 987 6543',
  countryCity: 'إسطنبول، تركيا (الفاتح)',
  residenceStatus: 'إقامة حماية مؤقتة (Geçici Koruma Kimlik) - تصريح عمل رسمي ساري',
  birthDate: '10.08.1991',
  summary: 'محاسب مالي معتمد بخبرة 6 سنوات في مسك الدفاتر، إعداد القوائم المالية، والتعامل مع برامج المحاسبة التركية مثل Logo و Mikro. ملم بضرائب الشركات التركية والقوانين التجارية.',
  photoUrl: '',
  skills: ['المحاسبة العامة والتكاليف', 'برامج Logo Go & Mikro', 'إعداد الإقرارات الضريبية KDV', 'Excel متقدم وتحليل مالي', 'إدارة المخزون'],
  languages: [
    { name: 'العربية', level: 'اللغة الأم' },
    { name: 'التركية (Türkçe)', level: 'C1 طلاقة تامة كتابة ومحادثة' },
    { name: 'الإنجليزية', level: 'B1 متوسط' },
  ],
  experiences: [
    {
      id: '1',
      role: 'مسؤول محاسبة وتدقيق مالي',
      company: 'شركة البشائر للاستيراد والتصدير',
      location: 'إسطنبول، تركيا',
      startDate: '2021',
      endDate: 'حتى الآن',
      current: true,
      description: 'إدارة الفواتير الإلكترونية E-Fatura، تدقيق القيود اليومية، وإعداد الرواتب الشهرية للموظفين.',
    },
    {
      id: '2',
      role: 'محاسب صندوق ومبيعات',
      company: 'مجموعة النور التجارية',
      location: 'غازي عنتاب، تركيا',
      startDate: '2018',
      endDate: '2021',
      current: false,
      description: 'متابعة حسابات الزبائن والموردين، مطابقة كشوفات الحسابات البنكية.',
    },
  ],
  education: [
    {
      id: '1',
      degree: 'إجازة في العلوم الاقتصادية (قسم المحاسبة)',
      institution: 'جامعة حلب',
      location: 'حلب، سوريا',
      year: '2011 - 2015',
    },
  ],
  template: 'modern',
};

export const CvMaker: React.FC = () => {
  const [cv, setCv] = useState<CvData>(DEMO_SYRIAN_GERMANY);

  const handlePrint = () => {
    window.print();
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.65 },
    });
  };

  const addExperience = () => {
    const newExp = {
      id: Date.now().toString(),
      role: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
    setCv((prev) => ({ ...prev, experiences: [...prev.experiences, newExp] }));
  };

  const removeExperience = (id: string) => {
    setCv((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((e) => e.id !== id),
    }));
  };

  const addLanguage = () => {
    setCv((prev) => ({
      ...prev,
      languages: [...prev.languages, { name: '', level: 'B1 متوسط' }],
    }));
  };

  const removeLanguage = (index: number) => {
    setCv((prev) => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="bg-[#121218] rounded-3xl border border-amber-500/20 shadow-2xl p-6 sm:p-8 text-slate-100">
      {/* Header & SEO hook in Black & Gold */}
      <div className="text-center max-w-2xl mx-auto mb-6 no-print">
        <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-amber-300 bg-amber-400/10 border border-amber-400/30 px-3.5 py-1.5 rounded-full mb-2 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>النموذج المعتمد للسوريين والمغتربين في تركيا وألمانيا والخليج</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-2">
          صانع السيرة الذاتية السريع (Lebenslauf & CV)
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          سيرة ذاتية متوافقة 100% مع معايير الـ Jobcenter ومكاتب العمل في ألمانيا وتركيا (ذكر مستويات اللغات A1-C2 وحالة الإقامة وتصريح العمل). تعبئة في دقيقة وطباعة وتحميل PDF فوراً بدون اشتراك.
        </p>
      </div>

      {/* Action / Mode Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-amber-500/20 no-print">
        {/* Quick Demo Pre-fillers */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">نماذج جاهزة بنقرة:</span>
          <button
            onClick={() => setCv(DEMO_SYRIAN_GERMANY)}
            className="text-xs px-3 py-1.5 rounded-xl border border-amber-500/30 bg-[#181822] hover:bg-amber-400 hover:text-black text-amber-300 font-bold transition-all cursor-pointer"
          >
            نموذج ألمانيا (Lebenslauf) 🇩🇪
          </button>
          <button
            onClick={() => setCv(DEMO_SYRIAN_TURKEY)}
            className="text-xs px-3 py-1.5 rounded-xl border border-amber-500/30 bg-[#181822] hover:bg-amber-400 hover:text-black text-amber-300 font-bold transition-all cursor-pointer"
          >
            نموذج تركيا (كيملك وتصريح عمل) 🇹🇷
          </button>
        </div>

        {/* Template Style Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">الستايل:</span>
          <select
            value={cv.template}
            onChange={(e) => setCv((p) => ({ ...p, template: e.target.value as any }))}
            className="text-xs border border-amber-500/30 rounded-xl px-2.5 py-1.5 bg-[#181822] text-amber-300 cursor-pointer"
          >
            <option value="german">النمط الألماني الرسمي (Lebenslauf)</option>
            <option value="modern">النمط العربي الحديث</option>
            <option value="gulf">النمط التنفيذي (Executive)</option>
          </select>
        </div>

        {/* Print / Download Button in Gold */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-black font-black text-xs rounded-xl shadow-lg shadow-amber-400/20 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>طباعة أو حفظ كملف PDF</span>
          </button>
        </div>
      </div>

      {/* Main Two Columns: Form Editor & Live A4 Sheet Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left / Top: Form Fields (5 cols) in Black & Gold */}
        <div className="lg:col-span-5 space-y-5 no-print max-h-[850px] overflow-y-auto pr-1">
          {/* Personal Info */}
          <div className="p-4 rounded-2xl border border-amber-500/20 bg-[#0a0a0e] space-y-3">
            <h4 className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-amber-400" />
              <span>البيانات الشخصية ومعلومات الاتصال</span>
            </h4>

            <div>
              <label className="block text-[11px] text-slate-400 mb-1">الاسم الكامل:</label>
              <input
                type="text"
                value={cv.fullName}
                onChange={(e) => setCv((p) => ({ ...p, fullName: e.target.value }))}
                className="w-full bg-[#181822] border border-amber-500/30 rounded-lg px-3 py-1.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 mb-1">المسمى الوظيفي المستهدف:</label>
              <input
                type="text"
                value={cv.jobTitle}
                onChange={(e) => setCv((p) => ({ ...p, jobTitle: e.target.value }))}
                className="w-full bg-[#181822] border border-amber-500/30 rounded-lg px-3 py-1.5 text-xs text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">البريد الإلكتروني:</label>
                <input
                  type="email"
                  value={cv.email}
                  onChange={(e) => setCv((p) => ({ ...p, email: e.target.value }))}
                  className="w-full bg-[#181822] border border-amber-500/30 rounded-lg px-3 py-1.5 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">رقم الهاتف:</label>
                <input
                  type="text"
                  value={cv.phone}
                  onChange={(e) => setCv((p) => ({ ...p, phone: e.target.value }))}
                  className="w-full bg-[#181822] border border-amber-500/30 rounded-lg px-3 py-1.5 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 mb-1">المدينة والإقامة الحالية:</label>
              <input
                type="text"
                value={cv.countryCity}
                onChange={(e) => setCv((p) => ({ ...p, countryCity: e.target.value }))}
                className="w-full bg-[#181822] border border-amber-500/30 rounded-lg px-3 py-1.5 text-xs text-white"
              />
            </div>

            {/* Special Field: Residence & Work Permit status */}
            <div className="p-2.5 rounded-xl bg-amber-400/10 border border-amber-400/40">
              <label className="block text-[11px] font-bold text-amber-300 mb-1">
                الوضع القانوني وتصريح العمل (هام جداً للشركات):
              </label>
              <input
                type="text"
                value={cv.residenceStatus}
                onChange={(e) => setCv((p) => ({ ...p, residenceStatus: e.target.value }))}
                placeholder="مثال: إقامة عمل سارية / كيملك Geçici Koruma / إقامة ألمانيا §18b"
                className="w-full bg-[#0a0a0e] border border-amber-400/40 rounded-lg px-2.5 py-1.5 text-xs text-amber-200"
              />
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 mb-1">نبذة مهنية موجزة:</label>
              <textarea
                rows={3}
                value={cv.summary}
                onChange={(e) => setCv((p) => ({ ...p, summary: e.target.value }))}
                className="w-full bg-[#181822] border border-amber-500/30 rounded-lg px-3 py-1.5 text-xs text-white"
              />
            </div>
          </div>

          {/* Languages Section */}
          <div className="p-4 rounded-2xl border border-amber-500/20 bg-[#0a0a0e] space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span>اللغات ومستوياتها (مهم جداً في أوروبا وتركيا)</span>
              </h4>
              <button
                type="button"
                onClick={addLanguage}
                className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-0.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>إضافة لغة</span>
              </button>
            </div>

            <div className="space-y-2">
              {cv.languages.map((lang, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={lang.name}
                    onChange={(e) => {
                      const updated = [...cv.languages];
                      updated[idx].name = e.target.value;
                      setCv((p) => ({ ...p, languages: updated }));
                    }}
                    placeholder="اللغة (مثال: ألماني)"
                    className="flex-1 bg-[#181822] border border-amber-500/30 rounded-lg px-2.5 py-1 text-xs text-white"
                  />
                  <input
                    type="text"
                    value={lang.level}
                    onChange={(e) => {
                      const updated = [...cv.languages];
                      updated[idx].level = e.target.value;
                      setCv((p) => ({ ...p, languages: updated }));
                    }}
                    placeholder="المستوى (B2 / طليق)"
                    className="w-32 bg-[#181822] border border-amber-500/30 rounded-lg px-2.5 py-1 text-xs text-amber-300"
                  />
                  {cv.languages.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeLanguage(idx)}
                      className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Work Experience */}
          <div className="p-4 rounded-2xl border border-amber-500/20 bg-[#0a0a0e] space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-amber-400" />
                <span>الخبرات المهنية وسجل العمل</span>
              </h4>
              <button
                type="button"
                onClick={addExperience}
                className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-0.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>إضافة خبرة</span>
              </button>
            </div>

            {cv.experiences.map((exp, idx) => (
              <div key={exp.id} className="p-3 bg-[#181822] border border-amber-500/20 rounded-xl space-y-2 relative">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-bold text-amber-300">خبرة #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeExperience(exp.id)}
                    className="text-red-400 hover:text-red-300 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={exp.role}
                    onChange={(e) => {
                      const updated = [...cv.experiences];
                      updated[idx].role = e.target.value;
                      setCv((p) => ({ ...p, experiences: updated }));
                    }}
                    placeholder="المسمى الوظيفي"
                    className="bg-[#0a0a0e] border border-amber-500/30 rounded px-2 py-1 text-xs text-white"
                  />
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => {
                      const updated = [...cv.experiences];
                      updated[idx].company = e.target.value;
                      setCv((p) => ({ ...p, experiences: updated }));
                    }}
                    placeholder="اسم الشركة"
                    className="bg-[#0a0a0e] border border-amber-500/30 rounded px-2 py-1 text-xs text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={exp.startDate}
                    onChange={(e) => {
                      const updated = [...cv.experiences];
                      updated[idx].startDate = e.target.value;
                      setCv((p) => ({ ...p, experiences: updated }));
                    }}
                    placeholder="سنة البدء (مثال: 2021)"
                    className="bg-[#0a0a0e] border border-amber-500/30 rounded px-2 py-1 text-xs text-white"
                  />
                  <input
                    type="text"
                    value={exp.endDate}
                    onChange={(e) => {
                      const updated = [...cv.experiences];
                      updated[idx].endDate = e.target.value;
                      setCv((p) => ({ ...p, experiences: updated }));
                    }}
                    placeholder="سنة الانتهاء أو حتى الآن"
                    className="bg-[#0a0a0e] border border-amber-500/30 rounded px-2 py-1 text-xs text-white"
                  />
                </div>

                <textarea
                  rows={2}
                  value={exp.description}
                  onChange={(e) => {
                    const updated = [...cv.experiences];
                    updated[idx].description = e.target.value;
                    setCv((p) => ({ ...p, experiences: updated }));
                  }}
                  placeholder="المهام والإنجازات..."
                  className="w-full bg-[#0a0a0e] border border-amber-500/30 rounded px-2 py-1 text-xs text-white"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Live A4 Sheet Preview (Clean white paper standard for official CV submission) */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="w-full max-w-[620px] bg-white border border-slate-300 shadow-2xl rounded-2xl p-6 sm:p-8 text-slate-800 text-right print:border-none print:shadow-none print:p-0 print:m-0 print:max-w-none">
            {/* CV Header */}
            <div className={`pb-5 border-b ${cv.template === 'german' ? 'border-slate-800' : 'border-slate-200'}`}>
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div>
                  <h1 className="text-2xl font-black text-slate-900 mb-1">{cv.fullName}</h1>
                  <div className="text-sm font-bold text-amber-600 mb-2">{cv.jobTitle}</div>
                  
                  {/* Contact Badges */}
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3 text-slate-400" />
                      {cv.email}
                    </span>
                    <span className="flex items-center gap-1 font-mono">
                      <Phone className="w-3 h-3 text-slate-400" />
                      {cv.phone}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {cv.countryCity}
                    </span>
                  </div>

                  {/* Residence Trust Stamp */}
                  {cv.residenceStatus && (
                    <div className="mt-2 text-[11px] text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block font-semibold">
                      الحالة القانونية: {cv.residenceStatus}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Profile Summary */}
            {cv.summary && (
              <div className="py-4 border-b border-slate-100">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <span>النبذة المهنية / Profil</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">{cv.summary}</p>
              </div>
            )}

            {/* Experiences Section */}
            {cv.experiences.length > 0 && (
              <div className="py-4 border-b border-slate-100">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                  <span>الخبرات العملية / Berufserfahrung</span>
                </h3>
                <div className="space-y-4">
                  {cv.experiences.map((exp) => (
                    <div key={exp.id} className="text-xs">
                      <div className="flex justify-between items-baseline font-bold text-slate-900">
                        <span>{exp.role}</span>
                        <span className="text-[11px] text-slate-500 font-normal tabular-nums">
                          {exp.startDate} - {exp.endDate}
                        </span>
                      </div>
                      <div className="text-[11px] text-amber-600 font-medium mb-1">
                        {exp.company} {exp.location ? `· ${exp.location}` : ''}
                      </div>
                      {exp.description && (
                        <p className="text-[11px] text-slate-600 leading-relaxed">{exp.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education Section */}
            {cv.education.length > 0 && (
              <div className="py-4 border-b border-slate-100">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  <span>التعليم والشهادات / Ausbildung</span>
                </h3>
                <div className="space-y-2">
                  {cv.education.map((edu) => (
                    <div key={edu.id} className="text-xs">
                      <div className="flex justify-between font-bold text-slate-900">
                        <span>{edu.degree}</span>
                        <span className="text-[11px] text-slate-500 font-normal">{edu.year}</span>
                      </div>
                      <div className="text-[11px] text-slate-600">
                        {edu.institution} {edu.location ? `· ${edu.location}` : ''}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Languages & Skills Grid */}
            <div className="pt-4 grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  <span>اللغات / Sprachen</span>
                </h3>
                <div className="space-y-1 text-xs">
                  {cv.languages.map((lang, idx) => (
                    <div key={idx} className="flex justify-between text-[11px]">
                      <span className="font-semibold text-slate-800">{lang.name}</span>
                      <span className="text-slate-500">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  <span>المهارات / Kenntnisse</span>
                </h3>
                <div className="flex flex-wrap gap-1">
                  {cv.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Print CTA in Gold */}
          <div className="mt-4 no-print text-center">
            <button
              onClick={handlePrint}
              className="px-8 py-3 bg-amber-400 hover:bg-amber-300 text-black font-black text-xs rounded-xl shadow-lg shadow-amber-400/25 transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>تحميل أو طباعة السيرة الذاتية (بدون علامة مائية وبالمجان)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
