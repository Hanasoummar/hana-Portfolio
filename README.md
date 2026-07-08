# Hana Soummar Portfolio — WIP

> React + Vite multi-page portfolio with terminal-style hero section.

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Build for production
npm run build
```

## 📁 Project Structure

```
hana-portfolio/
├── public/
│   ├── video/intro.mp4      ← Place your intro video here
│   └── cv.pdf               ← Place your CV here
├── src/
│   ├── components/
│   │   ├── Navbar.jsx         ← Fixed nav bar (all pages)
│   │   ├── Navbar.css
│   │   └── ParticleCanvas.jsx ← Background particle effect (all pages)
│   ├── pages/
│   │   ├── Home.jsx           ← ✅ DONE — Hero / Terminal section
│   │   ├── About.jsx          ← 🚧 WIP — Placeholder
│   │   ├── Projects.jsx       ← 🚧 WIP — Placeholder
│   │   ├── Writing.jsx        ← 🚧 WIP — Placeholder
│   │   └── Contact.jsx        ← 🚧 WIP — Placeholder
│   ├── styles/
│   │   ├── global.css         ← Shared: vars, animations, scrollbar
│   │   └── home.css           ← Home page specific styles
│   ├── App.jsx                ← Router setup
│   └── main.jsx               ← React entry point
├── index.html
├── vite.config.js
└── package.json
```

## ✅ What's Done

- [x] Home page — Terminal hero with video background
- [x] Navbar — Fixed, full-width, with `cd` navigation links
- [x] Particle canvas — Background effect (pink/blue particles)
- [x] Video controls — Play/pause + mute/unmute
- [x] Sound badge — Tap to unmute
- [x] Responsive — Mobile-friendly
- [x] CSS variables — Consistent color system
- [x] React Router — Multi-page setup ready

## 🚧 What's Next (WIP)

- [ ] **About** page — Bio, skills, timeline
- [ ] **Projects** page — Project cards with filters
- [ ] **Writing** page — Blog/articles list
- [ ] **Contact** page — Form + social links
- [ ] Add `src/hooks/` for custom hooks (e.g., `useScrollAnimation`, `useMousePosition`)
- [ ] Add `src/components/` for reusable UI (e.g., `TerminalCard`, `SectionHeader`)

## 🎨 Design Tokens

All colors are CSS custom properties in `global.css`:

| Token | Value | Usage |
|-------|-------|-------|
| `--pink` | `#F26CA7` | Primary accent |
| `--blue` | `#004B7F` | Secondary accent |
| `--role-blue` | `#4fa3e0` | Role text |
| `--bg-deep` | `#020203` | Page background |
| `--bg-panel` | `#0a0a0c` | Card/panel background |
| `--text-primary` | `#f3eef1` | Headings |
| `--text-secondary` | `#b7aebb` | Body text |
| `--text-muted` | `#6b656f` | Subtle text |

## 📝 Notes

- Place `intro.mp4` in `public/video/` before running.
- Place `cv.pdf` in `public/` for the download button to work.
- The `base: './'` in `vite.config.js` ensures relative paths work for static hosting.
