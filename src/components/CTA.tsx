import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Archway() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Left pillar */}
      <mesh position={[-1.2, 0, 0]}>
        <boxGeometry args={[0.6, 3, 0.6]} />
        <meshStandardMaterial
          color="#2D2825"
          metalness={0.4}
          roughness={0.6}
        />
      </mesh>
      {/* Right pillar */}
      <mesh position={[1.2, 0, 0]}>
        <boxGeometry args={[0.6, 3, 0.6]} />
        <meshStandardMaterial
          color="#2D2825"
          metalness={0.4}
          roughness={0.6}
        />
      </mesh>
      {/* Top lintel */}
      <mesh position={[0, 1.6, 0]}>
        <boxGeometry args={[3.2, 0.4, 0.6]} />
        <meshStandardMaterial
          color="#4A4440"
          metalness={0.5}
          roughness={0.5}
        />
      </mesh>
      {/* Terracotta accent on lintel */}
      <mesh position={[0, 1.85, 0]}>
        <boxGeometry args={[3.2, 0.08, 0.65]} />
        <meshStandardMaterial
          color="#C73B2B"
          metalness={0.6}
          roughness={0.3}
          emissive="#C73B2B"
          emissiveIntensity={0.2}
        />
      </mesh>
      {/* Floating geometric elements */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 2.5;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle * 0.5) * 1.5,
              Math.sin(angle) * radius * 0.5,
            ]}
            rotation={[angle, angle * 0.5, 0]}
          >
            <tetrahedronGeometry args={[0.12, 0]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? '#C73B2B' : '#D4A84B'}
              metalness={0.8}
              roughness={0.2}
              emissive={i % 2 === 0 ? '#C73B2B' : '#D4A84B'}
              emissiveIntensity={0.3}
            />
          </mesh>
        );
      })}
    </group>
  );
}

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
  const archwayRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

      // Archway fades in
      if (archwayRef.current) {
        tl.fromTo(
          archwayRef.current,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' },
          0
        );
      }

      // Columns rise
      if (columnsRef.current) {
        const cols = columnsRef.current.querySelectorAll('.cta-column');
        tl.fromTo(
          cols,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, stagger: 0.15, duration: 0.6, ease: 'power3.out' },
          0.4
        );

        const descs = columnsRef.current.querySelectorAll('.cta-desc');
        tl.fromTo(
          descs,
          { opacity: 0 },
          { opacity: 0.6, stagger: 0.15, duration: 0.4 },
          0.7
        );
      }

      // Tagline fades in last
      if (taglineRef.current) {
        tl.fromTo(
          taglineRef.current,
          { opacity: 0 },
          { opacity: 0.5, duration: 0.5 },
          1
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
      {/* 3D Archway */}
      <div
        ref={archwayRef}
        className="relative w-full max-w-lg h-[40vh] md:h-[50vh] mb-12 md:mb-16 opacity-0"
      >
        {!isMobile ? (
          <Canvas
            camera={{ position: [0, 0, 6], fov: 50 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true }}
          >
            <ambientLight intensity={0.3} />
            <directionalLight position={[5, 5, 5]} intensity={1} color="#E8E0D8" />
            <directionalLight position={[-5, -2, -5]} intensity={0.3} color="#C73B2B" />
            <pointLight position={[0, 3, 0]} intensity={0.5} color="#D4A84B" />
            <Archway />
            <fog attach="fog" args={['#1A1716', 8, 20]} />
          </Canvas>
        ) : (
          /* Mobile fallback - CSS archway */
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-48 h-64">
              <div className="absolute left-0 bottom-0 w-6 h-full bg-charcoal/60" />
              <div className="absolute right-0 bottom-0 w-6 h-full bg-charcoal/60" />
              <div className="absolute top-0 left-0 right-0 h-6 bg-charcoal/80" />
              <div className="absolute top-0 left-0 right-0 h-1 bg-terracotta/80" />
            </div>
          </div>
        )}
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
            {/* Column capital */}
            <div
              className={`h-1 w-full mb-6 transition-all duration-500 ${
                hoveredIndex === i ? 'bg-terracotta' : 'bg-charcoal'
              }`}
            />

            {/* Title */}
            <h3
              className="text-ivory font-syne text-lg md:text-xl tracking-[-0.01em] mb-3 transition-colors duration-300 group-hover:text-saffron"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {cta.title}
            </h3>

            {/* Description */}
            <p
              className="cta-desc text-aged-concrete font-dm text-[0.75rem] leading-[1.6] opacity-60 group-hover:opacity-100 transition-opacity duration-300"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {cta.desc}
            </p>

            {/* Hover fill effect from bottom */}
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

      {/* Closing tagline */}
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
