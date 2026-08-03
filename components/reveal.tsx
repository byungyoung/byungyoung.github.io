"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  type ComponentProps,
} from "react";

const DURATION_MS = 350;
const STAGGER_STEP_MS = 60;
const MAX_STAGGER_INDEX = 2;
const OFFSET_PX = 8;
const THRESHOLD = 0.2;

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

type RevealProps = ComponentProps<"div"> & {
  stagger?: number;
};

export function Reveal({ stagger = 0, children, ...props }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const box = node.getBoundingClientRect();
    const alreadyPainted = box.top < window.innerHeight && box.bottom > 0;
    if (alreadyPainted) return;

    const step = Math.min(Math.max(Math.trunc(stagger), 0), MAX_STAGGER_INDEX);
    const delay = step * STAGGER_STEP_MS;

    node.style.opacity = "0";
    node.style.transform = `translateY(${OFFSET_PX}px)`;
    node.style.willChange = "opacity, transform";

    let timer = 0;
    const reveal = () => {
      node.style.transition = `opacity ${DURATION_MS}ms ease-out ${delay}ms, transform ${DURATION_MS}ms ease-out ${delay}ms`;
      node.style.opacity = "1";
      node.style.transform = "none";
      timer = window.setTimeout(() => {
        node.style.willChange = "";
      }, DURATION_MS + delay);
    };

    const threshold =
      node.offsetHeight > window.innerHeight * 0.9 ? 0 : THRESHOLD;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.disconnect();
          reveal();
        }
      },
      { threshold },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, [stagger]);

  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  );
}
