
# 🧠 Sujal Sanjay Chhajed — Portfolio

![MIT License](https://img.shields.io/badge/License-MIT-green.svg)

A fast, modern portfolio site showcasing my work across AI, NLP, and full‑stack development. The design follows a clean “Spatial” glass aesthetic with careful attention to performance, accessibility, and readability in both dark and light modes.

## 🌐 Live

https://dragonballsuper-1995.github.io/my-portfolio/

## 🔎 What’s inside

- About: a concise bio and background
- Projects: highlights with links to code and live demos
- Skills: core areas and tools I use
- Contact: a simple way to reach me (email form)

## ✨ Design & UX

- Glass “Spatial” look with subtle depth and glow
- Dark/Light theme toggle with preference remembered
- Responsive layout from mobile to desktop
- Accessible contrasts and motion‑reduced fallbacks

## ⚡ Performance

- Single, minified CSS bundle (Tailwind + site + fonts)
- Self‑hosted Inter variable font with preload for faster first paint
- Lucide SVG icons (no heavy icon fonts)
- Image loading hints (loading/decoding/fetchpriority) and explicit dimensions
- content‑visibility + contain‑intrinsic‑size to skip off‑screen work

## 🧰 Architecture

- Static HTML + CSS, with Tailwind compiled locally via PostCSS
- Tooling: Tailwind CSS, postcss-import, Autoprefixer, cssnano
- Icons: Lucide (loaded with `defer`)
- Contact: Formspree‑backed form with inline success/error feedback
- Hosting: GitHub Pages

## 📁 Structure

```
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
