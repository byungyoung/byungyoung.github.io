import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

const OFFSETS = ["2px", "8px", "14px"] as const;

type MarginNoteProps = {
  children: ReactNode;
  offset?: 0 | 1 | 2;
  label?: string;
  className?: string;
};

export function MarginNote({
  children,
  offset = 0,
  label = "여백 메모",
  className,
}: MarginNoteProps) {
  return (
    <aside
      role="note"
      aria-label={label}
      className={cn("doc-note", className)}
      style={{ "--doc-note-offset": OFFSETS[offset] } as CSSProperties}
    >
      <span aria-hidden className="doc-note__mark">
        ※
      </span>
      <span aria-hidden className="doc-note__rule" />
      <p className="doc-note__body">{children}</p>
    </aside>
  );
}

export type { MarginNoteProps };
