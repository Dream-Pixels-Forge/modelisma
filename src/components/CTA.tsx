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

      if (columnsRef.current) {
        const cols = columnsRef.current.querySelectorAll('.cta-column');
        tl.fromTo(
          cols,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, stagger: 0.15, duration: 0.6, ease: 'power3.out' },
          0
        );

        const descs = columnsRef.current.querySelectorAll('.cta-desc');
        tl.fromTo(
          descs,
          { opacity: 0 },
          { opacity: 0.6, stagger: 0.15, duration: 0.4 },
          0.3
        );
      }

      if (taglineRef.current) {
        tl.fromTo(
          taglineRef.current,
          { opacity: 0 },
          { opacity: 0.5, duration: 0.5 },
          0.6
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