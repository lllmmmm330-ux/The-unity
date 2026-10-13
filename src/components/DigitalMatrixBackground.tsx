import React, { useEffect, useRef, useState } from 'react';
import { Eye, EyeOff, Sparkles, Box } from 'lucide-react';

interface SpaceNumberParticle {
  x: number;
  y: number;
  speed: number;
  size: number;
  char: string;
  opacity: number;
  trailLength: number;
  color: string;
}

interface FloatingCube3D {
  x: number;
  y: number;
  size: number;
  rx: number;
  ry: number;
  rz: number;
  drx: number;
  dry: number;
  drz: number;
  vx: number;
  vy: number;
  color: string;
  fillColor: string;
}

export const DigitalMatrixBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Characters falling from space (Numbers, Bytes, Coordinates)
    const characters = '0123456789%#§*+PDFKBMB'.split('');
    const colors = [
      '#FACC15', // Cyber Gold
      '#E2E8F0', // Light Feather Silver
      '#CBD5E1', // Pale Feather Ash
      '#FDE047', // Radiant Yellow
      '#38BDF8', // Starlight Cyan
    ];

    // 1. Initialize Space Falling Numbers Particles
    const numCount = Math.floor(width / 18);
    const spaceNumbers: SpaceNumberParticle[] = Array.from({ length: numCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * -height * 1.5,
      speed: 1.8 + Math.random() * 4.2,
      size: 11 + Math.random() * 8,
      char: characters[Math.floor(Math.random() * characters.length)],
      opacity: 0.3 + Math.random() * 0.7,
      trailLength: 6 + Math.floor(Math.random() * 10),
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    // 2. Initialize 3D Floating & Rotating Cubes
    const cubeCount = 6;
    const cubes: FloatingCube3D[] = Array.from({ length: cubeCount }, (_, i) => ({
      x: (width / (cubeCount + 1)) * (i + 1) + (Math.random() - 0.5) * 100,
      y: (height / (cubeCount + 1)) * (i + 1) + (Math.random() - 0.5) * 100,
      size: 32 + Math.random() * 45,
      rx: Math.random() * Math.PI * 2,
      ry: Math.random() * Math.PI * 2,
      rz: Math.random() * Math.PI * 2,
      drx: 0.006 + Math.random() * 0.012,
      dry: 0.008 + Math.random() * 0.015,
      drz: 0.005 + Math.random() * 0.01,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.4,
      color: i % 2 === 0 ? 'rgba(250, 204, 21, 0.75)' : 'rgba(226, 232, 240, 0.65)', // Gold & Feather Silver
      fillColor: i % 2 === 0 ? 'rgba(250, 204, 21, 0.06)' : 'rgba(203, 213, 225, 0.04)',
    }));

    // Distant Stars in Space
    const stars = Array.from({ length: 65 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.8 + 0.2,
      blinkSpeed: 0.02 + Math.random() * 0.03,
    }));

    // 3D Geometry for Cube (8 vertices)
    const baseVertices = [
      [-1, -1, -1],
      [1, -1, -1],
      [1, 1, -1],
      [-1, 1, -1],
      [-1, -1, 1],
      [1, -1, 1],
      [1, 1, 1],
      [-1, 1, 1],
    ];

    // 12 Edges connecting vertices
    const cubeEdges = [
      [0, 1], [1, 2], [2, 3], [3, 0], // Back face
      [4, 5], [5, 6], [6, 7], [7, 4], // Front face
      [0, 4], [1, 5], [2, 6], [3, 7], // Connecting edges
    ];

    // 6 Faces for translucent polygon shading
    const cubeFaces = [
      [0, 1, 2, 3], // Back
      [4, 5, 6, 7], // Front
      [0, 1, 5, 4], // Bottom
      [2, 3, 7, 6], // Top
      [0, 3, 7, 4], // Left
      [1, 2, 6, 5], // Right
    ];

    let tick = 0;

    const render = () => {
      tick++;

      // Clear Canvas with "لون الريشي الكاشف" (Luminous Light Feather & Deep Cosmic Tint)
      // Subtle background fade creating soft trails
      ctx.fillStyle = 'rgba(14, 15, 20, 0.35)';
      ctx.fillRect(0, 0, width, height);

      // Light Feather Ash & Nebula Glow in the backdrop
      const nebula = ctx.createRadialGradient(width * 0.5, height * 0.45, 50, width * 0.5, height * 0.45, Math.max(width, height) * 0.8);
      nebula.addColorStop(0, 'rgba(203, 213, 225, 0.045)'); // Light feather-ash silver glow
      nebula.addColorStop(0.5, 'rgba(148, 163, 184, 0.025)'); // Dove grey
      nebula.addColorStop(1, 'rgba(10, 10, 14, 0)');
      ctx.fillStyle = nebula;
      ctx.fillRect(0, 0, width, height);

      // 1. Draw Distant Twinkling Cosmic Stars
      stars.forEach((star) => {
        star.alpha += Math.sin(tick * star.blinkSpeed) * 0.01;
        const currentAlpha = Math.max(0.1, Math.min(0.9, star.alpha));
        ctx.fillStyle = `rgba(241, 245, 249, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Draw Space Falling Numbers ("ارقام تسقط من الفضاء")
      spaceNumbers.forEach((p) => {
        p.y += p.speed;

        // Change character occasionally
        if (Math.random() > 0.95) {
          p.char = characters[Math.floor(Math.random() * characters.length)];
        }

        // Draw meteor trail behind the falling number
        for (let t = 1; t <= p.trailLength; t++) {
          const trailY = p.y - t * (p.size * 0.7);
          if (trailY > 0 && trailY < height) {
            const trailAlpha = (p.opacity * (1 - t / p.trailLength)) * 0.45;
            ctx.fillStyle = `rgba(250, 204, 21, ${trailAlpha})`;
            ctx.font = `${p.size * 0.85}px 'JetBrains Mono', monospace`;
            ctx.fillText(characters[(tick + t) % characters.length], p.x, trailY);
          }
        }

        // Draw the glowing head number falling from the sky
        ctx.font = `bold ${p.size}px 'JetBrains Mono', monospace`;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fillText(p.char, p.x, p.y);
        ctx.shadowBlur = 0; // reset

        // Respawn when falling off screen
        if (p.y > height + 50) {
          p.y = -40;
          p.x = Math.random() * width;
          p.speed = 2 + Math.random() * 4.5;
        }
      });

      // 3. Draw Animated 3D Floating & Rotating Cubes ("اشكال مكعبات متحركة")
      cubes.forEach((cube) => {
        // Update 3D Rotations
        cube.rx += cube.drx;
        cube.ry += cube.dry;
        cube.rz += cube.drz;

        // Drift slowly across screen
        cube.x += cube.vx;
        cube.y += cube.vy;
        if (cube.x < -100) cube.x = width + 50;
        if (cube.x > width + 100) cube.x = -50;
        if (cube.y < -100) cube.y = height + 50;
        if (cube.y > height + 100) cube.y = -50;

        // Compute 3D Rotated Vertices
        const cosX = Math.cos(cube.rx), sinX = Math.sin(cube.rx);
        const cosY = Math.cos(cube.ry), sinY = Math.sin(cube.ry);
        const cosZ = Math.cos(cube.rz), sinZ = Math.sin(cube.rz);

        const projected = baseVertices.map(([vx, vy, vz]) => {
          // Scale by cube size
          let x = vx * cube.size;
          let y = vy * cube.size;
          let z = vz * cube.size;

          // Rotation around X
          let y1 = y * cosX - z * sinX;
          let z1 = y * sinX + z * cosX;

          // Rotation around Y
          let x2 = x * cosY + z1 * sinY;
          let z2 = -x * sinY + z1 * cosY;

          // Rotation around Z
          let x3 = x2 * cosZ - y1 * sinZ;
          let y3 = x2 * sinZ + y1 * cosZ;

          // 3D Perspective Projection
          const fov = 400;
          const scale = fov / (fov + z2);
          return {
            x: cube.x + x3 * scale,
            y: cube.y + y3 * scale,
            z: z2,
          };
        });

        // Draw Translucent 3D Faces
        cubeFaces.forEach((face) => {
          ctx.beginPath();
          ctx.moveTo(projected[face[0]].x, projected[face[0]].y);
          for (let f = 1; f < face.length; f++) {
            ctx.lineTo(projected[face[f]].x, projected[face[f]].y);
          }
          ctx.closePath();
          ctx.fillStyle = cube.fillColor;
          ctx.fill();
        });

        // Draw Crisp Glowing 3D Edges
        ctx.strokeStyle = cube.color;
        ctx.lineWidth = 1.6;
        ctx.shadowColor = cube.color;
        ctx.shadowBlur = 6;

        cubeEdges.forEach(([p1, p2]) => {
          ctx.beginPath();
          ctx.moveTo(projected[p1].x, projected[p1].y);
          ctx.lineTo(projected[p2].x, projected[p2].y);
          ctx.stroke();
        });

        // Draw Vertex Points
        projected.forEach((pt) => {
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 2.2, 0, Math.PI * 2);
          ctx.fill();
        });

        ctx.shadowBlur = 0; // reset shadow
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [enabled]);

  return (
    <>
      {enabled && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-0"
        />
      )}

      {/* Control Toggle in Bottom-Left */}
      <div className="fixed bottom-3 left-3 z-30 no-print">
        <button
          onClick={() => setEnabled((prev) => !prev)}
          className="px-3 py-1.5 text-[11px] font-mono rounded-xl bg-[#0e0e14]/90 hover:bg-[#181822] backdrop-blur-md border border-amber-500/40 text-amber-400 hover:text-amber-300 shadow-xl flex items-center gap-1.5 transition-all cursor-pointer"
          title="تشغيل أو إيقاف مكعبات الفضاء والأرقام المتساقطة"
        >
          {enabled ? (
            <>
              <EyeOff className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">إيقاف مكعبات الفضاء والأرقام</span>
            </>
          ) : (
            <>
              <Eye className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">تشغيل مكعبات الفضاء والأرقام</span>
            </>
          )}
        </button>
      </div>
    </>
  );
};
