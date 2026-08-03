import type { ReactNode } from "react";

import { ui } from "@/content/ui";
import type { ContentStatus, Lang } from "@/content/types";
import { cn } from "@/lib/utils";

const IS_DEV = process.env.NODE_ENV === "development";

/** True when an item survives into a production build. */
export function isPublished(status: ContentStatus): boolean {
  return status === "approved";
}

/** True when an item is visible on the surface currently being rendered. */
export function isVisible(status: ContentStatus): boolean {
  return IS_DEV || isPublished(status);
}

type DraftGateProps = {
  lang: Lang;
  /** Content review state. 'draft' items never reach a production build. */
  status?: ContentStatus;
  /**
   * Forces the dev-only treatment even for approved content — used where a page
   * is already at its margin-note density budget and the owner still needs to
   * see the omitted candidate in situ.
   */
  devOnly?: boolean;
  children: ReactNode;
  className?: string;
};

/**
 * Renders unreviewed (or budget-omitted) content in development only, marked
 * with a mono chip so the owner can review it in place. Production builds drop
 * it entirely.
 */
export function DraftGate({
  lang,
  status = "draft",
  devOnly = false,
  children,
  className,
}: DraftGateProps) {
  const gated = devOnly || !isPublished(status);

  if (!gated) return <>{children}</>;
  if (!IS_DEV) return null;

  return (
    <div data-draft-gate className={cn("relative", className)}>
      <span className="mb-2 inline-flex w-fit items-center rounded-sm border border-dashed border-strong px-1.5 py-px font-mono text-[10px] leading-[1.5] tracking-[0.08em] text-subtle">
        {ui.marginNote.draftMarker[lang]}
      </span>
      {children}
    </div>
  );
}
