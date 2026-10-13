import React, { useState, useRef } from 'react';
import { mergePdfFiles, triggerFileDownload } from '../../utils/pdfTools';
import { FileUp, FileText, ArrowUp, ArrowDown, Trash2, CheckCircle2, Download, ShieldCheck, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export const PdfMerge: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selected = Array.from(e.target.files).filter(
        (f) => f.type === 'application/pdf' || f.name.endsWith('.pdf')
      );
      if (selected.length === 0) {
        setErrorMsg('يرجى اختيار ملفات بصيغة PDF صالحة');
        return;
      }
      setErrorMsg(null);
      setFiles((prev) => [...prev, ...selected]);
      setIsDone(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const selected = Array.from(e.dataTransfer.files).filter(
        (f) => f.type === 'application/pdf' || f.name.endsWith('.pdf')
      );
      if (selected.length === 0) {
        setErrorMsg('يرجى سحب ملفات بصيغة PDF صالحة');
        return;
      }
      setErrorMsg(null);
      setFiles((prev) => [...prev, ...selected]);
      setIsDone(false);
    }
  };

  const moveFile = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= files.length) return;
    const updated = [...files];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setFiles(updated);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setIsDone(false);
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      setErrorMsg('يرجى اختيار ملفين PDF على الأقل للدمج');
      return;
    }

    try {
      setIsProcessing(true);
      setErrorMsg(null);

      const mergedBytes = await mergePdfFiles(files);
      const outputName = `ملف-مدمج-${new Date().toISOString().slice(0, 10)}.pdf`;

      triggerFileDownload(mergedBytes, outputName);
      setIsDone(true);

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.65 },
      });
    } catch (err: any) {
      console.error(err);
      setErrorMsg('حدث خطأ أثناء معالجة بعض صفحات الـ PDF. تأكد أن الملفات غير محمية بكلمة سر.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-[#121218] rounded-3xl border border-amber-500/20 shadow-2xl p-6 sm:p-8 text-slate-100">
      {/* Title & SEO Intent */}
      <div className="text-center max-w-xl mx-auto mb-6">
        <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">دمج ملفات PDF مجاناً في ملف واحد</h2>
        <p className="text-xs sm:text-sm text-slate-400">
          اجمع مستنداتك وعقودك وأوراقك الرسمية بسرعة البرق. بدون تسجيل، وبدون حدود لعدد الصفحات، ومعالجة 100% داخل جهازك.
        </p>
      </div>

      {/* Drag & Drop Box in Cyber Yellow & Black */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-amber-400/50 hover:border-amber-400 bg-amber-400/5 hover:bg-amber-400/10 rounded-2xl p-8 sm:p-10 text-center cursor-pointer transition-all mb-6 group shadow-inner"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
        <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-400/10 text-amber-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform border border-amber-400/30">
          <FileUp className="w-8 h-8" />
        </div>
        <div className="text-base font-bold text-white mb-1">
          اسحب وأفلت ملفات الـ PDF هنا، أو انقر للاختيار من جهازك
        </div>
        <div className="text-xs text-amber-400/70 font-mono">
          يمكنك تحديد عدة ملفات معاً · الحد الأقصى للحجم مفتوح
        </div>
      </div>

      {errorMsg && (
        <div className="mb-5 p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Uploaded Files List */}
      {files.length > 0 && (
        <div className="space-y-3 mb-8">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>الملفات المختارة ({files.length}): يمكنك إعادة الترتيب بالأسهم</span>
            <button
              onClick={() => setFiles([])}
              className="text-red-400 hover:underline text-xs cursor-pointer"
            >
              مسح الكل
            </button>
          </div>

          <div className="divide-y divide-amber-500/10 border border-amber-500/20 rounded-2xl overflow-hidden bg-[#0a0a0e]">
            {files.map((file, idx) => (
              <div key={idx} className="p-3.5 flex items-center justify-between gap-3 hover:bg-amber-400/5 transition-colors">
                <div className="flex items-center gap-3 overflow-hidden">
                  <span className="w-6 h-6 rounded-md bg-amber-400/15 text-amber-300 font-bold text-xs flex items-center justify-center shrink-0 border border-amber-400/30">
                    {idx + 1}
                  </span>
                  <FileText className="w-5 h-5 text-amber-400 shrink-0" />
                  <div className="overflow-hidden">
                    <div className="text-sm font-semibold text-white truncate">{file.name}</div>
                    <div className="text-[11px] text-amber-400/70 tabular-nums">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => moveFile(idx, 'up')}
                    disabled={idx === 0}
                    className="p-1.5 text-slate-400 hover:text-amber-400 disabled:opacity-20 rounded cursor-pointer"
                    title="تحريك لأعلى"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => moveFile(idx, 'down')}
                    disabled={idx === files.length - 1}
                    className="p-1.5 text-slate-400 hover:text-amber-400 disabled:opacity-20 rounded cursor-pointer"
                    title="تحريك لأسفل"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => removeFile(idx)}
                    className="p-1.5 text-red-400 hover:text-red-300 rounded cursor-pointer"
                    title="حذف الملف"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Single Action Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-amber-500/15">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
          <span>خصوصية كاملة: تتم معالجة ملفاتك داخل متصفحك ولا يتم رفعها لأي سيرفر.</span>
        </div>

        <button
          onClick={handleMerge}
          disabled={files.length < 2 || isProcessing}
          className="w-full sm:w-auto px-8 py-3 bg-amber-400 hover:bg-amber-300 disabled:bg-slate-800 disabled:text-slate-600 text-black font-black text-sm rounded-xl shadow-lg shadow-amber-400/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
        >
          {isProcessing ? (
            <>
              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              <span>جاري دمج الصفحات...</span>
            </>
          ) : isDone ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              <span>تم التحميل! انقر للدمج مجدداً</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span>دمج وتحميل الملف المدمج فوراً</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
