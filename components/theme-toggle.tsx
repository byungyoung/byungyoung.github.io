"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

const ICON_PROPS = {
  "aria-hidden": true,
  className: "size-4",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

function SunIcon() {
  return (
    <svg {...ICON_PROPS}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

const COPY = {
  ko: {
    idle: "테마 전환",
    toLight: "라이트 모드로 전환",
    toDark: "다크 모드로 전환",
  },
  en: {
    idle: "Toggle theme",
    toLight: "Switch to light mode",
    toDark: "Switch to dark mode",
  },
} as const;

type ThemeToggleProps = {
  lang?: "ko" | "en";
  className?: string;
};

export function ThemeToggle({ lang = "ko", className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const copy = COPY[lang];
  const isDark = mounted && resolvedTheme === "dark";
  const label = mounted ? (isDark ? copy.toLight : copy.toDark) : copy.idle;

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-md border border-border text-ink transition-colors hover:bg-raised focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        className,
      )}
    >
      {mounted ? (
        isDark ? (
          <SunIcon />
        ) : (
          <MoonIcon />
        )
      ) : (
        <span aria-hidden className="size-4" />
      )}
    </button>
  );
}
