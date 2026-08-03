import { changelog, changelogIntro } from "@/content/changelog";
import { site } from "@/content/site";
import { ui } from "@/content/ui";
import type { Lang } from "@/content/types";
import { isVisible } from "@/components/doc/draft-gate";

const FIX_TOKEN = "fix:";

type CorrectionHistoryProps = {
  lang: Lang;
  /** Main page shows a teaser; the PO landing carries the whole record. */
  limit?: number;
};

export function CorrectionHistory({ lang, limit }: CorrectionHistoryProps) {
  const entries = changelog.filter((entry) => isVisible(entry.status));
  const shown = typeof limit === "number" ? entries.slice(0, limit) : entries;

  if (shown.length === 0) return null;

  return (
    <section aria-labelledby="corrections-heading">
      <h2
        id="corrections-heading"
        className="font-mono text-label uppercase text-subtle"
      >
        {ui.footer.correctionsHeading[lang]}
      </h2>
      <p className="mt-3 max-w-[var(--measure)] text-body-sm text-muted-foreground">
        {changelogIntro[lang]}
      </p>

      <ol className="mt-6 max-w-[var(--measure)] divide-y divide-hairline border-t border-hairline">
        {shown.map((entry) => (
          <li key={`${entry.commit}-${entry.date}-${entry.text.ko}`} className="py-4">
            <p className="flex flex-wrap items-baseline gap-x-2 font-mono text-caption tabular-nums">
              <span className="text-subtle">{entry.date}</span>
              <span className="font-medium text-stamp">{FIX_TOKEN}</span>
              <span className="text-subtle">{entry.commit}</span>
            </p>
            <p className="mt-2 text-body-sm text-muted-foreground">
              {entry.text[lang]}
            </p>
          </li>
        ))}
      </ol>

      <p className="mt-6">
        <a
          href={site.urls.repoCommits}
          rel="noreferrer"
          target="_blank"
          className="font-mono text-caption text-muted-foreground underline decoration-strong underline-offset-4 transition-colors hover:text-foreground hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          {ui.footer.allRecordsLink[lang]}
        </a>
      </p>
    </section>
  );
}
