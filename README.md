
# 🧠 Sujal Sanjay Chhajed — Portfolio

![MIT License](https://img.shields.io/badge/License-MIT-green.svg)

A fast, modern portfolio showcasing my work across AI, NLP, and full‑stack development. Designed with a clean “Spatial” glass aesthetic, high contrast, and smooth animations that respect user motion preferences.

## 🌐 Live

GitHub Pages: https://dragonballsuper-1995.github.io/my-portfolio/

## ✨ Highlights

- Hero section with animated meteor shower (Three.js) & aurora gradient name
- Typewriter subtitle using the Nabla color font with custom palettes (dark/light)
- Glass UI dock + responsive navbar with circular theme reveal (View Transition API)
- Dark / Light theme toggle persisted in `localStorage`
- Fireflies micro‑interaction on hover (performance aware & paused offscreen)
- Formspree contact form with inline validation + status messages
- Single Gmail compose button and direct tel: call action

## 📄 Sections

- About: concise bio & education/experience cards
- Projects: showcase with GitHub + live demo links
- Skills: progress bars & badges of domains/technologies
- Contact: email / phone + message form

## ⚡ Performance Features

- Single, minified CSS bundle built from `css/tw.css` (imports `fonts.css` + `site.css`)
- Self‑hosted Inter variable font (preload + `font-display: swap`)
- Lucide SVG icons (lightweight, deferred)
- `content-visibility` and `contain-intrinsic-size` on heavy sections to skip off‑screen layout/paint
- Centralized `requestAnimationFrame` scheduler (`js/raf-scheduler.js`) to coalesce FPS, scroll & animation updates
- Adaptive quality: throttled meteor/star updates when scrolled away; fireflies paused offscreen
- Deferred non‑critical scripts + GPU hints (`will-change`, `translate3d`, `backface-visibility`)
- Light mode & reduced motion fallbacks

## 🧰 Architecture

| Layer | Details |
|-------|---------|
| HTML  | Single static `index.html` served via GitHub Pages |
| CSS   | Tailwind + custom layers (`fonts.css`, `site.css`, feature CSS) bundled into `tailwind.build.css` |
| JS    | Modular enhancement scripts (theme, animations, performance, meteor, fireflies, form) |
| Build | PostCSS pipeline: `postcss-import`, `tailwindcss`, `autoprefixer`, `cssnano` |
| Assets| Self‑hosted Inter fonts + project images + favicon |

## 🛠 Tech Stack

- Tailwind CSS 3.x
- PostCSS / Autoprefixer / cssnano
- Three.js (r128) for background meteors & starfield
- Formspree (contact handling)
- Lucide icons

## 📁 File Structure

```
my-portfolio/
├─ index.html
├─ Assets/
│  ├─ fonts/
│  │  ├─ InterVariable.woff2
│  │  └─ InterVariable-Italic.woff2
│  ├─ favicon.png
│  ├─ profile-pic-cropped.png
│  ├─ yt-title-desc-generator.png
│  ├─ anomlogbert.png
│  ├─ urban-escapade.png
│  ├─ fpl-analytics-hub.png
│  └─ Updated Resume.pdf
├─ css/
│  ├─ tw.css                # Build entry (imports fonts.css + site.css)
│  ├─ fonts.css             # @font-face declarations
│  ├─ site.css              # Core site styles & theme overrides
│  ├─ aurora.css            # Aurora gradient effect
│  ├─ meteor.css            # Meteor canvas styling
│  ├─ fireflies.css         # Fireflies hover effect
│  ├─ nabla-typewriter.css  # Typewriter font palettes & animation styles
│  ├─ performance.css       # Perf & containment utilities
│  └─ tailwind.build.css    # Output bundle (generated)
├─ js/
│  ├─ theme-init.js         # Early theme FOUC prevention
│  ├─ raf-scheduler.js      # Central RAF scheduler
│  ├─ theme.js              # Theme toggle + scroll/nav logic
│  ├─ animations.js         # Typewriter + card tilt
│  ├─ meteor-shower.js      # Three.js meteor & stars system
│  ├─ fireflies.js          # Fireflies micro‑interaction
│  ├─ performance.js        # FPS monitoring + dynamic quality
│  └─ form.js               # Contact form handling
├─ tailwind.config.js
├─ postcss.config.js
├─ package.json
├─ LICENSE
└─ README.md
```

## 🚀 Getting Started

Clone & install dependencies:

```bash
git clone https://github.com/Dragonballsuper-1995/my-portfolio.git
cd my-portfolio
npm install
```

## � Development

Watch CSS while editing Tailwind classes:

```bash
npm run watch:css
```

Serve locally (one option):

```bash
python -m http.server 8000
```

Visit: http://localhost:8000

## 🏗 Build

Generate/update the production CSS bundle:

```bash
npm run build:css
```

Optional additional minified build via Tailwind CLI:

```bash
npm run minify:css
```

## 🌒 Theming

- Dark mode is default; light mode applied if `localStorage.theme === 'light'`.
- Circular reveal uses View Transition API (falls back gracefully where unsupported).
- Nabla font palette overrides ensure consistent brand colors across dark/light.

## ♿ Accessibility

- High contrast palette for both themes.
- Respects `prefers-reduced-motion` (disables heavy animations & visibility transitions).
- Semantic HTML landmarks & descriptive alt text for project images.
- Focus states preserved through glass UI styling.

## 🧪 Performance Strategy

- Avoids layout thrash by caching rects when possible and throttling off‑screen updates.
- Single RAF loop for multiple concerns via scheduler.
- Active reduction of animated elements on sustained low FPS (<50 for 3s).

## 📬 Contact

Email: sujalchhajed925@gmail.com\
LinkedIn: https://www.linkedin.com/in/sujalchhajed925/

## 📄 License

MIT — see [LICENSE](./LICENSE)

---
If you have suggestions or spot an optimization opportunity, feel free to open an issue or PR. 🙌
