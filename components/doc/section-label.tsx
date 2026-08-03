import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionLabelProps = {
  num: string;
  children: ReactNode;
  className?: string;
};

export function SectionLabel({ num, children, className }: SectionLabelProps) {
  return (
    <p className={cn("font-mono text-label uppercase", className)}>
      <span className="me-2 font-normal tabular-nums text-subtle">{num}</span>
      <span className="font-medium text-muted-foreground">{children}</span>
    </p>
  );
}

export type { SectionLabelProps };
