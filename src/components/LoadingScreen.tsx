import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 2;
      });
    }, 20);

    return () => clearInterval(interval);
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
        
        {/* Progress bar */}
        <div className="w-48 h-px bg-charcoal mx-auto overflow-hidden">
          <div
            className="h-full bg-terracotta transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <p
          className="text-aged-concrete font-dm text-[0.65rem] tracking-[0.2em] uppercase mt-4"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Building structure
        </p>
      </div>
    </div>
  );
}
