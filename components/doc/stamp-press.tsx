"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const THRESHOLD = 0.6;

export function StampPress({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.disconnect();
          setPressed(true);
        }
      },
      { threshold: THRESHOLD },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      className="doc-stamp-press"
      data-pressed={pressed ? "true" : undefined}
    >
      {children}
    </span>
  );
}
