import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

const imagePaths = [
  '/images/collection-1.webp', '/images/collection-2.webp', '/images/collection-3.webp',
  '/images/collection-4.webp', '/images/collection-5.webp', '/images/collection-6.webp',
  '/images/designer-portrait.webp',
  '/images/editorial-1.webp', '/images/editorial-2.webp', '/images/editorial-3.webp',
  '/images/editorial-4.webp', '/images/editorial-5.webp', '/images/editorial-6.webp',
  '/images/editorial-7.webp', '/images/editorial-8.webp', '/images/editorial-9.webp',
  '/images/talent-1.webp', '/images/talent-2.webp', '/images/talent-3.webp',
  '/images/talent-4.webp', '/images/talent-5.webp', '/images/talent-6.webp',
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let loaded = 0;
    const total = imagePaths.length;
    let cancelled = false;

    const updateProgress = () => {
      if (cancelled) return;
      loaded++;
      setProgress(Math.round((loaded / total) * 100));
      if (loaded >= total) {
        setProgress(100);
      }
    };

    imagePaths.forEach((src) => {
      const img = new Image();
      img.onload = updateProgress;
      img.onerror = updateProgress;
      img.src = src;
    });

    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (progress >= 100 && containerRef.current) {
      const tl = gsap.timeline();

      if (textRef.current) {
        tl.to(textRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.4,
          ease: 'power2.in',
        });
      }

      tl.to(containerRef.current, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.8,
        ease: 'power3.inOut',
        onComplete,
      });
    }
  }, [progress, onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[300] bg-umber flex flex-col items-center justify-center"
      style={{ clipPath: 'inset(0)' }}
    >
      <div ref={textRef} className="text-center">
        <h1
          className="text-ivory font-bodoni text-2xl md:text-3xl tracking-[0.3em] mb-8"
          style={{ fontFamily: "'Bodoni Moda', serif" }}
        >
          MODELISMA
        </h1>

        <div className="w-48 h-px bg-charcoal mx-auto overflow-hidden">
          <div
            className="h-full bg-terracotta transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p
          className="text-aged-concrete font-dm text-[0.65rem] tracking-[0.2em] uppercase mt-4"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {progress < 100 ? `Loading ${progress}%` : 'Building structure'}
        </p>
      </div>
    </div>
  );
}
