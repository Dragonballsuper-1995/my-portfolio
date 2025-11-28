# Self-hosted Inter font

Place the following files in this folder (download from https://rsms.me/inter/ or Google Fonts download):

- Inter-Variable.woff2 (recommended, supports weights 100–900, normal style)
- Optional: Inter-Variable-Italic.woff2 (italic axis)
- Optional static fallbacks if you prefer: Inter-Regular.woff2, Inter-Bold.woff2, etc.

We already wired `css/fonts.css` to load `Inter-Variable.woff2` if present, or fall back to a locally installed Inter or the system font stack.

After you drop the files:
1) Reload the page; DevTools Network should show the WOFF2 being served from `/Assets/fonts`.
2) Once confirmed, you may remove the Google Fonts `<link>` from `index.html` if you want zero external font fetches.
