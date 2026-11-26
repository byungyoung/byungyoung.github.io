# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio site (`byungyoung.github.io`) built as a Next.js 15 static export.
Résumé and portfolio are one site that plays like a calm journey (owner direction
2026-11-26/27): no page scroll on `/`, one full-screen isometric scene where a traveler
walks from place to place (one place per career stage). Arriving opens that stage's
quest (accept → page through → QUEST CLEAR with XP and trophies) and builds the path to
the next place. Plain mode (`/resume/`, `/quests/[slug]/`, `/resume/pdf/`) is normal
scrolling text in the original **"결정 문서 (Decision Log)"** styling, always one click away.

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

- `app/(en)/**` — English surface, NO prefix: `/` (journey), `/resume/` (plain résumé),
  `/resume/pdf/` (inline PDF viewer), `/quests/[slug]/` (case studies).
  `/po/`, `/po/resume/`, `/po/cases/[slug]/` are noindex meta-refresh redirects.
- `app/(ko)/ko/**` — Korean surface under `/ko`. Two root layouts; no top-level `app/layout.tsx`
- Language auto-detection: blocking inline script in both layouts' `<head>`
  (`lib/lang-detection.ts`) — localStorage choice first, then `navigator.language`,
  redirects before paint. Toggle stores explicit choice.
- `content/*.ts` — ALL copy lives here as typed bilingual modules (`L = Record<'ko'|'en', string>`).
  Components never hardcode copy.
- `content/resume.ts` — the FINAL PO résumé, mirrored from by-brain
  `output/resume/[resume]박병영.md` (ko) and `[resume]Byungyoung.md` (en), commit
  3318e1d9a5 (2026-10-19). The two CVs are not translations; bullets differ per language.
  When the CV changes, update it there first, then here.
- `content/journey.ts` — journey copy and per-place staging (landmark, sky, trophies with
  `source`). `lib/journey.ts` builds every place from resume.ts + cases at build time.
- `components/journey/` — isometric world (`geometry.ts`, `shapes.tsx`, `landmarks.tsx`,
  `world.tsx`), traveler, camera, quest card, QUEST CLEAR overlay, panels, HUD.
  SVG + CSS + Web Animations only; no game engine or animation library.
- `components/plain/` — case-study page and PDF page (plain mode).
  `components/pdf/pdf-viewer.tsx` — pdf.js legacy build, lazy-loaded.
- **CV PDFs are drop-in files**: `public/resume/cv-en.pdf` (English CV as submitted) and
  `public/resume/cv-ko.pdf` (Korean CV, PUBLIC COPY with birth date and phone number
  removed by re-rendering the source without those rows). Replace the files to update
  every viewer and download. Never commit the unredacted Korean CV or its source.
- `components/doc/` — DraftGate, MarginNote/AnchoredNotes, MetricWithCaveat (plain mode)
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

- **No invented numbers in the journey.** Skill levels and score bars were removed on
  2026-07-30 (commit 4fe9ee9) and must not come back. XP = months in a role (computed
  from date ranges at build time), a level = 12 XP = one year. Nothing else is scored.
- **Red means rejected.** `--stamp-red` appears ONLY on rejected options ("paths not
  taken"), and `fix:` tokens in the correction history ("patch notes").
- Journey look (`app/journey/*.css`): soft sky gradients that move from dawn (2016) to
  night (now), warm paper islands, one ochre accent (the traveler's jacket, progress,
  primary marks). The journey keeps its own light UI in both site themes.
- ORIGINAL world only: own landmarks per career stage (workshop, townhouses, gate,
  library, observatory, beacon) and an original traveler. Never copy Monument Valley or
  any existing game's characters, architecture, palettes, impossible geometry, or UI.
- No page scroll on the journey; long quest text scrolls inside the card only.
- Every animation is skippable (tap anywhere on QUEST CLEAR, tap during a walk) and
  nothing blocks for more than about two seconds. `prefers-reduced-motion` shows the
  final state of everything (camera cuts, no walk, no assembly).
- No emoji in UI copy. `--text-faint` is for decorative marks only — never words.
- The plain résumé has zero stamps and zero notes, and must stay readable without JS.

## Conventions

- Commit messages use emoji prefixes (e.g. `:wrench: feat:`)
- Korean-first content; all factual translations reviewed by owner before deploy
- The repo is PRIVATE — never link site visitors to repo URLs (commit history
  links will 404 for them)
