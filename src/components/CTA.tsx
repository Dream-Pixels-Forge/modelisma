import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ctas = [
  {
    title: 'Press Inquiries',
    desc: 'Features, interviews, and editorial coverage',
  },
  {
    title: 'Commission a Piece',
    desc: 'Private clients, collectors, and costume departments',
  },
  {
    title: 'Apply as Talent',
    desc: 'Join the next generation of African fashion visionaries',
  },
];

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const archwayRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none none',
        },
      });

      if (archwayRef.current) {
        tl.fromTo(
          archwayRef.current,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' },
          0
        );
      }

      if (columnsRef.current) {
        const cols = columnsRef.current.querySelectorAll('.cta-column');
        tl.fromTo(
          cols,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, stagger: 0.15, duration: 0.6, ease: 'power3.out' },
          0.4
        );

        const descs = columnsRef.current.querySelectorAll('.cta-desc');
        tl.fromTo(
          descs,
          { opacity: 0 },
          { opacity: 0.6, stagger: 0.15, duration: 0.4 },
          0.7
        );
      }

      if (taglineRef.current) {
        tl.fromTo(
          taglineRef.current,
          { opacity: 0 },
          { opacity: 0.5, duration: 0.5 },
          1
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="relative min-h-screen bg-umber flex flex-col items-center justify-center py-24 md:py-32 overflow-hidden"
    >
      {/* CSS Archway */}
      <div
        ref={archwayRef}
        className="relative w-full max-w-lg h-[40vh] md:h-[50vh] mb-12 md:mb-16 opacity-0"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-64 h-72 md:w-80 md:h-80">
            {/* Left pillar */}
            <div className="absolute left-4 md:left-8 bottom-0 w-5 md:w-6 h-full bg-[#2D2825]/60 rounded-t-sm" />
            {/* Right pillar */}
            <div className="absolute right-4 md:right-8 bottom-0 w-5 md:w-6 h-full bg-[#2D2825]/60 rounded-t-sm" />
            {/* Top lintel */}
            <div className="absolute top-0 left-0 right-0 h-4 md:h-5 bg-[#4A4440] rounded-sm" />
            {/* Terracotta accent */}
            <div className="absolute top-[-4px] md:top-[-5px] left-0 right-0 h-1 bg-[#C73B2B]" />
            {/* Floating geometric elements */}
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i / 8) * Math.PI * 2;
              const radius = 55;
              const x = Math.cos(angle) * radius;
              const y = 90 + Math.sin(angle * 0.5) * 35;
              const isRed = i % 2 === 0;
              return (
                <div
                  key={i}
                  className="absolute w-3 h-3"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: y,
                    backgroundColor: isRed ? '#C73B2B' : '#D4A84B',
                    transform: `rotate(${angle * 30}deg)`,
                    boxShadow: `0 0 8px ${isRed ? '#C73B2B' : '#D4A84B'}`,
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA Columns */}
      <div
        ref={columnsRef}
        className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto px-6 md:px-12 w-full"
      >
        {ctas.map((cta, i) => (
          <div
            key={i}
            className="cta-column group relative text-center opacity-0 cursor-pointer"
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div
              className={`h-1 w-full mb-6 transition-all duration-500 ${
                hoveredIndex === i ? 'bg-terracotta' : 'bg-charcoal'
              }`}
            />
            <h3
              className="text-ivory font-syne text-lg md:text-xl tracking-[-0.01em] mb-3 transition-colors duration-300 group-hover:text-saffron"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {cta.title}
            </h3>
            <p
              className="cta-desc text-aged-concrete font-dm text-[0.75rem] leading-[1.6] opacity-60 group-hover:opacity-100 transition-opacity duration-300"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {cta.desc}
            </p>
            <div
              className="absolute inset-0 -z-10 transition-all duration-500 overflow-hidden"
              style={{
                background: hoveredIndex === i
                  ? 'linear-gradient(to top, rgba(199,59,43,0.12) 0%, transparent 70%)'
                  : 'transparent',
              }}
            />
          </div>
        ))}
      </div>

      <p
        ref={taglineRef}
        className="mt-20 md:mt-28 text-ivory/50 font-bodoni text-[0.8rem] tracking-[0.3em] opacity-0"
        style={{ fontFamily: "'Bodoni Moda', serif" }}
      >
        MODELISMA — Model Is Ma
      </p>
    </section>
  );
}