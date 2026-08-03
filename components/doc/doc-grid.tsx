import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

export function DocGrid({ className, ...props }: ComponentProps<"div">) {
  return (
    <div data-slot="doc-grid" className={cn("doc-grid", className)} {...props} />
  );
}

type DocRowProps = {
  main: ReactNode;
  note?: ReactNode;
  className?: string;
};

export function DocRow({ main, note, className }: DocRowProps) {
  return (
    <div data-slot="doc-row" className={cn("doc-row", className)}>
      <div className="doc-row__main">{main}</div>
      {note ? <div className="doc-row__note">{note}</div> : null}
    </div>
  );
}

export type { DocRowProps };
