# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio site (`byungyoung.github.io`) built as a Next.js 15 static export.
Design concept: **"결정 문서 (Decision Log)"** — the whole site is styled as the working
document of a PO who records decisions and rejects his own work.

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

- `app/(en)/**` — English surface, NO prefix (`/`, `/po/`, `/po/resume/`, `/po/cases/[slug]/`)
- `app/(ko)/ko/**` — Korean surface under `/ko`. Two root layouts; no top-level `app/layout.tsx`
- Language auto-detection: blocking inline script in both layouts' `<head>`
  (`lib/lang-detection.ts`) — localStorage choice first, then `navigator.language`,
  redirects before paint. Toggle stores explicit choice.
- `content/*.ts` — ALL copy lives here as typed bilingual modules (`L = Record<'ko'|'en', string>`).
  Components never hardcode copy.
- `components/doc/` — signature components: Stamp, MarginNote, RejectedOption,
  ChangelogTimeline, MetricWithCaveat, SectionLabel, DocGrid, DraftGate
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

- **Red means rejected.** The only chromatic color (`--stamp-red`) appears ONLY on
  REJECTED stamps, rejection strikethroughs, and `fix:` tokens in the correction
  history. Everything else is warm paper/ink monochrome.
- Zero elevation box-shadows. No gradients. No emoji in UI copy. No card grids.
- `--text-faint` is for decorative marks only (※, ticks) — never words (a11y).
- Density budgets: main page max 1 margin note; case pages 3-4; resume has zero
  stamps and zero notes.
- Motion vocabulary is closed: fade-up reveal, stamp press (md stamps, once),
  link underline transitions, scroll progress (case pages only). Nothing else.
  `prefers-reduced-motion` renders final state.

## Conventions

- Commit messages use emoji prefixes (e.g. `:wrench: feat:`)
- Korean-first content; all factual translations reviewed by owner before deploy
- The repo is PRIVATE — never link site visitors to repo URLs (commit history
  links will 404 for them)
