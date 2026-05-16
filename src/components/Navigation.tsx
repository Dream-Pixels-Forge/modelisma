import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: 'Philosophy', href: '#philosophy' },
  { label: 'Collections', href: '#collections' },
  { label: 'Designer', href: '#designer' },
  { label: 'Talent', href: '#talent' },
  { label: 'Connect', href: '#cta' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (beamRef.current) {
      gsap.to(beamRef.current, {
        height: scrolled ? 20 : 1,
        backgroundColor: scrolled ? '#C73B2B' : '#4A4440',
        duration: 0.8,
        ease: 'power3.out',
      });
    }
  }, [scrolled]);

  const toggleMenu = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);

    if (!menuOpen) {
      setMenuOpen(true);
      document.body.style.overflow = 'hidden';
      if (overlayRef.current) {
        gsap.fromTo(
          overlayRef.current,
          { clipPath: 'inset(0 0 100% 0)' },
          {
            clipPath: 'inset(0)',
            duration: 0.7,
            ease: 'power4.out',
            onComplete: () => setIsAnimating(false),
          }
        );
      }
      if (menuItemsRef.current) {
        gsap.fromTo(
          menuItemsRef.current.children,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, delay: 0.3 }
        );
      }
    } else {
      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          clipPath: 'inset(0 0 100% 0)',
          duration: 0.5,
          ease: 'power4.in',
          onComplete: () => {
            setMenuOpen(false);
            document.body.style.overflow = '';
            setIsAnimating(false);
          },
        });
      }
    }
  }, [menuOpen, isAnimating]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) toggleMenu();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [menuOpen, toggleMenu]);

  const handleLinkClick = (href: string) => {
    toggleMenu();
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 600);
  };

  return (
    <>
      {/* Skip to content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:bg-terracotta focus:text-umber focus:px-4 focus:py-2 focus:text-sm focus:font-dm focus:tracking-[0.1em] focus:uppercase"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Skip to content
      </a>

      <nav
        ref={navRef}
        className="fixed top-0 left-0 w-full z-[100] transition-all duration-300"
        style={{
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
          backgroundColor: scrolled ? 'rgba(45, 40, 37, 0.85)' : 'transparent',
        }}
      >
        <div className="flex items-center justify-between px-6 md:px-12 h-14 md:h-[72px]">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-bodoni text-[1.25rem] tracking-[0.15em] text-ivory hover:opacity-80 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-4 focus:ring-offset-umber"
            style={{ fontFamily: "'Bodoni Moda', serif" }}
          >
            MODELISMA
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.querySelector(link.href);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative text-ivory text-[0.8rem] font-dm uppercase tracking-[0.15em] transition-colors duration-300 hover:text-saffron focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-4 focus:ring-offset-umber rounded-sm"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-terracotta opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[0.5rem]">
                  ◆
                </span>
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={toggleMenu}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-[6px] focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-4 focus:ring-offset-umber rounded-sm"
          >
            <span
              className={`block w-6 h-[2px] bg-ivory transition-all duration-400 ${
                menuOpen ? 'rotate-45 translate-y-[4px]' : ''
              }`}
            />
            <span
              className={`block w-6 h-[2px] bg-ivory transition-all duration-400 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-[2px] bg-ivory transition-all duration-400 ${
                menuOpen ? '-rotate-45 -translate-y-[4px]' : ''
              }`}
            />
          </button>
        </div>

        {/* Structural beam */}
        <div
          ref={beamRef}
          className="w-full"
          style={{
            height: 1,
            backgroundColor: '#4A4440',
            animation: scrolled ? 'beamPulse 4s ease-in-out infinite' : 'none',
          }}
        />
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[99] bg-umber flex flex-col items-center justify-center"
          style={{ clipPath: 'inset(0 0 100% 0)' }}
          onClick={(e) => {
            if (e.target === overlayRef.current) toggleMenu();
          }}
        >
          <div ref={menuItemsRef} className="flex flex-col items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="text-ivory font-syne text-3xl tracking-[0.05em] hover:text-saffron transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-4 focus:ring-offset-umber rounded-sm"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes beamPulse {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(0.5px); }
        }
      `}</style>
    </>
  );
}
