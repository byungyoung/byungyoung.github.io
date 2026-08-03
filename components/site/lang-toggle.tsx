"use client";

import { ui } from "@/content/ui";
import type { Lang } from "@/content/types";
import { pathForLang } from "@/lib/paths";

/**
 * Plain concatenation, not `cn()` — tailwind-merge reads the custom `text-label`
 * size token as a text utility and drops it against `text-ink`.
 */
const BUTTON_CLASS =
  "inline-flex h-9 items-center rounded-md border border-border px-2.5 font-mono text-label uppercase text-ink transition-colors hover:bg-raised focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

type LangToggleProps = {
  lang: Lang;
  className?: string;
};

/**
 * Switches surfaces and records the choice. The stored value is what the
 * pre-paint detection script reads on the next visit, so an explicit switch
 * always outranks navigator.language.
 */
export function LangToggle({ lang, className }: LangToggleProps) {
  const target: Lang = lang === "ko" ? "en" : "ko";

  const handleClick = () => {
    try {
      window.localStorage.setItem("lang", target);
    } catch {
      // Private mode or blocked storage — the navigation below still works.
    }

    const { pathname, search, hash } = window.location;
    window.location.assign(pathForLang(pathname, target) + search + hash);
  };

  return (
    <button
      type="button"
      data-lang-toggle
      lang={target}
      aria-label={ui.header.langToggleAria[lang]}
      onClick={handleClick}
      className={className ? `${BUTTON_CLASS} ${className}` : BUTTON_CLASS}
    >
      {ui.header.langToggle[lang]}
    </button>
  );
}
