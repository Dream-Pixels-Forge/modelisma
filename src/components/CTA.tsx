import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const carouselImages = [
  '/images/editorial-1.jpg',
  '/images/editorial-2.jpg',
  '/images/editorial-3.jpg',
  '/images/editorial-4.jpg',
  '/images/editorial-5.jpg',
  '/images/editorial-6.jpg',
  '/images/editorial-7.jpg',
  '/images/editorial-8.jpg',
  '/images/editorial-9.jpg',
  '/images/collection-1.jpg',
  '/images/collection-2.jpg',
  '/images/collection-3.jpg',
  '/images/collection-4.jpg',
  '/images/collection-5.jpg',
  '/images/collection-6.jpg',
];

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
  const carouselRef = useRef<HTMLDivElement>(null);
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

      if (carouselRef.current) {
        tl.fromTo(
          carouselRef.current,
          { opacity: 0, scale: 0.98 },
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
          0.3
        );

        const descs = columnsRef.current.querySelectorAll('.cta-desc');
        tl.fromTo(
          descs,
          { opacity: 0 },
          { opacity: 0.6, stagger: 0.15, duration: 0.4 },
          0.5
        );
      }

      if (taglineRef.current) {
        tl.fromTo(
          taglineRef.current,
          { opacity: 0 },
          { opacity: 0.5, duration: 0.5 },
          0.8
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const track = carousel.querySelector('.carousel-track') as HTMLElement;
    if (!track) return;

    const totalWidth = track.scrollWidth;
    const viewportWidth = track.clientWidth;
    const distance = totalWidth - viewportWidth;

    gsap.set(track, { x: 0 });

    gsap.to(track, {
      x: -distance,
      duration: distance / 30,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % distance),
      },
    });

    return () => {
      gsap.killTweensOf(track);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="relative min-h-screen bg-umber flex flex-col items-center justify-center py-24 md:py-32 overflow-hidden"
    >
      {/* Cinematic Carousel */}
      <div
        ref={carouselRef}
        className="relative w-full max-w-[2160px] aspect-[216/92.5] mb-16 md:mb-20 overflow-hidden opacity-0"
      >
        <div className="absolute inset-0 flex items-center">
          <div className="carousel-track flex gap-4 will-change-transform">
            {[...carouselImages, ...carouselImages, ...carouselImages].map((src, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[calc(2160px/4)] aspect-[216/92.5] overflow-hidden"
              >
                <img
                  src={src}
                  alt={`carousel-${i}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-umber via-transparent to-umber" />
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