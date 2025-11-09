
# 🧠 Sujal Sanjay Chhajed — Portfolio

![MIT License](https://img.shields.io/badge/License-MIT-green.svg)

A fast, modern portfolio site showcasing my work across AI, NLP, and full‑stack development. The design follows a clean “Spatial” glass aesthetic with careful attention to performance, accessibility, and readability in both dark and light modes.

## 🌐 Live
 Single, minified CSS bundle built from `css/tw.css` (imports `fonts.css` + `site.css`)
 Self‑hosted Inter variable font with preload for faster first paint
 Lucide SVG icons (no heavy icon fonts)
 Image loading hints (loading/decoding/fetchpriority) and explicit dimensions
 content‑visibility + contain‑intrinsic‑size to skip off‑screen work
 Centralized requestAnimationFrame scheduler to coalesce UI updates
- About: a concise bio and background
 Static HTML + CSS, with Tailwind compiled locally via PostCSS
 Tooling: Tailwind CSS, postcss-import, Autoprefixer, cssnano
 Icons: Lucide (loaded with `defer`)
 Contact: Formspree‑backed form with inline success/error feedback
 Hosting: GitHub Pages
 Animation utilities: `js/raf-scheduler.js` consolidates multiple RAF users (scroll/UI/FPS)

- Glass “Spatial” look with subtle depth and glow
- Dark/Light theme toggle with preference remembered
- Responsive layout from mobile to desktop
- Accessible contrasts and motion‑reduced fallbacks

## ⚡ Performance
│  ├─ tw.css                 # Build entry (imports fonts.css + site.css)
│  ├─ fonts.css              # @font-face (source)
│  ├─ site.css               # Site styles (source)
│  └─ tailwind.build.css     # Output bundle
- Image loading hints (loading/decoding/fetchpriority) and explicit dimensions
- content‑visibility + contain‑intrinsic‑size to skip off‑screen work

## 🧰 Architecture
│  ├─ performance.js
│  ├─ meteor-shower.js
│  ├─ fireflies.js
│  ├─ raf-scheduler.js
│  └─ form.js
- Static HTML + CSS, with Tailwind compiled locally via PostCSS
- Tooling: Tailwind CSS, postcss-import, Autoprefixer, cssnano
- Icons: Lucide (loaded with `defer`)
- Contact: Formspree‑backed form with inline success/error feedback
- Hosting: GitHub Pages

## 📁 Structure

```

The Tailwind build bundles `tw.css` (which imports `fonts.css` and `site.css`) into `tailwind.build.css` using PostCSS.

Available scripts:

- Build once:
	- `npm run build:css`
- Watch during development:
	- `npm run watch:css`
- Optional minified build using the Tailwind CLI directly:
	- `npm run minify:css`

The HTML links only to `css/tailwind.build.css`.
my-portfolio/
├─ index.html
├─ Assets/
│  └─ fonts/InterVariable.woff2
├─ css/
│  ├─ tw.css                 # Build entry (imports fonts.css + site.css)
│  ├─ fonts.css              # @font-face (source)
│  ├─ site.css               # Site styles (source)
│  └─ tailwind.build.css     # Output bundle
├─ js/
│  ├─ theme-init.js
│  ├─ theme.js
│  ├─ animations.js
│  └─ form.js
├─ tailwind.config.js
├─ postcss.config.js
├─ package.json
├─ package-lock.json
├─ .gitignore
├─ LICENSE
└─ README.md
```

Note: The previous gallery page was intentionally removed to keep the experience focused.

## 📬 Contact

Email: sujalchhajed925@gmail.com

## 📄 License

MIT — see [LICENSE](./LICENSE).
