# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio site (`byungyoung.github.io`) built as a Next.js 15 static export.
Résumé and portfolio are one site that plays like a game (**"Career Run"**, owner
request 2026-11-26): title screen, career map where each job is a stage, character
sheet, quest log (case studies), trophies. The plain résumé (`/resume/`) keeps the
original **"결정 문서 (Decision Log)"** document styling and is always one click away.

## Stack

- Next.js 15 (`output: 'export'`, `trailingSlash: true`), React 19, TypeScript strict
- Tailwind v4 + shadcn/ui (button, badge, card, separator only)
- pnpm, Node 24 (`.nvmrc`)
- Deployed via GitHub Actions (`.github/workflows/deploy.yml`) → GitHub Pages
  (Pages source is "GitHub Actions"; pushing to `main` deploys)

## Development

```bash
pnpm install
pnpm dev          # dev server (drafts render with 검수 대기 markers)
pnpm build        # static export to out/
pnpm exec tsc --noEmit
```

Port 3000 may be hijacked in Chrome by another project's service worker — use
`pnpm exec next dev -p 3210` if pages look wrong locally.

## Architecture

- `app/(en)/**` — English surface, NO prefix: `/` (game), `/resume/` (plain résumé),
  `/resume/pdf/` (inline PDF viewer), `/quests/[slug]/` (case studies).
  `/po/`, `/po/resume/`, `/po/cases/[slug]/` are noindex meta-refresh redirects.
- `app/(ko)/ko/**` — Korean surface under `/ko`. Two root layouts; no top-level `app/layout.tsx`
- Language auto-detection: blocking inline script in both layouts' `<head>`
  (`lib/lang-detection.ts`) — localStorage choice first, then `navigator.language`,
  redirects before paint. Toggle stores explicit choice.
- `content/*.ts` — ALL copy lives here as typed bilingual modules (`L = Record<'ko'|'en', string>`).
  Components never hardcode copy.
- `content/game.ts` — game chrome copy only (no facts). `lib/game.ts` derives every
  stage, stat, quest, and trophy from resume/po-landing/cases at build time.
- `components/game/` — HUD, title menu, world map, sections, quest page, PDF viewer
  (pdf.js legacy build, lazy-loaded so it never weighs on the game bundle)
- `components/doc/` — DraftGate, MarginNote/AnchoredNotes, MetricWithCaveat (plain résumé)
- Résumé PDFs are generated at build time from `content/resume.ts` by route handlers
  `app/(en)/resume/byungyoung-park-resume-{en,ko}.pdf/route.ts` (`lib/resume-pdf.tsx`,
  @react-pdf/renderer). Never commit a hand-made PDF; it would drift from the copy.
- `public/po/*.html` — meta-refresh stubs preserving pre-redesign `.html` URLs

## Content Rules (hard rules — the site publicly corrects its own errors)

1. **Never invent facts, numbers, or methodology.** New claims need owner review.
2. **Draft workflow**: content items carry `status: 'draft' | 'approved'`.
   Drafts render in dev only (DraftGate) and are excluded from production builds.
   Only the owner's explicit approval flips a status to `'approved'`.
3. **No interpunct (·) enumerations** in copy or UI labels — rewrite naturally
   (owner rule). Em-dash date ranges (`2016.05 — 2018.11`) are fine. Historical
   quotes in the changelog keep their original wording.
4. Owner-verified facts: OSOF was founded while in HIGH SCHOOL (2016; university
   entry 2019.03). KU SW Volunteer Corps membership 2025.03 — 2025.12 (parallel
   to Xitst CTO, listed under activities, not career timeline).
5. Career durations are computed at build time from date ranges (`lib/duration.ts`)
   — never hardcode totals.

## Design Rules

- **No invented numbers in the game.** Skill levels, score bars, and XP that is not
  computed were removed on 2026-07-30 (commit 4fe9ee9) and must not come back. Every
  number the game shows is a count of content items or a duration from date ranges.
- **Red means rejected.** `--stamp-red` appears ONLY on rejected options ("paths not
  taken"), and `fix:` tokens in the correction history ("patch notes").
- Game palette (`app/game/tokens.css`, switched on by `.game`): night/day paper-and-ink plus
  ONE accent, signal amber, for the player, trail, progress, and primary buttons.
  Pixel display face is Silkscreen (Latin only); hangul falls back to Pretendard.
- Original pixel art only (`components/game/pixel-art.tsx`). Never imitate a specific
  existing game's name, characters, art, or look.
- No emoji in UI copy. `--text-faint` is for decorative marks only — never words.
- The plain résumé has zero stamps and zero notes, and must stay readable without JS.
- Motion vocabulary is closed: menu cursor blink, sprite walk (steps), token move on
  the map, toast in, button press. `prefers-reduced-motion` turns all of it off.

## Conventions

- Commit messages use emoji prefixes (e.g. `:wrench: feat:`)
- Korean-first content; all factual translations reviewed by owner before deploy
- The repo is PRIVATE — never link site visitors to repo URLs (commit history
  links will 404 for them)
