import { CorrectionHistory } from "@/components/site/correction-history";
import { site } from "@/content/site";
import type { Lang } from "@/content/types";
import { cn } from "@/lib/utils";

const TEASER_LIMIT = 3;

type SiteFooterProps = {
  lang: Lang;
  /** 'teaser' shows the three most recent corrections, 'full' the whole record. */
  corrections?: "none" | "teaser" | "full";
  /** Matches the page container so the footer lines up with the body above it. */
  containerClassName?: string;
};

export function SiteFooter({
  lang,
  corrections = "teaser",
  containerClassName = "max-w-[var(--container-doc)]",
}: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer
      data-print-hide
      className="mt-24 border-t border-border print:hidden"
    >
      <div className={cn("mx-auto px-6 py-14 lg:px-10", containerClassName)}>
        {corrections === "none" ? null : (
          <CorrectionHistory
            lang={lang}
            limit={corrections === "teaser" ? TEASER_LIMIT : undefined}
          />
        )}

        <p
          className={cn(
            "font-mono text-caption text-subtle",
            corrections === "none" ? "" : "mt-14",
          )}
        >
          © {year} {lang === "ko" ? site.name : site.nameEn}
        </p>
      </div>
    </footer>
  );
}
