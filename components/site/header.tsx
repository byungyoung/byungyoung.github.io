"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { LangToggle } from "@/components/site/lang-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { ui } from "@/content/ui";
import type { Lang } from "@/content/types";
import { localizePath } from "@/lib/paths";
import { cn } from "@/lib/utils";

/** Section is considered active once it crosses the middle band of the viewport. */
const ACTIVE_ROOT_MARGIN = "-45% 0px -50% 0px";

export type HeaderNavItem = {
  id: string;
  href: string;
  label: string;
};

type SiteHeaderProps = {
  lang: Lang;
  homeHref: string;
  items?: readonly HeaderNavItem[];
  action?: { href: string; label: string };
};

function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join(",");

  useEffect(() => {
    const sections = key
      .split(",")
      .filter(Boolean)
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: ACTIVE_ROOT_MARGIN, threshold: 0 },
    );

    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, [key]);

  return active;
}

export function SiteHeader({
  lang,
  homeHref,
  items = [],
  action,
}: SiteHeaderProps) {
  const anchors = items.filter((item) => item.href.startsWith("#"));
  const active = useActiveSection(anchors.map((item) => item.id));

  return (
    <header
      data-print-hide
      className="sticky top-0 z-40 border-b border-hairline bg-background/88 backdrop-blur-md print:hidden"
    >
      <div className="mx-auto flex h-14 max-w-[var(--container-doc)] items-center gap-4 px-6 lg:px-10">
        <Link
          href={localizePath(homeHref, lang)}
          className="font-mono text-h3 tracking-tight text-ink transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          {ui.header.logo}
        </Link>

        {items.length > 0 ? (
          <nav
            aria-label={ui.header.navLabel[lang]}
            className="ms-4 hidden items-center gap-5 md:flex"
          >
            {items.map((item) => (
              <a
                key={item.id}
                href={localizePath(item.href, lang)}
                aria-current={active === item.id ? "true" : undefined}
                className={cn(
                  "font-mono text-label uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
                  active === item.id
                    ? "text-ink"
                    : "text-subtle hover:text-foreground",
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>
        ) : null}

        <div className="ms-auto flex items-center gap-2">
          {action ? (
            <Link
              href={localizePath(action.href, lang)}
              className="hidden font-mono text-label uppercase text-subtle underline decoration-transparent underline-offset-4 transition-colors hover:text-foreground hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:inline"
            >
              {action.label}
            </Link>
          ) : null}

          <LangToggle lang={lang} />

          <ThemeToggle lang={lang} />
        </div>
      </div>
    </header>
  );
}
