"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

import { cn } from "@/lib/utils";

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
          <Sun aria-hidden className="size-4" />
        ) : (
          <Moon aria-hidden className="size-4" />
        )
      ) : (
        <span aria-hidden className="size-4" />
      )}
    </button>
  );
}
