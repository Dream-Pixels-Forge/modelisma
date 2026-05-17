import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import Collections from './components/Collections';
import Designer from './components/Designer';
import Talent from './components/Talent';
import Editorial from './components/Editorial';
import CTA from './components/CTA';
import Footer from './components/Footer';
import GrainOverlay from './components/GrainOverlay';
import LoadingScreen from './components/LoadingScreen';
import SectionTransition from './components/SectionTransition';

gsap.registerPlugin(ScrollTrigger);

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'philosophy', label: 'Philosophy' },
  { id: 'collections', label: 'Collections' },
  { id: 'designer', label: 'Designer' },
  { id: 'talent', label: 'Talent' },
  { id: 'editorial', label: 'Editorial' },
  { id: 'cta', label: 'Connect' },
];

const sectionColors = [
  { bg: '#1A1716', accent: 'rgba(199,59,43,0.08)' },
  { bg: '#2D2825', accent: 'rgba(196,184,175,0.06)' },
  { bg: '#1A1716', accent: 'rgba(212,168,75,0.06)' },
  { bg: '#2D2825', accent: 'rgba(199,59,43,0.12)' },
  { bg: '#1A1716', accent: 'rgba(196,184,175,0.08)' },
  { bg: '#2D2825', accent: 'rgba(212,168,75,0.08)' },
  { bg: '#1A1716', accent: 'rgba(199,59,43,0.10)' },
];

const transitionConfig = [
  { color: '#2D2825', direction: 'top' as const },
  { color: '#1A1716', direction: 'left' as const },
  { color: '#1A1716', direction: 'right' as const },
  { color: '#2D2825', direction: 'top' as const },
  { color: '#1A1716', direction: 'left' as const },
  { color: '#2D2825', direction: 'bottom' as const },
];

function App() {
  const lenisRef = useRef<Lenis | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(0);
  const tickingRef = useRef(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      gsap.ticker.lagSmoothing(0);
      ScrollTrigger.config({ ignoreMobileResize: true });
    }

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf as any);
    };
  }, []);

  const handleScroll = useCallback(() => {
    if (tickingRef.current) return;
    tickingRef.current = true;

    requestAnimationFrame(() => {
      const scrollY = window.scrollY + window.innerHeight / 2;
      let current = 0;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= scrollY) {
          current = i;
          break;
        }
      }
      setActiveSection(current);
      tickingRef.current = false;
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleLoadComplete = () => {
    setLoading(false);
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  };

  const currentColor = sectionColors[activeSection] || sectionColors[0];

  return (
    <div
      className="relative"
      style={{
        backgroundColor: currentColor.bg,
        transition: 'background-color 0.8s ease',
      }}
    >
      {loading && <LoadingScreen onComplete={handleLoadComplete} />}
      <GrainOverlay />

      {/* Scroll progress indicator */}
      <div className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-3">
        {sections.map((section, i) => (
          <button
            key={section.id}
            onClick={() => {
              document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative flex items-center gap-3"
            aria-label={`Navigate to ${section.label}`}
          >
            <span
              className={`block transition-all duration-500 ${
                i === activeSection
                  ? 'w-3 h-3 bg-terracotta'
                  : 'w-2 h-2 bg-charcoal group-hover:bg-deep-shadow'
              }`}
              style={{
                clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
              }}
            />
            <span
              className={`text-[0.6rem] uppercase tracking-[0.2em] transition-all duration-300 whitespace-nowrap ${
                i === activeSection
                  ? 'opacity-100 text-ivory'
                  : 'opacity-30 group-hover:opacity-80 text-aged-concrete'
              }`}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {section.label}
            </span>
          </button>
        ))}
      </div>

      <div
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000"
        style={{ backgroundColor: currentColor.accent }}
      />

      <Navigation />
      <main id="main-content" className="relative z-10">
        <Hero />
        <SectionTransition color={transitionConfig[0].color} direction={transitionConfig[0].direction} />
        <Philosophy />
        <SectionTransition color={transitionConfig[1].color} direction={transitionConfig[1].direction} />
        <Collections />
        <SectionTransition color={transitionConfig[2].color} direction={transitionConfig[2].direction} />
        <Designer />
        <SectionTransition color={transitionConfig[3].color} direction={transitionConfig[3].direction} />
        <Talent />
        {/* Breath moment between Talent and Editorial */}
        <div className="relative w-full h-[30vh] md:h-[40vh] flex items-center justify-center overflow-hidden bg-umber">
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />
          <p
            className="text-ivory/30 font-bodoni text-lg md:text-xl tracking-[0.3em] italic select-none"
            style={{ fontFamily: "'Bodoni Moda', serif" }}
          >
            Every structure has a story
          </p>
        </div>
        <SectionTransition color={transitionConfig[4].color} direction={transitionConfig[4].direction} />
        <Editorial />
        <SectionTransition color={transitionConfig[5].color} direction={transitionConfig[5].direction} />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
