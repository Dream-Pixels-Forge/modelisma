export default function Footer() {
  return (
    <footer className="bg-umber border-t border-charcoal/30 py-8 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p
          className="text-aged-concrete font-bodoni text-[0.75rem] tracking-[0.2em]"
          style={{ fontFamily: "'Bodoni Moda', serif" }}
        >
          MODELISMA
        </p>
        <p
          className="text-deep-shadow font-dm text-[0.65rem] tracking-[0.1em] uppercase"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Fashion is the architecture of movement
        </p>
        <p
          className="text-deep-shadow font-dm text-[0.6rem] tracking-[0.05em]"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          © 2025
        </p>
      </div>
    </footer>
  );
}
