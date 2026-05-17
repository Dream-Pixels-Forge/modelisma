import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SectionTransitionProps {
  color?: string;
  direction?: 'left' | 'right' | 'top' | 'bottom';
}

export default function SectionTransition({
  color = '#1A1716',
  direction = 'left',
}: SectionTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || !overlayRef.current) return;

    const ctx = gsap.context(() => {
      const fromClip: Record<string, string> = {
        left: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
        right: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
        top: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
        bottom: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
      };

      gsap.fromTo(
        overlayRef.current,
        { clipPath: fromClip[direction] },
        {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top bottom',
            end: 'top top',
            scrub: true,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [direction]);

  return (
    <div
      ref={ref}
      className="relative w-full h-[15vh] overflow-hidden"
    >
      <div
        ref={overlayRef}
        className="absolute inset-0 will-change-transform"
        style={{
          backgroundColor: color,
          clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
        }}
      />
    </div>
  );
}
