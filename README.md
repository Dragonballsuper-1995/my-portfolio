
# 🧠 Sujal Sanjay Chhajed — Portfolio

![MIT License](https://img.shields.io/badge/License-MIT-green.svg)

My personal developer portfolio showcasing AI + software work. It’s a static site optimized for performance, built with a local Tailwind build, self‑hosted fonts, and lightweight SVG icons.

## 🌐 Live

- Portfolio: https://dragonballsuper-1995.github.io/my-portfolio/

## ✨ Highlights

- Responsive, accessible UI with a glass “Spatial” theme
- Dark/Light theme toggle (state persisted)
- Lucide SVG icons (no heavy icon font)
- Self‑hosted Inter variable font (preloaded for fast paint)
- Single, minified CSS bundle (Tailwind + site + fonts)
- Performance extras: content‑visibility, reduced‑motion, image hints (loading/decoding/fetchpriority), preconnects
- Contact form wired to Formspree with inline success/error UX

## 🧰 Tech Stack

- HTML + CSS (Tailwind compiled locally via PostCSS)
- Tailwind CSS, PostCSS, Autoprefixer, cssnano, postcss-import
- Lucide icons (via unpkg)
- Formspree (zero‑backend form handling)
- Hosted on GitHub Pages

## 📁 Project Structure

```
my-portfolio/
├─ index.html                 # Main page (loads a single CSS bundle)
├─ Assets/                    # Images, fonts, favicon
│  └─ fonts/InterVariable.woff2
├─ css/
│  ├─ tw.css                  # Build entry (imports fonts.css + site.css + @tailwind)
│  ├─ fonts.css               # @font-face for Inter variable (source)
│  ├─ site.css                # Site styles (source)
│  └─ tailwind.build.css      # Output bundle (committed)
├─ js/
│  ├─ theme-init.js           # Prevent theme FOUC
│  ├─ theme.js                # Theme + dock/nav sync + animations wiring
│  ├─ animations.js           # Typewriter + 3D tilt
│  └─ form.js                 # Formspree async submit + status
├─ tailwind.config.js         # Tailwind config (content + fonts)
├─ postcss.config.js          # postcss-import + tailwindcss + autoprefixer + cssnano
├─ package.json               # build scripts
├─ package-lock.json          # lockfile for reproducible builds
├─ .gitignore                 # ignores node_modules, logs, etc.
├─ LICENSE
└─ README.md
```

Note: The former gallery page was intentionally removed.

## ▶️ Develop & Build

Prereqs: Node 18+ recommended.

Install deps:

```bash
npm install
```

Build CSS (single bundle at css/tailwind.build.css):

```bash
npm run build:css
```

Watch during development:

```bash
npm run watch:css
```

Open index.html in your browser (use a local server or VS Code Live Server for best results).

## ✉️ Contact Form (Formspree)

The contact form posts to Formspree. One‑time setup:

1. Create a form at https://formspree.io and copy your FORM_ID (looks like `f/abcdwxyz`).
2. In `index.html`, replace `FORM_ID` in the form action: `https://formspree.io/f/FORM_ID`.
3. Deploy and test. You should receive emails on submit. Inline success/error messages are handled by `js/form.js`.

## 🧪 Performance Notes

- InterVariable.woff2 is preloaded in `<head>` and self‑hosted for consistency and speed.
- Lucide icons render after `lucide.createIcons()` (script loaded with `defer`).
- Sections use `content-visibility` + `contain-intrinsic-size` to reduce offscreen work.
- Animations respect `prefers-reduced-motion`.

## 📄 License

MIT — see [LICENSE](./LICENSE).
