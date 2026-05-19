<img width="1920" height="966" alt="preview" src="https://github.com/user-attachments/assets/39de352c-c56c-4d27-996b-86faaa1250cd" />



# Modelisma

A cinematic, editorial-style website showcasing African fashion — celebrating editorial features, designer collections, and emerging talent from the continent.

## About

Modelisma is a premium digital platform dedicated to African fashion and design. The site features:

- **Editorial** — Fashion stories and editorial spreads
- **Collections** — Designer collections and lookbooks
- **Talent** — Profiles of African models and fashion visionaries
- **Designer** — Featured designer spotlight with philosophy
- **CTA** — Contact and collaboration section

## Tech Stack

| Technology | Purpose |
|------------|---------|
| React 19 | UI framework |
| TypeScript | Type safety |
| Vite | Build tool |
| Tailwind CSS 4 | Styling |
| GSAP + ScrollTrigger | Scroll animations |
| Lenis | Smooth scrolling |

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+

### Installation

```bash
# Clone the repository
git clone https://github.com/Dream-Pixels-Forge/modelisma.git
cd modelisma

# Install dependencies
pnpm install
```

### Development

```bash
pnpm dev
```

Opens at `http://localhost:5173`

### Build

```bash
pnpm build
```

Output in `dist/` folder.

### Preview Production Build

```bash
pnpm preview
```

## Project Structure

```
modelisma/
├── public/images/      # Static images
├── src/
│   ├── components/     # React components
│   │   ├── Hero.tsx
│   │   ├── Editorial.tsx
│   │   ├── Collections.tsx
│   │   ├── Talent.tsx
│   │   ├── Designer.tsx
│   │   ├── Philosophy.tsx
│   │   ├── CTA.tsx
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   └── ...
│   ├── utils/          # Utilities
│   ├── App.tsx         # Main app
│   ├── main.tsx       # Entry point
│   └── index.css       # Global styles
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server |
| `pnpm build` | Production build |
| `pnpm preview` | Preview build |

## Deployment

### Vercel (Recommended)

1. Import the repository at [vercel.com/new](https://vercel.com/new)
2. Vercel auto-detects Vite framework
3. Deploys automatically on push

### Manual Vercel CLI

```bash
npm i -g vercel
vercel
```

### Other Platforms

Build the project (`pnpm build`) and deploy the `dist/` folder to any static host:

- Netlify
- Cloudflare Pages
- GitHub Pages

## Design Features

- Cinematic scroll-driven animations
- Premium typography (Syne, Bodoni Moda, DM Sans)
- Dark umber color palette with terracotta accents
- Smooth scroll with Lenis
- Section transitions with GSAP


---

Built with ❤️ by [Dream-Pixels-Forge](https://github.com/Dream-Pixels-Forge)
