"use client";

import { useState } from "react";

import { PdfViewer, type PdfViewerCopy } from "@/components/pdf/pdf-viewer";
import type { Lang } from "@/content/types";

type Edition = { lang: Lang; label: string; href: string; downloadLabel: string; fileName: string };

type PdfReaderProps = {
  initial: Lang;
  editions: Edition[];
  groupLabel: string;
  openLabel: string;
  viewerCopy: PdfViewerCopy;
};

/** Edition switch (follows the site language first), downloads for both, and the inline viewer. */
export function PdfReader({ initial, editions, groupLabel, openLabel, viewerCopy }: PdfReaderProps) {
  const [active, setActive] = useState<Lang>(initial);
  const current = editions.find((edition) => edition.lang === active) ?? editions[0];

  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center gap-3">
        <div role="radiogroup" aria-label={groupLabel} className="inline-flex rounded-md border border-border p-0.5">
          {editions.map((edition) => (
            <button
              key={edition.lang}
              type="button"
              role="radio"
              aria-checked={edition.lang === active}
              lang={edition.lang}
              onClick={() => setActive(edition.lang)}
              className="min-h-9 rounded-[5px] px-3 text-caption text-muted-foreground transition-colors aria-checked:bg-ink aria-checked:text-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {edition.label}
            </button>
          ))}
        </div>
        <a href={current.href} target="_blank" rel="noreferrer" className="pv-link">
          {openLabel}
        </a>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {editions.map((edition) => (
          <a
            key={edition.lang}
            href={edition.href}
            download={edition.fileName}
            className="inline-flex min-h-10 items-center rounded-md border border-border px-3 text-caption text-ink transition-colors hover:bg-raised focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {edition.downloadLabel}
          </a>
        ))}
      </div>

      <PdfViewer key={current.href} src={current.href} copy={viewerCopy} />
    </div>
  );
}
