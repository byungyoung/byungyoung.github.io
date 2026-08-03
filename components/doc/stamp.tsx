import type { CSSProperties, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { StampPress } from "@/components/doc/stamp-press";
import { cn } from "@/lib/utils";

const stampVariants = cva(
  "doc-stamp inline-flex w-fit items-center justify-center rounded-sm border-[1.5px] border-solid border-current font-mono font-semibold uppercase whitespace-nowrap tracking-[0.12em]",
  {
    variants: {
      variant: {
        exit: "text-ink",
        approved: "text-ink",
        rejected: "text-stamp",
      },
      size: {
        sm: "px-2 py-[2px] text-[10px] leading-[1.4]",
        md: "px-3 py-1 text-[12px] leading-[1.4]",
      },
    },
    defaultVariants: {
      variant: "approved",
      size: "sm",
    },
  },
);

const STAMP_TEXT = {
  exit: "EXIT",
  approved: "APPROVED",
  rejected: "REJECTED",
} as const;

const STAMP_ARIA = {
  ko: {
    exit: "상태: 종료됨",
    approved: "상태: 승인됨",
    rejected: "상태: 기각됨",
  },
  en: {
    exit: "Status: Exited",
    approved: "Status: Approved",
    rejected: "Status: Rejected",
  },
} as const;

const MIN_ROTATION = 2;
const ROTATION_STEPS = 31;

function hashSeed(value: string): number {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function rotationFor(seed: string): number {
  return -(MIN_ROTATION + (hashSeed(seed) % ROTATION_STEPS) / 10);
}

function seedText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(seedText).join("");
  return "";
}

type StampVariant = NonNullable<VariantProps<typeof stampVariants>["variant"]>;

type StampProps = {
  variant?: StampVariant;
  size?: "sm" | "md";
  lang?: "ko" | "en";
  seed?: string;
  rotate?: number;
  children?: ReactNode;
  className?: string;
};

export function Stamp({
  variant = "approved",
  size = "sm",
  lang = "ko",
  seed,
  rotate,
  children,
  className,
}: StampProps) {
  const label = children ?? STAMP_TEXT[variant];
  const seedSource = seed || seedText(children) || variant;
  const rotation = rotate ?? rotationFor(seedSource);

  const stamp = (
    <span
      role="img"
      aria-label={STAMP_ARIA[lang][variant]}
      data-variant={variant}
      data-size={size}
      className={cn(stampVariants({ variant, size }), className)}
      style={{ "--stamp-rot": `${rotation.toFixed(1)}deg` } as CSSProperties}
    >
      {label}
    </span>
  );

  if (size !== "md") return stamp;

  return <StampPress>{stamp}</StampPress>;
}

export { stampVariants };
export type { StampProps, StampVariant };
