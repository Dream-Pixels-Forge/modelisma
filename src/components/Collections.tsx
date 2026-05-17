import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const collections = [
  {
    name: 'The Column',
    material: 'Structured linen, terracotta-dyed cotton, architectural boning',
    image: '/images/collection-1.webp',
    label: 'SS / 2024',
  },
  {
    name: 'The Façade',
    material: 'Raw silk, geometric paneling, structural mesh',
    image: '/images/collection-2.webp',
    label: 'AW / 2024',
  },
  {
    name: 'The Span',
    material: 'Draped wool, tensile thread, concrete-dust pigment',
    image: '/images/collection-3.webp',
    label: 'SS / 2025',
  },
];

export default function Collections() {
  const sectionRef = useRef<HTMLElement>(null);
  const piecesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      piecesRef.current.forEach((piece, i) => {
        if (!piece) return;

        const img = piece.querySelector('.collection-img');
        const plinth = piece.querySelector('.plinth-bar');
        const label = piece.querySelector('.collection-label');
        const blueprint = piece.querySelector('.blueprint-bg');

        // Vary pace: first piece slow, second fast, third in between
        const pace = [2.5, 0.8, 1.5][i] || 1;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: piece,
            start: 'top 80%',
            end: 'top 20%',
            scrub: pace,
          },
        });

        if (img) {
          tl.fromTo(
            img,
            { scale: 1.1, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1 },
            0
          );
        }

        if (plinth) {
          tl.fromTo(
            plinth,
            { scaleY: 0, transformOrigin: 'bottom' },
            { scaleY: 1, duration: 0.8 },
            0.2
          );
        }

        if (blueprint) {
          tl.fromTo(
            blueprint,
            { opacity: 0 },
            { opacity: 0.12, duration: 0.8 },
            0.4
          );
        }

        if (label) {
          tl.fromTo(
            label,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6 },
            0.6
          );
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="collections" className="relative bg-umber">
      {/* Section header */}
      <div className="py-16 md:py-24 px-6 md:px-12">
        <h2
          className="text-ivory font-syne text-3xl md:text-[clamp(2.5rem,5vw,4rem)] tracking-[-0.02em] max-w-7xl mx-auto"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Garments as Structures
        </h2>
      </div>

      {collections.map((collection, i) => (
        <div
          key={i}
          ref={(el) => { piecesRef.current[i] = el; }}
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
          {/* Blueprint background pattern */}
          <div
            className="blueprint-bg absolute inset-0 opacity-0 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(rgba(196,184,175,0.08) 1px, transparent 1px),
                linear-gradient(90deg, rgba(196,184,175,0.08) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />

          {/* Collection image */}
          <div className="relative w-full max-w-5xl mx-auto px-6 md:px-12">
            <div className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden group">
              <img
                src={collection.image}
                alt={collection.name}
                className="collection-img w-full h-full object-cover opacity-0"
                loading="lazy"
              />

              {/* Edge glow on hover */}
              <div className="absolute inset-0 border border-terracotta/0 group-hover:border-terracotta/40 transition-all duration-500 pointer-events-none" />

              {/* Plinth bar */}
              <div className="plinth-bar absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-terracotta/60" />
            </div>

            {/* Labels */}
            <div className="collection-label flex justify-between items-end mt-6 opacity-0">
              <div>
                <span
                  className="block text-aged-concrete font-dm text-[0.75rem] uppercase tracking-[0.15em] mb-1"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {collection.label}
                </span>
                <h3
                  className="text-ivory font-syne text-xl md:text-[1.5rem] tracking-[-0.01em]"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {collection.name}
                </h3>
              </div>
              <p
                className="text-aged-concrete font-dm text-xs md:text-sm max-w-xs text-right hidden md:block"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {collection.material}
              </p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
