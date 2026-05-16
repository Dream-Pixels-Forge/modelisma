import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Designer() {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'top 20%',
          scrub: false,
          toggleActions: 'play none none none',
        },
      });

      // Portrait emerges from shadow
      if (portraitRef.current) {
        tl.fromTo(
          portraitRef.current,
          { filter: 'brightness(0)' },
          { filter: 'brightness(1)', duration: 0.8, ease: 'power2.out' },
          0
        );
      }

      // Divider sweeps down
      if (dividerRef.current) {
        tl.fromTo(
          dividerRef.current,
          { clipPath: 'inset(0 0 100% 0)' },
          { clipPath: 'inset(0)', duration: 0.6, ease: 'power3.out' },
          0.3
        );
      }

      // Name writes in
      if (nameRef.current) {
        const chars = nameRef.current.querySelectorAll('.name-char');
        tl.fromTo(
          chars,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, stagger: 0.03, duration: 0.4, ease: 'power2.out' },
          0.4
        );
      }

      // Title fades in
      if (titleRef.current) {
        tl.fromTo(
          titleRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4 },
          0.6
        );
      }

      // Paragraphs stagger in
      if (textRef.current) {
        const paras = textRef.current.querySelectorAll('p');
        tl.fromTo(
          paras,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.2, duration: 0.5, ease: 'power2.out' },
          0.7
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const name = 'Deborah Sikidisa';

  return (
    <section
      ref={sectionRef}
      id="designer"
      className="relative min-h-screen bg-umber flex flex-col md:flex-row"
    >
      {/* Portrait - 60% on desktop, full width on mobile */}
      <div className="relative w-full md:w-[60%] min-h-[50vh] md:min-h-screen overflow-hidden">
        <div
          ref={portraitRef}
          className="absolute inset-0"
          style={{ filter: 'brightness(0)' }}
        >
          <img
            src="/images/designer-portrait.jpg"
            alt="Deborah Sikidisa"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* Ambient zoom animation */}
          <div
            className="absolute inset-0"
            style={{
              animation: 'ambientZoom 6s ease-in-out infinite alternate',
            }}
          />
        </div>
      </div>

      {/* Divider - vertical on desktop, horizontal on mobile */}
      <div
        ref={dividerRef}
        className="hidden md:block w-px bg-charcoal self-stretch"
        style={{ clipPath: 'inset(0 0 100% 0)' }}
      />
      <div className="md:hidden h-px bg-charcoal w-full" />

      {/* Text - 40% on desktop, full width on mobile */}
      <div className="w-full md:w-[40%] flex flex-col justify-center px-6 md:px-12 lg:px-16 py-16 md:py-0">
        <p
          ref={titleRef}
          className="text-aged-concrete font-dm text-[0.7rem] uppercase tracking-[0.2em] mb-4 opacity-0"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Founder & Creative Director
        </p>

        <h2
          ref={nameRef}
          className="text-ivory font-syne text-2xl md:text-[2.5rem] tracking-[-0.02em] mb-8"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          {name.split('').map((char, i) => (
            <span key={i} className="name-char inline-block opacity-0">
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h2>

        <div ref={textRef} className="space-y-6">
          <p
            className="text-ivory/80 font-dm text-base md:text-[1.125rem] leading-[1.8] opacity-0"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            I do not design clothes. I design structures that happen to be worn. 
            Every seam is a load-bearing element. Every drape is a tensile calculation. 
            My garments are not decorative — they are architectural propositions 
            about how the body occupies space.
          </p>
          <p
            className="text-ivory/80 font-dm text-base md:text-[1.125rem] leading-[1.8] opacity-0"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Born in Kinshasa, trained in London, rooted in the red clay of my grandmother's 
            compound — I build what I carry everywhere. The mud walls of my childhood 
            taught me that structure is warmth. The concrete towers of my education 
            taught me that warmth needs structure.
          </p>
          <p
            className="text-ivory/80 font-dm text-base md:text-[1.125rem] leading-[1.8] opacity-0"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            MODELISMA is not a brand. It is a manifesto written in fabric and form. 
            Model Is Ma — fashion is fundamentally architectural. And Africa is 
            fundamentally the future of both.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes ambientZoom {
          from { transform: scale(1); }
          to { transform: scale(1.02); }
        }
      `}</style>
    </section>
  );
}
