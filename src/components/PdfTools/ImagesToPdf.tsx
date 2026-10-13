import React, { useState, useRef } from 'react';
import { convertImagesToPdf, triggerFileDownload } from '../../utils/pdfTools';
import { Image, Trash2, CheckCircle2, Download, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ImagesToPdf: React.FC = () => {
  const [images, setImages] = useState<{ file: File; preview: string }[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (filesList: FileList | null) => {
    if (!filesList || filesList.length === 0) return;
    const selected = Array.from(filesList).filter((f) => f.type.startsWith('image/'));
    const mapped = selected.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...mapped]);
    setIsDone(false);
  };

  const removeImg = (index: number) => {
    URL.revokeObjectURL(images[index].preview);
    setImages((prev) => prev.filter((_, i) => i !== index));
    setIsDone(false);
  };

  const handleConvert = async () => {
    if (images.length === 0) return;

    try {
      setIsProcessing(true);
      const pdfBytes = await convertImagesToPdf(images.map((img) => img.file));
      triggerFileDownload(pdfBytes, `مستند-صور-${new Date().toISOString().slice(0, 10)}.pdf`);
      setIsDone(true);

      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.65 },
      });
    } catch (err) {
      console.error(err);
      alert('حدث خطأ أثناء تحويل الصور إلى PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-[#121218] rounded-3xl border border-amber-500/20 shadow-2xl p-6 sm:p-8 text-slate-100">
      <div className="text-center max-w-xl mx-auto mb-6">
        <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">تحويل الصور (JPG / PNG) إلى ملف PDF</h2>
        <p className="text-xs sm:text-sm text-slate-400">
          حوّل صور الوثائق، الفواتير، الهويات، أو تصاميم المنتجات إلى مستند PDF واحد منسق وقياسي A4 صالح للطباعة والإرسال.
        </p>
      </div>

      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-amber-400/50 hover:border-amber-400 bg-amber-400/5 hover:bg-amber-400/10 rounded-2xl p-8 sm:p-10 text-center cursor-pointer transition-all mb-6 group shadow-inner"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png, image/jpeg, image/webp"
          multiple
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />
        <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-400/10 text-amber-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform border border-amber-400/30">
          <Image className="w-8 h-8" />
        </div>
        <div className="text-base font-bold text-white mb-1">
          اختر الصور أو اسحبها هنا
        </div>
        <div className="text-xs text-amber-400/70 font-mono">
          JPG, PNG, WebP · يمكنك اختيار صور متعددة معاً
        </div>
      </div>

      {images.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium mb-3">
            <span>الصور المحددة ({images.length} صفحة):</span>
            <button
              onClick={() => {
                images.forEach((img) => URL.revokeObjectURL(img.preview));
                setImages([]);
              }}
              className="text-red-400 hover:underline text-xs cursor-pointer"
            >
              مسح الكل
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {images.map((img, idx) => (
              <div
                key={idx}
                className="relative group rounded-2xl overflow-hidden border border-amber-500/20 bg-[#0a0a0e] aspect-square shadow-sm"
              >
                <img
                  src={img.preview}
                  alt={`صفحة ${idx + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-1 right-1 bg-black/80 text-amber-300 text-[10px] px-1.5 py-0.5 rounded font-mono border border-amber-400/30">
                  ص {idx + 1}
                </div>
                <button
                  type="button"
                  onClick={() => removeImg(idx)}
                  className="absolute bottom-1 right-1 p-1 bg-red-600 hover:bg-red-700 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  title="حذف"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-amber-500/15">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
          <span>تجميع وتحويل الصور محلياً بسرعة وبجودة أصلية.</span>
        </div>

        <button
          onClick={handleConvert}
          disabled={images.length === 0 || isProcessing}
          className="w-full sm:w-auto px-8 py-3 bg-amber-400 hover:bg-amber-300 disabled:bg-slate-800 disabled:text-slate-600 text-black font-black text-sm rounded-xl shadow-lg shadow-amber-400/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          {isProcessing ? (
            <>
              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              <span>جاري تجميع الـ PDF...</span>
            </>
          ) : isDone ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              <span>تم التحميل! تحويل دفعة أخرى</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span>تحويل وتحميل الـ PDF فوراً</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
