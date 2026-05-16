import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const talents = [
  { name: 'Kofi Mensah', city: 'Accra', image: '/images/talent-1.jpg' },
  { name: 'Zara Ibrahim', city: 'Lagos', image: '/images/talent-2.jpg' },
  { name: 'Thabo Nkosi', city: 'Johannesburg', image: '/images/talent-3.jpg' },
  { name: 'Amina Diallo', city: 'Dakar', image: '/images/talent-4.jpg' },
  { name: 'Oluwaseun Ade', city: 'Lagos', image: '/images/talent-5.jpg' },
  { name: 'Nia Mbeki', city: 'Nairobi', image: '/images/talent-6.jpg' },
];

export default function Talent() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Grid assembly
      if (gridRef.current) {
        const items = gridRef.current.querySelectorAll('.talent-item');
        gsap.fromTo(
          items,
          {
            opacity: 0,
            y: 60,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // SVG lines draw
      if (svgRef.current) {
        const lines = svgRef.current.querySelectorAll('.connect-line');
        lines.forEach((line) => {
          const length = (line as SVGPathElement).getTotalLength?.() || 200;
          gsap.set(line, {
            strokeDasharray: length,
            strokeDashoffset: length,
          });
          gsap.to(line, {
            strokeDashoffset: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 50%',
              toggleActions: 'play none none none',
            },
          });
        });
      }

      // CTA fade in
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 40%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="talent"
      className="relative min-h-screen bg-umber py-24 md:py-32 overflow-hidden"
    >
      {/* Background elevation diagram */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1440 900"
      >
        {/* Structural connecting lines */}
        <path
          className="connect-line"
          d="M 200 200 L 400 350 L 600 200"
          fill="none"
          stroke="#4A4440"
          strokeWidth="1"
        />
        <path
          className="connect-line"
          d="M 400 350 L 800 300 L 1000 450"
          fill="none"
          stroke="#4A4440"
          strokeWidth="1"
        />
        <path
          className="connect-line"
          d="M 600 200 L 800 300 L 600 500"
          fill="none"
          stroke="#4A4440"
          strokeWidth="1"
        />
        <path
          className="connect-line"
          d="M 200 500 L 400 650 L 800 600"
          fill="none"
          stroke="#4A4440"
          strokeWidth="1"
        />
        <path
          className="connect-line"
          d="M 1000 200 L 1200 350 L 1000 450"
          fill="none"
          stroke="#4A4440"
          strokeWidth="1"
        />
        <path
          className="connect-line"
          d="M 800 600 L 1000 450 L 1200 650"
          fill="none"
          stroke="#4A4440"
          strokeWidth="1"
        />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="mb-16 md:mb-24">
          <h2
            className="text-ivory font-syne text-3xl md:text-[clamp(2.5rem,5vw,4rem)] tracking-[-0.02em] mb-4"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            The Structure That Raises Others
          </h2>
          <p
            className="text-aged-concrete font-dm text-base md:text-lg max-w-xl"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Building the future of African fashion
          </p>
        </div>

        {/* Talent grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
        >
          {talents.map((talent, i) => (
            <div
              key={i}
              className="talent-item group relative opacity-0"
            >
              <div className="relative aspect-[3/4] overflow-hidden border border-charcoal group-hover:border-terracotta transition-colors duration-500">
                <img
                  src={talent.image}
                  alt={talent.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Hover glow */}
                <div className="absolute inset-0 bg-terracotta/0 group-hover:bg-terracotta/10 transition-all duration-500" />
                {/* Structural node indicator */}
                <div className="absolute top-3 right-3 w-2 h-2 bg-charcoal group-hover:bg-terracotta transition-colors duration-500 rotate-45" />
              </div>
              {/* Label on hover */}
              <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p
                  className="text-ivory font-dm text-[0.7rem] tracking-[0.05em]"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {talent.name}, {talent.city}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="mt-16 md:mt-24 text-center opacity-0">
          <a
            href="#cta"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#cta')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group inline-block relative px-8 py-4 border border-terracotta text-ivory font-dm text-[0.8rem] uppercase tracking-[0.15em] overflow-hidden transition-colors duration-400 hover:text-umber"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <span className="relative z-10">Submit Your Portfolio</span>
            <span className="absolute inset-0 bg-terracotta transform translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out" />
          </a>
        </div>
      </div>
    </section>
  );
}
