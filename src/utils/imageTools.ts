/**
 * أدوات معالجة صور المنتجات للبائعين على إنستغرام والمتاجر
 */

export interface BgRemovalOptions {
  tolerance: number; // 10 - 80
  feather: number; // 0 - 5
  targetColor?: { r: number; g: number; b: number };
  sampleFromCorner?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'auto';
}

/**
 * خوارزمية إزالة الخلفية في المتصفح عبر تحليل بكسلات الألوان والشفافية
 */
export function removeImageBackground(
  imageElement: HTMLImageElement,
  options: BgRemovalOptions = { tolerance: 35, feather: 2, sampleFromCorner: 'auto' }
): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  const width = imageElement.naturalWidth || imageElement.width;
  const height = imageElement.naturalHeight || imageElement.height;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  ctx.drawImage(imageElement, 0, 0, width, height);
  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;

  // Determine keying color from corner if not provided
  let bgR = 255;
  let bgG = 255;
  let bgB = 255;

  if (options.targetColor) {
    bgR = options.targetColor.r;
    bgG = options.targetColor.g;
    bgB = options.targetColor.b;
  } else {
    // Sample four corners to determine dominant background tone
    const corners = [
      0, // top-left
      (width - 1) * 4, // top-right
      ((height - 1) * width) * 4, // bottom-left
      ((height - 1) * width + (width - 1)) * 4, // bottom-right
    ];

    let totalR = 0, totalG = 0, totalB = 0;
    corners.forEach((idx) => {
      totalR += data[idx];
      totalG += data[idx + 1];
      totalB += data[idx + 2];
    });

    bgR = Math.round(totalR / 4);
    bgG = Math.round(totalG / 4);
    bgB = Math.round(totalB / 4);
  }

  const tol = options.tolerance || 35;
  const tolSq = tol * tol;

  // Scan and calculate color distance
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const distSq = (r - bgR) * (r - bgR) + (g - bgG) * (g - bgG) + (b - bgB) * (b - bgB);

    if (distSq < tolSq) {
      // Background matched
      data[i + 3] = 0; // Transparent
    } else if (distSq < tolSq * 1.5) {
      // Soft feather edge
      const alphaFactor = (distSq - tolSq) / (tolSq * 0.5);
      data[i + 3] = Math.min(255, Math.floor(data[i + 3] * alphaFactor));
    }
  }

  ctx.putImageData(imgData, 0, 0);
  return canvas;
}

/**
 * تركيب وتوليد الصورة النهائية مع الخلفية الجديدة والظلال والبادج التجاري
 */
export function composeProductShot(
  cutoutCanvas: HTMLCanvasElement,
  options: {
    bgType: 'transparent' | 'white' | 'warm-gradient' | 'soft-gray' | 'instagram-sunset' | 'studio-podium';
    customBgColor?: string;
    addDropShadow: boolean;
    aspectRatio: '1:1' | '4:5' | '9:16' | 'original';
    badgeText?: string;
  }
): string {
  const outputCanvas = document.createElement('canvas');
  const sourceW = cutoutCanvas.width;
  const sourceH = cutoutCanvas.height;

  let targetW = sourceW;
  let targetH = sourceH;

  if (options.aspectRatio === '1:1') {
    const maxDim = Math.max(sourceW, sourceH, 1080);
    targetW = maxDim;
    targetH = maxDim;
  } else if (options.aspectRatio === '4:5') {
    targetW = 1080;
    targetH = 1350;
  } else if (options.aspectRatio === '9:16') {
    targetW = 1080;
    targetH = 1920;
  }

  outputCanvas.width = targetW;
  outputCanvas.height = targetH;
  const ctx = outputCanvas.getContext('2d');
  if (!ctx) return cutoutCanvas.toDataURL('image/png');

  // 1. Draw Background
  if (options.bgType === 'transparent') {
    // Keep transparent
  } else if (options.bgType === 'white') {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, targetW, targetH);
  } else if (options.bgType === 'warm-gradient') {
    const grad = ctx.createLinearGradient(0, 0, targetW, targetH);
    grad.addColorStop(0, '#FFFBEB');
    grad.addColorStop(1, '#FEF3C7');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, targetW, targetH);
  } else if (options.bgType === 'instagram-sunset') {
    const grad = ctx.createLinearGradient(0, 0, targetW, targetH);
    grad.addColorStop(0, '#FDF2F8');
    grad.addColorStop(0.5, '#FFF1F2');
    grad.addColorStop(1, '#FFFBEB');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, targetW, targetH);
  } else if (options.bgType === 'soft-gray') {
    ctx.fillStyle = '#F8FAFC';
    ctx.fillRect(0, 0, targetW, targetH);
  } else if (options.bgType === 'studio-podium') {
    // Subtle luxury studio background with podium reflection
    const grad = ctx.createLinearGradient(0, 0, 0, targetH);
    grad.addColorStop(0, '#F1F5F9');
    grad.addColorStop(0.75, '#E2E8F0');
    grad.addColorStop(1, '#CBD5E1');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, targetW, targetH);

    // Oval podium at the bottom
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.beginPath();
    ctx.ellipse(targetW / 2, targetH * 0.82, targetW * 0.4, targetH * 0.08, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // 2. Calculate scaling to fit product centered with margin
  const marginRatio = 0.82; // 82% of container
  const scale = Math.min((targetW * marginRatio) / sourceW, (targetH * marginRatio) / sourceH);
  const drawW = sourceW * scale;
  const drawH = sourceH * scale;
  const drawX = (targetW - drawW) / 2;
  const drawY = (targetH - drawH) / 2 + (options.bgType === 'studio-podium' ? -targetH * 0.02 : 0);

  // 3. Optional Drop Shadow
  if (options.addDropShadow && options.bgType !== 'transparent') {
    ctx.save();
    ctx.shadowColor = 'rgba(15, 23, 42, 0.28)';
    ctx.shadowBlur = Math.round(targetW * 0.035);
    ctx.shadowOffsetY = Math.round(targetH * 0.03);
    ctx.drawImage(cutoutCanvas, drawX, drawY, drawW, drawH);
    ctx.restore();
  }

  // 4. Draw Main Cutout
  ctx.drawImage(cutoutCanvas, drawX, drawY, drawW, drawH);

  // 5. Optional Seller Marketing Badge
  if (options.badgeText && options.badgeText.trim()) {
    ctx.save();
    const badgePadX = 24;
    const badgePadY = 12;
    const fontSize = Math.max(18, Math.round(targetW * 0.032));
    ctx.font = `bold ${fontSize}px 'Tajawal', sans-serif`;
    const textMetrics = ctx.measureText(options.badgeText);
    const boxW = textMetrics.width + badgePadX * 2;
    const boxH = fontSize + badgePadY * 2;
    const boxX = targetW - boxW - 32;
    const boxY = 32;

    // Badge shadow & background
    ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 4;
    ctx.fillStyle = '#DC2626'; // High-intent sale red
    ctx.beginPath();
    ctx.roundRect(boxX, boxY, boxW, boxH, 8);
    ctx.fill();

    // Badge text
    ctx.shadowColor = 'transparent';
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(options.badgeText, boxX + boxW / 2, boxY + boxH / 2 + 1);
    ctx.restore();
  }

  return outputCanvas.toDataURL(options.bgType === 'transparent' ? 'image/png' : 'image/jpeg', 0.95);
}
