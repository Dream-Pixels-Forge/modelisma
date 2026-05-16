import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const editorials = [
  {
    image: '/images/editorial-1.jpg',
    collection: 'The Column — SS / 2024',
    credit: 'Photography: Deborah Sikidisa',
  },
  {
    image: '/images/editorial-2.jpg',
    collection: 'The Façade — AW / 2024',
    credit: 'Photography: Kofi Mensah',
  },
  {
    image: '/images/editorial-3.jpg',
    collection: 'The Span — SS / 2025',
    credit: 'Photography: Zara Ibrahim',
  },
  {
    image: '/images/editorial-4.jpg',
    collection: 'The Vertex — FW / 2025',
    credit: 'Photography: Amina Diallo',
  },
  {
    image: '/images/editorial-5.jpg',
    collection: 'The Arch — SS / 2026',
    credit: 'Photography: Thabo Nkosi',
  },
  {
    image: '/images/editorial-6.jpg',
    collection: 'The Cantilever — AW / 2026',
    credit: 'Photography: Nia Mbeki',
  },
];

export default function Editorial() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item) => {
        if (!item) return;

        const img = item.querySelector('.editorial-img');
        const label = item.querySelector('.editorial-label');
        const credit = item.querySelector('.editorial-credit');
        const parallaxBg = item.querySelector('.parallax-bg');

        // Ken Burns + clip-path reveal
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1, clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' },
            {
              scale: 1.05,
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
              ease: 'none',
              scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                end: 'top 20%',
                scrub: 1,
              },
            }
          );
        }

        // Parallax background
        if (parallaxBg) {
          gsap.to(parallaxBg, {
            yPercent: -15,
            ease: 'none',
            scrollTrigger: {
              trigger: item,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          });
        }

        if (label) {
          gsap.fromTo(
            label,
            { opacity: 0, x: 20 },
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 50%',
                toggleActions: 'play none none none',
              },
            }
          );
        }

        if (credit) {
          gsap.fromTo(
            credit,
            { opacity: 0 },
            {
              opacity: 0.5,
              duration: 0.4,
              scrollTrigger: {
                trigger: item,
                start: 'top 50%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="editorial" className="relative bg-umber">
      <div className="py-16 md:py-24 px-6 md:px-12">
        <h2
          className="text-ivory font-syne text-3xl md:text-[clamp(2.5rem,5vw,4rem)] tracking-[-0.02em] mb-16 md:mb-24 max-w-7xl mx-auto"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Architectural Studies
        </h2>
      </div>

      {editorials.map((editorial, i) => (
        <div
          key={i}
          ref={(el) => { itemsRef.current[i] = el; }}
          className="relative min-h-[80vh] md:min-h-screen overflow-hidden group"
        >
          {/* Image with Ken Burns and parallax */}
          <div
            className="editorial-img absolute inset-0 overflow-hidden"
            style={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' }}
          >
            <div className="parallax-bg absolute inset-[-15%] w-[130%] h-[130%]">
              <img
                src={editorial.image}
                alt={editorial.collection}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            {/* Subtle desaturation lift on hover */}
            <div className="absolute inset-0 bg-umber/0 group-hover:bg-umber/10 transition-all duration-500" />
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-umber/60 via-transparent to-transparent" />
          </div>

          {/* Collection label */}
          <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-10">
            <p
              className="editorial-label text-ivory font-syne text-sm md:text-base tracking-[0.15em] opacity-70 group-hover:text-saffron transition-colors duration-300"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {editorial.collection}
            </p>
          </div>

          {/* Image credit */}
          <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 z-10">
            <p
              className="editorial-credit text-ivory font-dm text-[0.6rem] tracking-[0.1em] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {editorial.credit}
            </p>
          </div>

          {/* Geometric corner accent */}
          <div className="absolute top-8 right-8 md:top-12 md:right-12 z-10">
            <div className="w-8 h-8 border-t border-r border-ivory/20 group-hover:border-terracotta/40 transition-colors duration-500" />
          </div>
        </div>
      ))}
    </section>
  );
}
