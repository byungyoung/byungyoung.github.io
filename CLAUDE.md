# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio site (`byungyoung.github.io`) — a single-page application built with **zero dependencies** (no npm, no build tools, no frameworks). Pure HTML/CSS/JavaScript served directly via GitHub Pages.

## Development

No build step. Edit files and open `index.html` in a browser to preview. Deploy by pushing to `main` — GitHub Pages serves the root automatically.

To preview locally:
```bash
open index.html
# or use any static server:
python3 -m http.server 8000
```

## Architecture

### Active files (the actual site)
- `index.html` — entire SPA markup, SEO meta tags, JSON-LD schema
- `assets/css/style.css` — all styles, CSS custom properties for dark/light theming
- `assets/js/main.js` — theme toggle, i18n loading, IntersectionObserver animations, scroll progress bar, active nav highlighting, project card tilt effects
- `assets/js/i18n.js` — `window.I18N` dictionary with `ko`/`en` translations keyed by `data-i18n` attribute values

### Legacy files (archived, not used by index.html)
`/css/`, `/js/`, `/html/` directories contain old multi-page site structure. Not referenced by the current site.

## Key Patterns

**Theming:** `data-theme` attribute on `<html>` toggles CSS variables. Persisted in `localStorage('theme')`. Falls back to `prefers-color-scheme`.

**i18n:** HTML elements use `data-i18n="key.name"` attributes. `i18n.js` loads deferred, fires `I18N_READY` custom event. `main.js` listens and applies translations. Language stored in `localStorage('lang')`, defaults to `navigator.language`.

**Animations:** Single IntersectionObserver instance handles both fade-in animations (`data-animate` elements) and active section detection for nav highlighting.

**Accessibility:** ARIA attributes, semantic HTML, `focus-visible` states, `prefers-reduced-motion` respected. Project card tilt disabled on touch devices.

## Conventions

- Korean-first content with English translations via i18n keys
- Commit messages use emoji prefixes (e.g., `:wrench: feat:`)
- All assets under `/assets/` (css, js, Img)
- No TypeScript, no linting, no formatting tools configured
