# byungyoung.github.io

Personal portfolio of 박병영 (Byungyoung Park) — Technical Product Owner.

Résumé and portfolio in one site that plays like a game: a title screen, a career
map where every job is a stage, a character sheet, a quest log of case studies, and
trophies. Recruiters can skip straight to the plain résumé or the PDF at any time.
The site still publicly corrects its own errors (the "patch notes" at the bottom).

## Stack

Next.js 15 static export · React 19 · Tailwind v4 · shadcn/ui · pnpm · Node 24

- `/` English (default, no prefix), `/ko/*` Korean — pre-paint language detection
- `/resume/` plain résumé, `/resume/pdf/` inline PDF viewer (PDF generated at build)
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
