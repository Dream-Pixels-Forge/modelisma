import { useEffect, useRef, useState } from 'react';
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

gsap.registerPlugin(ScrollTrigger);

function App() {
  const lenisRef = useRef<Lenis | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.12,
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

  const handleLoadComplete = () => {
    setLoading(false);
    // Refresh ScrollTrigger after loading
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  };

  return (
    <div className="relative">
      {loading && <LoadingScreen onComplete={handleLoadComplete} />}
      <GrainOverlay />
      <Navigation />
      <main id="main-content">
        <Hero />
        <Philosophy />
        <Collections />
        <Designer />
        <Talent />
        <Editorial />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
