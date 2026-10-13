import React, { useState, useRef } from 'react';
import { compressPdfFile, triggerFileDownload } from '../../utils/pdfTools';
import { FileText, Minimize2, CheckCircle2, Download, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const PdfCompress: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [level, setLevel] = useState<'light' | 'balanced' | 'max'>('balanced');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<{
    originalSize: number;
    newSize: number;
    savedPercent: number;
    bytes: Uint8Array;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      if (selected.type === 'application/pdf' || selected.name.endsWith('.pdf')) {
        setFile(selected);
        setResult(null);
      }
    }
  };

  const handleCompress = async () => {
    if (!file) return;

    try {
      setIsProcessing(true);
      const res = await compressPdfFile(file, level);
      setResult(res);
      triggerFileDownload(res.bytes, `مضغوط-${file.name}`);

      confetti({
        particleCount: 40,
        spread: 55,
        origin: { y: 0.65 },
      });
    } catch (err) {
      console.error(err);
      alert('تعذر ضغط الملف. تأكد من أن الملف سليم وغير محمي.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-[#121218] rounded-3xl border border-amber-500/20 shadow-2xl p-6 sm:p-8 text-slate-100">
      <div className="text-center max-w-xl mx-auto mb-6">
        <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">ضغط وتقليص حجم ملف PDF</h2>
        <p className="text-xs sm:text-sm text-slate-400">
          الحل الأمثل لمواقع السفارات، بوابات الجامعات والـ E-Devlet التي تشترط حجماً أقل من 2MB أو 5MB. مع الحفاظ التام على جودة الخطوط.
        </p>
      </div>

      {!file ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-amber-400/50 hover:border-amber-400 bg-amber-400/5 hover:bg-amber-400/10 rounded-2xl p-10 text-center cursor-pointer transition-all mb-6 group shadow-inner"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-400/10 text-amber-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform border border-amber-400/30">
            <Minimize2 className="w-8 h-8" />
          </div>
          <div className="text-base font-bold text-white mb-1">
            اختر ملف PDF المراد ضغطه
          </div>
          <div className="text-xs text-amber-400/70 font-mono">
            انقر هنا للاختيار أو اسحب الملف مباشرة
          </div>
        </div>
      ) : (
        <div className="space-y-6 mb-6">
          {/* File Card in Dark Black & Gold */}
          <div className="p-4 rounded-2xl border border-amber-500/20 bg-[#0a0a0e] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-amber-400 shrink-0" />
              <div>
                <div className="text-sm font-bold text-white">{file.name}</div>
                <div className="text-xs text-slate-400">
                  الحجم الحالي:{' '}
                  <span className="font-mono font-bold text-amber-300">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                setFile(null);
                setResult(null);
              }}
              className="text-xs text-slate-400 hover:text-red-400 cursor-pointer"
            >
              تغيير الملف
            </button>
          </div>

          {/* Compression Level Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2">
              اختر مستوى الضغط المطلوب:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setLevel('light')}
                className={`p-3.5 rounded-2xl border text-right transition-all cursor-pointer ${
                  level === 'light'
                    ? 'border-amber-400 bg-amber-400/15 shadow-md shadow-amber-400/10'
                    : 'border-amber-500/20 bg-[#0a0a0e] hover:bg-[#181822]'
                }`}
              >
                <div className="text-xs font-bold text-white mb-0.5">ضغط خفيف (جودة فائقة)</div>
                <div className="text-[11px] text-slate-400">تخفيض 15-25% مع جودة طباعة كاملة</div>
              </button>

              <button
                type="button"
                onClick={() => setLevel('balanced')}
                className={`p-3.5 rounded-2xl border text-right transition-all cursor-pointer ${
                  level === 'balanced'
                    ? 'border-amber-400 bg-amber-400/15 shadow-md shadow-amber-400/10'
                    : 'border-amber-500/20 bg-[#0a0a0e] hover:bg-[#181822]'
                }`}
              >
                <div className="text-xs font-bold text-amber-300 mb-0.5 flex items-center gap-1">
                  <span>ضغط متوازن (موصى به)</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <div className="text-[11px] text-slate-400">مثالي للتقديم على الجامعات والوظائف</div>
              </button>

              <button
                type="button"
                onClick={() => setLevel('max')}
                className={`p-3.5 rounded-2xl border text-right transition-all cursor-pointer ${
                  level === 'max'
                    ? 'border-amber-400 bg-amber-400/15 shadow-md shadow-amber-400/10'
                    : 'border-amber-500/20 bg-[#0a0a0e] hover:bg-[#181822]'
                }`}
              >
                <div className="text-xs font-bold text-white mb-0.5">أقصى تقليص للحجم</div>
                <div className="text-[11px] text-slate-400">للملفات التي يجب أن تكون أقل من 1MB</div>
              </button>
            </div>
          </div>

          {/* Result Card if calculated */}
          {result && (
            <div className="p-4 rounded-2xl bg-amber-400/10 border border-amber-400/40 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-amber-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white">
                    تم تقليص حجم الملف بنجاح! تم توفير {result.savedPercent}% من الحجم
                  </div>
                  <div className="text-xs text-amber-300 flex items-center gap-2 mt-0.5 font-mono">
                    <span className="line-through text-slate-400">{(result.originalSize / 1024 / 1024).toFixed(2)} MB</span>
                    <ArrowRight className="w-3 h-3 text-amber-400" />
                    <span className="font-extrabold text-amber-300">{(result.newSize / 1024 / 1024).toFixed(2)} MB</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => triggerFileDownload(result.bytes, `مضغوط-${file.name}`)}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>إعادة تحميل الملف</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-amber-500/15">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
          <span>ملفاتك لا تغادر متصفحك أبداً — خصوصية بياناتك مضمونة بنسبة 100%.</span>
        </div>

        {file && (
          <button
            onClick={handleCompress}
            disabled={isProcessing}
            className="w-full sm:w-auto px-8 py-3 bg-amber-400 hover:bg-amber-300 disabled:bg-slate-800 disabled:text-slate-600 text-black font-black text-sm rounded-xl shadow-lg shadow-amber-400/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isProcessing ? (
              <>
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                <span>جاري معالجة وتقليص الحجم...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>ضغط وتحميل الملف فوراً</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};
