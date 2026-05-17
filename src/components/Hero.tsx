import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const brandRef = useRef<HTMLHeadingElement>(null);
  const chevronRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    if (imageContainerRef.current) {
      tl.fromTo(
        imageContainerRef.current,
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 1.5, ease: 'power3.out' }
      );
    }

    if (brandRef.current) {
      const chars = brandRef.current.querySelectorAll('.brand-char');
      tl.fromTo(
        chars,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
        },
        '-=0.6'
      );
    }

    const taglineEl = sectionRef.current?.querySelector('.tagline-text');
    if (taglineEl) {
      tl.fromTo(
        taglineEl,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.2'
      );
    }

    if (chevronRef.current) {
      tl.fromTo(
        chevronRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        '-=0.2'
      );
    }

    if (chevronRef.current) {
      gsap.to(chevronRef.current, {
        opacity: 0.4,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    // Parallax on hero background
    if (imageContainerRef.current) {
      gsap.to(imageContainerRef.current, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full h-screen bg-umber overflow-hidden flex flex-col items-center justify-center"
    >
      <div className="absolute top-16 left-4 md:top-20 md:left-10 z-10">
        <div ref={brandRef} className="flex flex-col">
          <span
            className="brand-char opacity-0 text-ivory font-bodoni text-6xl md:text-8xl lg:text-9xl tracking-wider leading-none"
            style={{ fontFamily: "'Bodoni Moda', serif" }}
          >
            MOD
          </span>
          <span
            className="brand-char opacity-0 text-ivory font-bodoni text-6xl md:text-8xl lg:text-9xl tracking-wider leading-none"
            style={{ fontFamily: "'Bodoni Moda', serif" }}
          >
            ELI
          </span>
          <span
            className="brand-char opacity-0 text-ivory font-bodoni text-6xl md:text-8xl lg:text-9xl tracking-wider leading-none"
            style={{ fontFamily: "'Bodoni Moda', serif" }}
          >
            SMA
          </span>
          <p
            className="tagline-text text-ivory font-dm text-xs md:text-sm tracking-[0.3em] mt-4 opacity-0"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            The body as architecture
          </p>
        </div>
      </div>

      <div
        ref={imageContainerRef}
        className="absolute inset-0 opacity-0 will-change-transform"
      >
        <img
          src="/images/collection-1.webp"
          alt="MODELISMA Collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-umber/30" />
      </div>

      <div
        ref={chevronRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0 z-10"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#E8E0D8"
          strokeWidth="2"
          strokeLinecap="square"
        >
          <path d="M6 9L12 15L18 9" />
        </svg>
      </div>
    </section>
  );
}
