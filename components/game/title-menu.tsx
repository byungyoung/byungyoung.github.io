"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";

import type { MenuItemId } from "@/content/game";
import { gotoStage, prefersReducedMotion, useRunProgress } from "@/lib/run-progress";

export interface TitleMenuItem {
  id: MenuItemId;
  pixel: string;
  label: string;
  href: string;
}

type TitleMenuProps = {
  items: TitleMenuItem[];
  menuLabel: string;
  firstStageId: string;
  keyHint: string;
  touchHint: string;
};

const IN_VIEW_RATIO = 0.5;

function scrollToHash(hash: string): void {
  const target = document.getElementById(hash.replace(/^.*#/, ""));
  target?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
}

/**
 * Start menu with a moving cursor. Arrow keys work once focus is inside the
 * menu, and also from an unfocused page while the title screen is on screen,
 * the way a console menu does. Every item is a real link, so it still works
 * without JavaScript.
 */
export function TitleMenu({ items, menuLabel, firstStageId, keyHint, touchHint }: TitleMenuProps) {
  const router = useRouter();
  const { lastStage } = useRunProgress();
  const listRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const visible = items.filter((item) => item.id !== "continue" || (mounted && lastStage));

  const activate = (item: TitleMenuItem, event?: MouseEvent) => {
    if (item.id !== "continue" && item.id !== "start") return;
    event?.preventDefault();
    gotoStage(item.id === "continue" && lastStage ? lastStage : firstStageId);
    scrollToHash(item.href);
  };

  const focusItem = (index: number) => {
    const count = visible.length;
    const next = (index + count) % count;
    setActive(next);
    listRef.current?.querySelectorAll<HTMLAnchorElement>("a")[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      focusItem(active + 1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      focusItem(active - 1);
    }
  };

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    let inView = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.intersectionRatio >= IN_VIEW_RATIO;
      },
      { threshold: [0, IN_VIEW_RATIO, 1] },
    );
    observer.observe(list);

    const onGlobalKey = (event: globalThis.KeyboardEvent) => {
      const idle = document.activeElement === document.body || document.activeElement === null;
      if (!idle || !inView || event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
      event.preventDefault();
      list.querySelectorAll<HTMLAnchorElement>("a")[0]?.focus();
      setActive(0);
    };

    window.addEventListener("keydown", onGlobalKey);
    return () => {
      observer.disconnect();
      window.removeEventListener("keydown", onGlobalKey);
    };
  }, []);

  return (
    <nav aria-label={menuLabel} className="g-menu">
      <ul ref={listRef} onKeyDown={onKeyDown} className="g-menu__list">
        {visible.map((item, index) => {
          const isRoute = item.id === "pdf" || item.id === "plain";
          return (
            <li key={item.id}>
              <a
                href={item.href}
                data-active={index === active || undefined}
                onFocus={() => setActive(index)}
                onMouseEnter={() => setActive(index)}
                onClick={(event) => {
                  if (isRoute) {
                    event.preventDefault();
                    router.push(item.href);
                    return;
                  }
                  activate(item, event);
                }}
                className="g-menu__item"
              >
                <span aria-hidden className="g-menu__cursor">
                  ▶
                </span>
                <span aria-hidden className="g-pixel g-menu__pixel">
                  {item.pixel}
                </span>
                <span className="g-menu__label">{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
      <p className="g-menu__hint">
        <span className="g-hint--keys">{keyHint}</span>
        <span className="g-hint--touch">{touchHint}</span>
      </p>
    </nav>
  );
}
