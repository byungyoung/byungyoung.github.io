import type { ReactNode } from "react";

import { Stamp, type StampVariant } from "@/components/doc/stamp";
import { cn } from "@/lib/utils";

type ChangelogEntry = {
  id: string;
  version: string;
  period: string;
  title: string;
  stamp?: StampVariant;
  body?: ReactNode;
};

type ChangelogTimelineProps = {
  entries: readonly ChangelogEntry[];
  lang?: "ko" | "en";
  className?: string;
};

export function ChangelogTimeline({
  entries,
  lang = "ko",
  className,
}: ChangelogTimelineProps) {
  return (
    <ol className={cn("doc-timeline", className)}>
      {entries.map((entry) => (
        <li key={entry.id} className="doc-timeline__item">
          <span aria-hidden className="doc-timeline__tick" />
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="font-mono text-label uppercase tabular-nums text-subtle">
              {entry.version} — {entry.period}
            </span>
            <p className="text-h3 text-foreground">{entry.title}</p>
            {entry.stamp ? (
              <Stamp
                variant={entry.stamp}
                size="sm"
                lang={lang}
                seed={entry.id}
              />
            ) : null}
          </div>
          {entry.body ? (
            <div className="mt-2 text-body-sm text-muted-foreground">
              {entry.body}
            </div>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

export type { ChangelogEntry, ChangelogTimelineProps };
