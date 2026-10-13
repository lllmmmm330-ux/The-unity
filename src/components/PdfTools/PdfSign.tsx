import React, { useState, useRef, useEffect } from 'react';
import { signPdfDocument, triggerFileDownload } from '../../utils/pdfTools';
import { FileUp, FileText, PenTool, Eraser, CheckCircle2, Download, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export const PdfSign: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [inkColor, setInkColor] = useState<string>('#FACC15'); // Gold signature ink
  const [signatureMode, setSignatureMode] = useState<'draw' | 'type'>('draw');
  const [typedName, setTypedName] = useState<string>('محمد أحمد');
  const [hasSignature, setHasSignature] = useState(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [xPercent, setXPercent] = useState<number>(65);
  const [yPercent, setYPercent] = useState<number>(15);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = inkColor;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, [inkColor, signatureMode]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    isDrawing.current = true;
    setHasSignature(true);
    setIsDone(false);

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    isDrawing.current = false;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  const getSignatureDataUrl = (): string => {
    if (signatureMode === 'type') {
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = 300;
      tempCanvas.height = 120;
      const ctx = tempCanvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = inkColor;
        ctx.font = 'italic bold 32px "Cairo", cursive, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(typedName, 150, 60);
      }
      return tempCanvas.toDataURL('image/png');
    }

    if (canvasRef.current) {
      return canvasRef.current.toDataURL('image/png');
    }
    return '';
  };

  const handleSignPdf = async () => {
    if (!file) return;

    const sigDataUrl = getSignatureDataUrl();
    if (!sigDataUrl || (signatureMode === 'draw' && !hasSignature)) {
      alert('يرجى رسم توقيعك أولاً في المربع المخصص');
      return;
    }

    try {
      setIsProcessing(true);
      const signedBytes = await signPdfDocument(file, sigDataUrl, {
        pageNumber,
        xPercent,
        yPercent,
        stampWidth: 150,
        stampHeight: 65,
      });

      triggerFileDownload(signedBytes, `موقع-${file.name}`);
      setIsDone(true);

      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.65 },
      });
    } catch (err) {
      console.error(err);
      alert('حدث خطأ أثناء وضع التوقيع على الملف. يرجى التأكد من الملف.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-[#121218] rounded-3xl border border-amber-500/20 shadow-2xl p-6 sm:p-8 text-slate-100">
      <div className="text-center max-w-xl mx-auto mb-6">
        <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">توقيع ملفات PDF إلكترونياً بدون طباعة</h2>
        <p className="text-xs sm:text-sm text-slate-400">
          وقّع عقودك، أوراق الإيجار، المعاملات البنكية واستمارات العمل مباشرة من هاتفك أو حاسوبك دون الحاجة لطابعة أو سكانر.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
        {/* Step 1: Upload or Document Info */}
        <div className="space-y-4">
          <div className="text-xs font-bold text-amber-400">1. رفع المستند:</div>
          {!file ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-amber-400/40 hover:border-amber-400 bg-amber-400/5 hover:bg-amber-400/10 rounded-2xl p-8 text-center cursor-pointer transition-all"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setFile(e.target.files[0]);
                  }
                }}
                className="hidden"
              />
              <FileUp className="w-8 h-8 text-amber-400 mx-auto mb-2" />
              <div className="text-sm font-bold text-white">انقر لاختيار ملف الـ PDF</div>
              <div className="text-xs text-amber-400/70 font-mono">عقود، استمارات، أوراق رسمية</div>
            </div>
          ) : (
            <div className="p-3.5 rounded-2xl border border-amber-500/20 bg-[#0a0a0e] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-amber-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white truncate max-w-[200px]">{file.name}</div>
                  <div className="text-[11px] text-amber-400/70">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                </div>
              </div>
              <button
                onClick={() => setFile(null)}
                className="text-xs text-slate-400 hover:text-red-400 cursor-pointer"
              >
                تغيير
              </button>
            </div>
          )}

          {/* Placement Settings */}
          {file && (
            <div className="p-4 rounded-2xl border border-amber-500/20 bg-[#0a0a0e] space-y-3">
              <div className="text-xs font-bold text-amber-300">موضع التوقيع على المستند:</div>
              
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">رقم الصفحة:</label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={pageNumber}
                    onChange={(e) => setPageNumber(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full bg-[#181822] border border-amber-500/30 rounded-lg px-2.5 py-1.5 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">الموقع المفضل:</label>
                  <select
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === 'bottom-right') {
                        setXPercent(65);
                        setYPercent(15);
                      } else if (val === 'bottom-left') {
                        setXPercent(15);
                        setYPercent(15);
                      } else if (val === 'bottom-center') {
                        setXPercent(40);
                        setYPercent(15);
                      }
                    }}
                    className="w-full bg-[#181822] border border-amber-500/30 rounded-lg px-2 py-1.5 text-xs text-white cursor-pointer"
                  >
                    <option value="bottom-right">أسفل اليمين (المعتاد بالعربي)</option>
                    <option value="bottom-left">أسفل اليسار (المعتاد بالأجنبي)</option>
                    <option value="bottom-center">وسط أسفل الصفحة</option>
                  </select>
                </div>
              </div>

              {/* Visual Mini Representation */}
              <div className="text-[11px] text-slate-400">
                معاينة موضع التوقيع:
                <div className="relative w-full h-24 bg-[#14141c] border border-amber-500/20 rounded-xl mt-1 p-2">
                  <div className="w-12 h-1 bg-amber-400/20 rounded mb-1"></div>
                  <div className="w-24 h-1 bg-amber-400/20 rounded mb-1"></div>
                  <div className="w-16 h-1 bg-amber-400/20 rounded mb-1"></div>
                  <div
                    style={{
                      position: 'absolute',
                      left: `${xPercent}%`,
                      bottom: `${yPercent}%`,
                      transform: 'translate(-50%, 50%)',
                    }}
                    className="px-2 py-0.5 border border-dashed border-amber-400 bg-amber-400/15 rounded text-[9px] text-amber-300 font-bold"
                  >
                    موضع التوقيع ✍️
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Step 2: Signature Drawing Pad */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-400">2. ارسم أو اكتب توقيعك:</span>
            <div className="flex items-center gap-1 bg-[#0a0a0e] p-0.5 rounded-lg border border-amber-500/20 text-xs">
              <button
                type="button"
                onClick={() => setSignatureMode('draw')}
                className={`px-3 py-1 rounded-md font-bold transition-colors cursor-pointer ${
                  signatureMode === 'draw' ? 'bg-amber-400 text-black shadow-xs' : 'text-slate-400'
                }`}
              >
                رسم يدوي
              </button>
              <button
                type="button"
                onClick={() => setSignatureMode('type')}
                className={`px-3 py-1 rounded-md font-bold transition-colors cursor-pointer ${
                  signatureMode === 'type' ? 'bg-amber-400 text-black shadow-xs' : 'text-slate-400'
                }`}
              >
                كتابة بالاسم
              </button>
            </div>
          </div>

          {/* Color Chooser */}
          <div className="flex items-center gap-3 text-xs text-slate-300">
            <span>لون الحبر:</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setInkColor('#FACC15')}
                className={`w-6 h-6 rounded-full bg-amber-400 transition-transform cursor-pointer ${
                  inkColor === '#FACC15' ? 'ring-2 ring-offset-2 ring-amber-400 scale-110' : ''
                }`}
                title="ذهب خالص"
              />
              <button
                type="button"
                onClick={() => setInkColor('#FFFFFF')}
                className={`w-6 h-6 rounded-full bg-white transition-transform cursor-pointer ${
                  inkColor === '#FFFFFF' ? 'ring-2 ring-offset-2 ring-white scale-110' : ''
                }`}
                title="أبيض ناصع"
              />
              <button
                type="button"
                onClick={() => setInkColor('#38BDF8')}
                className={`w-6 h-6 rounded-full bg-sky-400 transition-transform cursor-pointer ${
                  inkColor === '#38BDF8' ? 'ring-2 ring-offset-2 ring-sky-400 scale-110' : ''
                }`}
                title="أزرق رسمي"
              />
            </div>
          </div>

          {/* Signature Canvas */}
          {signatureMode === 'draw' ? (
            <div className="relative border-2 border-amber-400/40 rounded-2xl bg-[#0a0a0e] overflow-hidden shadow-inner">
              <canvas
                ref={canvasRef}
                width={380}
                height={160}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="w-full h-40 touch-none cursor-crosshair bg-[#0a0a0e]"
              />
              {!hasSignature && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-slate-600 text-xs">
                  ارسم توقيعك هنا بالماوس أو شاشة اللمس ✍️
                </div>
              )}
              <div className="absolute bottom-2 left-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={clearCanvas}
                  className="px-2.5 py-1 bg-[#181824] hover:bg-[#222232] text-amber-400 text-xs rounded-lg flex items-center gap-1 border border-amber-500/20 cursor-pointer"
                >
                  <Eraser className="w-3.5 h-3.5" />
                  <span>مسح</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4 border-2 border-amber-400/30 rounded-2xl bg-[#0a0a0e] space-y-3">
              <label className="block text-xs text-slate-400">اكتب اسمك ليتم تحويله لتوقيع أنيق:</label>
              <input
                type="text"
                value={typedName}
                onChange={(e) => setTypedName(e.target.value)}
                className="w-full bg-[#181822] border border-amber-500/30 rounded-lg px-3 py-2 text-sm text-white"
                placeholder="اسمك الكامل"
              />
              <div className="h-16 flex items-center justify-center border border-dashed border-amber-400/20 rounded-xl bg-[#121218]">
                <span
                  style={{ color: inkColor }}
                  className="italic font-black text-2xl font-serif"
                >
                  {typedName || 'معاينة التوقيع'}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-amber-500/15">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
          <span>توقيع آمن 100% بدون إرسال مستنداتك لأي طرف ثالث أو خادم.</span>
        </div>

        <button
          onClick={handleSignPdf}
          disabled={!file || isProcessing}
          className="w-full sm:w-auto px-8 py-3 bg-amber-400 hover:bg-amber-300 disabled:bg-slate-800 disabled:text-slate-600 text-black font-black text-sm rounded-xl shadow-lg shadow-amber-400/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          {isProcessing ? (
            <>
              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              <span>جاري ختم وتوقيع المستند...</span>
            </>
          ) : isDone ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              <span>تم التوقيع بنجاح! تحميل نسخة أخرى</span>
            </>
          ) : (
            <>
              <PenTool className="w-4 h-4" />
              <span>توقيع وتحميل الـ PDF فوراً</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
