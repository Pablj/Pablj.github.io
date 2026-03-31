<!-- Repository: pablj.github.io - copilot instructions for AI coding agents -->
# Copilot / AI Agent Instructions

Purpose
- Help AI contributors be productive editing this static personal site.

Big picture
- This is a static GitHub Pages site (user site) composed of plain HTML pages at the repo root (`index.html`, `brazo.html`, `scheduler.html`) and an `assets/` tree for CSS, JS, fonts and images.
- No backend or build toolchain checked in. SCSS sources live under `assets/sass/` and compiled CSS under `assets/css/`.

Key files and roles (examples)
- `index.html` — homepage shell and canonical example of page markup.
- `assets/sass/main.scss` — top-level SCSS; imports partials in `assets/sass/{base,components,layout,libs}`.
- `assets/css/main.css` — compiled CSS that the site ships; update by compiling SCSS rather than editing this file directly.
- `assets/js/main.js` — site behaviour and initialization (depends on `jquery.min.js`, `breakpoints.min.js`, `jquery.scrollex.min.js`).
- `assets/webfonts/` and `assets/css/fontawesome-all.min.css` — font assets used by icons.

Developer workflows
- Local preview: serve via a static server in repo root. Example (Linux/macOS):
  - `python3 -m http.server 8000` then open `http://localhost:8000`.
- SCSS -> CSS: compile `assets/sass/main.scss` to `assets/css/main.css`. Example commands (pick installed tool):
  - Dart Sass: `sass assets/sass/main.scss:assets/css/main.css --style=expanded`
  - For production: `sass assets/sass/main.scss:assets/css/main.css --style=compressed`
- JavaScript edits: edit `assets/js/main.js`. Ensure `jquery.min.js` remains loaded before it in the HTML.

Project-specific conventions
- Edit SCSS partials inside `assets/sass/{base,components,layout,libs}`; do not edit `assets/css/main.css` directly.
- Keep markup consistent with existing HTML classes — styles assume the current class names (see `index.html`).
- JS relies on global `jQuery` and small helper libs (`breakpoints`, `scrollex`). Avoid replacing these without testing in-browser.

Debugging and testing
- Open browser DevTools console for runtime errors (missing asset order, undefined variables). Most bugs are fixable in the browser without a build step.
- When CSS changes don't appear, confirm you recompiled `assets/sass/main.scss` and that the browser cache is cleared.

Deployment notes
- This repo is named like a GitHub Pages user site (`pablj.github.io`): changing files and pushing to the default branch will update the live site. Confirm branch policy with repository owner before major changes.

When to ask the repo owner
- If you need a Node/NPM-based build (tooling is not present), ask whether to add a build toolchain (npm, gulp, or GitHub Actions).
- If you plan to change fonts or icon packs, confirm whether `assets/webfonts/` should be replaced or updated.

Examples of safe commits
- Small style tweak: edit a SCSS partial (e.g. `assets/sass/components/_button.scss`), compile `assets/sass/main.scss`, preview, and commit both the SCSS edit and the compiled `assets/css/main.css` only if the owner expects compiled CSS in repo.
- Small JS tweak: edit `assets/js/main.js`, test in `http://localhost:8000`, fix console errors, and push.

Focus on discoverable patterns only; do not add new services or CI without asking.

End.
