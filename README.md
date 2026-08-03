# byungyoung.github.io

Personal portfolio of 박병영 (Byungyoung Park) — Technical Product Owner.

Built as a **"Decision Log"**: the site is styled as the working document of a PO
who records decisions, keeps the reasons for what was rejected, and publicly
corrects its own errors (see the correction history in the footer).

## Stack

Next.js 15 static export · React 19 · Tailwind v4 · shadcn/ui · pnpm · Node 24

- `/` English (default, no prefix) · `/ko/*` Korean — pre-paint language detection
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
