import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const walls = [
  { text: 'Clothing is the first architecture.', sub: '01' },
  { text: 'Before walls, there was wrapping. Before rooms, there were robes.', sub: '02' },
  { text: 'The body is a column. Fabric is its façade.', sub: '03' },
  { text: 'MODELISMA builds what you carry everywhere.', sub: '04' },
];

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wallsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (isMobile) {
        // Mobile: vertical stack with fade reveals
        wallsRef.current.forEach((wall) => {
          if (!wall) return;
          const text = wall.querySelector('.wall-text');
          if (text) {
            gsap.fromTo(
              text,
              { opacity: 0.15, y: 30 },
              {
                opacity: 1,
                y: 0,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: wall,
              start: 'top 75%',
              end: 'top 35%',
              scrub: 2,
                },
              }
            );
          }
        });
        return;
      }

      // Desktop: horizontal scroll
      if (!containerRef.current) return;
      const scrollWidth = containerRef.current.scrollWidth - window.innerWidth;

      const tween = gsap.to(containerRef.current, {
        x: -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          end: () => `+=${scrollWidth}`,
          invalidateOnRefresh: true,
        },
      });

      // Light beam animation on each wall
      wallsRef.current.forEach((wall) => {
        if (!wall) return;
        const text = wall.querySelector('.wall-text');
        if (text) {
          gsap.fromTo(
            text,
            { opacity: 0.15 },
            {
              opacity: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: wall,
                containerAnimation: tween,
                start: 'left 80%',
                end: 'left 20%',
                scrub: true,
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="relative bg-umber overflow-hidden"
      style={{ height: isMobile ? 'auto' : '100vh' }}
    >
      <div
        ref={containerRef}
        className={`flex ${isMobile ? 'flex-col' : 'h-full'}`}
        style={{ width: isMobile ? '100%' : `${walls.length * 100}vw` }}
      >
        {walls.map((wall, i) => (
          <div
            key={i}
            ref={(el) => { wallsRef.current[i] = el; }}
              className={`relative flex items-center justify-center flex-shrink-0 ${
              isMobile ? 'min-h-[50vh] py-20' : 'w-screen h-full'
            }`}
            style={{
              background: `linear-gradient(135deg, ${
                i % 2 === 0 ? '#1A1716' : '#2D2825'
              } 0%, ${i % 2 === 0 ? '#2D2825' : '#1A1716'} 100%)`,
            }}
          >
            {/* Concrete texture overlay */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Wall number */}
            <span
              className="absolute top-8 left-8 md:top-12 md:left-12 text-aged-concrete font-dm text-xs tracking-[0.2em] uppercase"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {wall.sub}
            </span>

            {/* Wall text */}
            <h2
              className="wall-text relative z-10 text-ivory font-syne font-bold text-2xl md:text-[3rem] lg:text-[3.5rem] tracking-[-0.01em] max-w-[80vw] md:max-w-[50vw] text-center leading-[1.15] px-6"
              style={{
                fontFamily: "'Syne', sans-serif",
                opacity: 0.15,
              }}
            >
              {wall.text}
            </h2>

            {/* Light beam effect */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(232,224,216,0.02) 40%, rgba(232,224,216,0.05) 50%, rgba(232,224,216,0.02) 60%, transparent 100%)',
              }}
            />

            {/* Geometric accent */}
            <div className="absolute bottom-12 right-12 md:bottom-16 md:right-16 w-16 h-16 border border-charcoal/30 rotate-45" />
          </div>
        ))}
      </div>
    </section>
  );
}
