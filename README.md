# byungyoung.github.io

Personal portfolio of 박병영 (Byungyoung Park) — Technical Product Owner.

Résumé and portfolio in one calm, no-scroll journey: a traveler walks an original
isometric world, one place per career stage. Arriving opens that stage's quest
(accept, read, QUEST CLEAR with XP and trophies) and builds the path onward.
Recruiters can skip straight to the plain résumé or the PDFs at any time. The site
still publicly corrects its own errors (patch notes in the character sheet).

## Stack

Next.js 15 static export · React 19 · Tailwind v4 · shadcn/ui · pnpm · Node 24

- `/` English (default, no prefix), `/ko/*` Korean — pre-paint language detection
- `/resume/` plain résumé, `/resume/pdf/` inline PDF viewer (EN and KO CVs)
- CV files: `public/resume/cv-en.pdf`, `public/resume/cv-ko.pdf` (public copy, no
  birth date or phone number). Swap the files to update the site.
- All copy lives in typed bilingual modules under `content/`
- Unreviewed content (`status: 'draft'`) renders in dev only and is excluded from
  production builds

## Development

```bash
pnpm install
pnpm dev        # drafts visible with 검수 대기 markers
pnpm build      # static export → out/
```

## Deploy

Push to `main` → GitHub Actions builds and deploys to GitHub Pages
(`.github/workflows/deploy.yml`).

See `CLAUDE.md` for content and design rules.
