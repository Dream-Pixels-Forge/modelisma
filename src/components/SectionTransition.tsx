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

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      const clipPaths: Record<string, { from: string; to: string }> = {
        left: {
          from: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
          to: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        },
        right: {
          from: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
          to: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        },
        top: {
          from: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
          to: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        },
        bottom: {
          from: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
          to: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        },
      };

      gsap.fromTo(
        ref.current,
        { clipPath: clipPaths[direction].from },
        {
          clipPath: clipPaths[direction].to,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 90%',
            end: 'top 30%',
            scrub: 1,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [direction]);

  return (
    <div
      ref={ref}
      className="h-[30vh] md:h-[40vh] w-full"
      style={{
        backgroundColor: color,
        clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
      }}
    />
  );
}
