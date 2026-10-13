import React, { useState, useRef, useEffect } from 'react';
import { removeImageBackground, composeProductShot } from '../../utils/imageTools';
import { Upload, Download, Sparkles, Tag, Eye } from 'lucide-react';
import confetti from 'canvas-confetti';

const SAMPLE_PRODUCT_IMAGE = '/src/assets/images/instagram_product_showcase_1791915455379.jpg';

export const ProductStudio: React.FC = () => {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [tolerance, setTolerance] = useState<number>(38);
  const [bgType, setBgType] = useState<
    'transparent' | 'white' | 'studio-podium' | 'warm-gradient' | 'instagram-sunset' | 'soft-gray'
  >('studio-podium');
  const [addDropShadow, setAddDropShadow] = useState<boolean>(true);
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '4:5' | '9:16' | 'original'>('1:1');
  const [badgeText, setBadgeText] = useState<string>('توصيل مجاني 🚚');
  const [processedOutput, setProcessedOutput] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const hiddenImgRef = useRef<HTMLImageElement>(null);
  const cutoutCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const triggerProcess = () => {
    if (!hiddenImgRef.current || !hiddenImgRef.current.complete) return;

    setIsProcessing(true);
    try {
      const cutout = removeImageBackground(hiddenImgRef.current, {
        tolerance,
        feather: 2,
        sampleFromCorner: 'auto',
      });
      cutoutCanvasRef.current = cutout;

      const outputUrl = composeProductShot(cutout, {
        bgType,
        addDropShadow,
        aspectRatio,
        badgeText: badgeText.trim(),
      });

      setProcessedOutput(outputUrl);
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (sourceImage) {
      const timer = setTimeout(triggerProcess, 50);
      return () => clearTimeout(timer);
    }
  }, [sourceImage, tolerance, bgType, addDropShadow, aspectRatio, badgeText]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          setSourceImage(ev.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const loadSample = () => {
    setSourceImage(SAMPLE_PRODUCT_IMAGE);
  };

  const handleDownload = () => {
    if (!processedOutput) return;

    const link = document.createElement('a');
    link.href = processedOutput;
    link.download = `منتج-انستغرام-${Date.now()}.${bgType === 'transparent' ? 'png' : 'jpg'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.65 },
    });
  };

  return (
    <div className="bg-[#121218] rounded-3xl border border-amber-500/20 shadow-2xl p-6 sm:p-8 text-slate-100">
      {/* Title & E-Commerce Angle in Black & Gold */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-amber-300 bg-amber-400/10 border border-amber-400/30 px-3.5 py-1.5 rounded-full mb-2 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>استوديو تصوير المنتجات لبائعي إنستغرام ومتاجر سلة وزد وشوبيفاي</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-2">
          إزالة خلفية صور المنتجات وصناعة غلاف تجاري فخم
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          حوّل تصوير الهاتف العادي إلى لقطة استوديو احترافية بخلفية بيضاء نقية، بوديوم فاخر، وظلال واقعية تضاعف مبيعاتك على إنستغرام بنقرة زر واحدة.
        </p>
      </div>

      {sourceImage && (
        <img
          ref={hiddenImgRef}
          src={sourceImage}
          alt="Original"
          className="hidden"
          crossOrigin="anonymous"
          onLoad={triggerProcess}
        />
      )}

      {!sourceImage ? (
        <div className="space-y-4">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-amber-400/40 hover:border-amber-400 bg-amber-400/5 hover:bg-amber-400/10 rounded-3xl p-10 sm:p-14 text-center cursor-pointer transition-all group shadow-inner"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-400/10 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-xs border border-amber-400/30">
              <Upload className="w-8 h-8" />
            </div>
            <div className="text-lg font-bold text-white mb-1">
              ارفع صورة منتجك من هاتفك أو حاسوبك
            </div>
            <div className="text-xs text-amber-400/70 mb-4 font-mono">
              PNG, JPG, WebP · عطور، ملابس، أحذية، مجوهرات، إلكترونيات
            </div>
            <div className="inline-block px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs rounded-xl shadow-lg shadow-amber-400/20 transition-all cursor-pointer">
              اختر ملف الصورة
            </div>
          </div>

          {/* Quick Demo Button */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <span className="text-xs text-slate-400">ليس لديك صورة جاهزة الآن؟</span>
            <button
              onClick={loadSample}
              className="text-xs font-bold text-amber-300 hover:text-black bg-amber-400/10 hover:bg-amber-400 px-3.5 py-1.5 rounded-xl border border-amber-400/30 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>جرّب على صورة عطر تجاري فاخر</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls Column (5 cols) */}
          <div className="lg:col-span-5 space-y-5 order-2 lg:order-1">
            {/* 1. Background Presets */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-300">
                1. نوع الخلفية الجديدة:
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setBgType('studio-podium')}
                  className={`p-2.5 rounded-xl border text-right transition-all cursor-pointer ${
                    bgType === 'studio-podium'
                      ? 'border-amber-400 bg-amber-400/15 font-bold text-amber-300 shadow-xs'
                      : 'border-amber-500/20 bg-[#0a0a0e] hover:bg-[#181822] text-slate-300'
                  }`}
                >
                  بوديوم واستوديو فاخر ✨
                </button>

                <button
                  type="button"
                  onClick={() => setBgType('white')}
                  className={`p-2.5 rounded-xl border text-right transition-all cursor-pointer ${
                    bgType === 'white'
                      ? 'border-amber-400 bg-amber-400/15 font-bold text-amber-300 shadow-xs'
                      : 'border-amber-500/20 bg-[#0a0a0e] hover:bg-[#181822] text-slate-300'
                  }`}
                >
                  أبيض نقي 100% (للمتاجر)
                </button>

                <button
                  type="button"
                  onClick={() => setBgType('transparent')}
                  className={`p-2.5 rounded-xl border text-right transition-all cursor-pointer ${
                    bgType === 'transparent'
                      ? 'border-amber-400 bg-amber-400/15 font-bold text-amber-300 shadow-xs'
                      : 'border-amber-500/20 bg-[#0a0a0e] hover:bg-[#181822] text-slate-300'
                  }`}
                >
                  خلفية شفافة (PNG)
                </button>

                <button
                  type="button"
                  onClick={() => setBgType('instagram-sunset')}
                  className={`p-2.5 rounded-xl border text-right transition-all cursor-pointer ${
                    bgType === 'instagram-sunset'
                      ? 'border-amber-400 bg-amber-400/15 font-bold text-amber-300 shadow-xs'
                      : 'border-amber-500/20 bg-[#0a0a0e] hover:bg-[#181822] text-slate-300'
                  }`}
                >
                  تدرج إنستغرام هادئ 🌅
                </button>

                <button
                  type="button"
                  onClick={() => setBgType('warm-gradient')}
                  className={`p-2.5 rounded-xl border text-right transition-all cursor-pointer ${
                    bgType === 'warm-gradient'
                      ? 'border-amber-400 bg-amber-400/15 font-bold text-amber-300 shadow-xs'
                      : 'border-amber-500/20 bg-[#0a0a0e] hover:bg-[#181822] text-slate-300'
                  }`}
                >
                  دافئ للمأكولات والعطور
                </button>

                <button
                  type="button"
                  onClick={() => setBgType('soft-gray')}
                  className={`p-2.5 rounded-xl border text-right transition-all cursor-pointer ${
                    bgType === 'soft-gray'
                      ? 'border-amber-400 bg-amber-400/15 font-bold text-amber-300 shadow-xs'
                      : 'border-amber-500/20 bg-[#0a0a0e] hover:bg-[#181822] text-slate-300'
                  }`}
                >
                  رمادي استوديو هادئ
                </button>
              </div>
            </div>

            {/* 2. Format & Aspect Ratio */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-300">
                2. مقاس النشر المطلوب:
              </label>
              <div className="grid grid-cols-4 gap-1.5 text-xs text-center font-medium">
                <button
                  type="button"
                  onClick={() => setAspectRatio('1:1')}
                  className={`py-2 px-1 rounded-xl border transition-all cursor-pointer ${
                    aspectRatio === '1:1'
                      ? 'border-amber-400 bg-amber-400 text-black font-extrabold'
                      : 'border-amber-500/20 bg-[#0a0a0e] text-slate-300 hover:bg-[#181822]'
                  }`}
                >
                  1:1 مربع
                </button>
                <button
                  type="button"
                  onClick={() => setAspectRatio('4:5')}
                  className={`py-2 px-1 rounded-xl border transition-all cursor-pointer ${
                    aspectRatio === '4:5'
                      ? 'border-amber-400 bg-amber-400 text-black font-extrabold'
                      : 'border-amber-500/20 bg-[#0a0a0e] text-slate-300 hover:bg-[#181822]'
                  }`}
                >
                  4:5 بوست
                </button>
                <button
                  type="button"
                  onClick={() => setAspectRatio('9:16')}
                  className={`py-2 px-1 rounded-xl border transition-all cursor-pointer ${
                    aspectRatio === '9:16'
                      ? 'border-amber-400 bg-amber-400 text-black font-extrabold'
                      : 'border-amber-500/20 bg-[#0a0a0e] text-slate-300 hover:bg-[#181822]'
                  }`}
                >
                  9:16 ستوري
                </button>
                <button
                  type="button"
                  onClick={() => setAspectRatio('original')}
                  className={`py-2 px-1 rounded-xl border transition-all cursor-pointer ${
                    aspectRatio === 'original'
                      ? 'border-amber-400 bg-amber-400 text-black font-extrabold'
                      : 'border-amber-500/20 bg-[#0a0a0e] text-slate-300 hover:bg-[#181822]'
                  }`}
                >
                  الأصلي
                </button>
              </div>
            </div>

            {/* 3. Shadow & Badge */}
            <div className="p-4 rounded-2xl border border-amber-500/20 bg-[#0a0a0e] space-y-3">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-200">
                <input
                  type="checkbox"
                  checked={addDropShadow}
                  onChange={(e) => setAddDropShadow(e.target.checked)}
                  className="rounded text-amber-400 focus:ring-amber-400 w-4 h-4 accent-amber-400 cursor-pointer"
                />
                <span>إضافة ظل واقعي للمنتج (Realistic Soft Shadow)</span>
              </label>

              <div>
                <label className="block text-[11px] font-bold text-amber-300 mb-1 flex items-center gap-1">
                  <Tag className="w-3 h-3 text-amber-400" />
                  <span>شارة تسويقية جاهزة للمبيعات (اختياري):</span>
                </label>
                <div className="flex gap-1.5 flex-wrap">
                  {['توصيل مجاني 🚚', 'خصم 20%', 'خصم 50%', 'الأكثر طلباً ⭐', 'جديد حصري 🔥', ''].map((tag, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setBadgeText(tag)}
                      className={`text-[10px] px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                        badgeText === tag
                          ? 'bg-amber-400 text-black border-amber-400 font-extrabold shadow-sm'
                          : 'bg-[#161622] text-slate-300 border-amber-500/20 hover:bg-[#20202e]'
                      }`}
                    >
                      {tag ? tag : 'بدون شارة'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 4. Fine-tuning Tolerance Slider */}
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>حساسية عزل الخلفية:</span>
                <span className="font-mono font-bold text-amber-400">{tolerance}</span>
              </div>
              <input
                type="range"
                min="15"
                max="70"
                value={tolerance}
                onChange={(e) => setTolerance(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>دقيق</span>
                <span>متوسط</span>
                <span>عزل قوي</span>
              </div>
            </div>

            {/* Change Picture Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setSourceImage(null)}
                className="text-xs text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
              >
                ← رفع صورة منتج أخرى
              </button>
            </div>
          </div>

          {/* Preview Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center order-1 lg:order-2">
            <div className="w-full max-w-md border border-amber-500/20 rounded-3xl p-4 bg-[#0a0a0e] shadow-2xl flex flex-col items-center">
              <div className="w-full flex items-center justify-between text-xs text-slate-400 mb-2 px-1">
                <span className="flex items-center gap-1 font-bold text-white">
                  <Eye className="w-3.5 h-3.5 text-amber-400" />
                  معاينة النتيجة المباشرة
                </span>
                <span className="text-[11px] font-mono text-amber-300 bg-amber-400/10 border border-amber-400/30 px-2 py-0.5 rounded">
                  دقة عالية جاهزة للتنزيل
                </span>
              </div>

              {/* Main Canvas Preview */}
              <div className="relative w-full aspect-square bg-[#161622] rounded-2xl overflow-hidden flex items-center justify-center shadow-inner border border-amber-500/20">
                {isProcessing && (
                  <div className="absolute inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center z-10 text-xs font-bold text-amber-400">
                    جاري المعالجة الفورية...
                  </div>
                )}
                {processedOutput ? (
                  <img
                    src={processedOutput}
                    alt="Product Cutout Studio"
                    referrerPolicy="no-referrer"
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <div className="text-xs text-slate-500">جاري التجهيز...</div>
                )}
              </div>

              {/* Download CTA in Cyber Gold & Black */}
              <button
                onClick={handleDownload}
                className="w-full mt-4 py-3 bg-amber-400 hover:bg-amber-300 text-black font-black text-sm rounded-xl shadow-lg shadow-amber-400/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>تحميل صورة المنتج فوراً ({bgType === 'transparent' ? 'PNG شفاف' : 'JPG استوديو'})</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
