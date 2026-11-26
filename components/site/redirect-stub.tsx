import type { Metadata } from "next";

import type { Lang } from "@/content/types";
import { localizePath } from "@/lib/paths";

const COPY: Record<Lang, string> = {
  en: "This page moved to",
  ko: "이 페이지는 다음 주소로 옮겼습니다:",
};

/**
 * Pre-merge routes (/po/, /po/resume/, /po/cases/*) stay alive as static
 * redirects so old links and bookmarks keep working. GitHub Pages cannot send
 * a 301, so this is a meta refresh plus a visible link; React hoists the
 * <meta> into <head>.
 */
export function redirectMetadata(to: string, lang: Lang): Metadata {
  return {
    robots: { index: false, follow: true },
    alternates: { canonical: localizePath(to, lang) },
  };
}

type RedirectStubProps = { to: string; lang: Lang };

export function RedirectStub({ to, lang }: RedirectStubProps) {
  const target = localizePath(to, lang);

  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${target}`} />
      <main id="main" className="mx-auto max-w-[var(--container)] px-6 py-16">
        <p className="text-body text-muted-foreground">
          {COPY[lang]}{" "}
          <a href={target} className="underline underline-offset-4">
            {target}
          </a>
        </p>
      </main>
    </>
  );
}
