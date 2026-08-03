import { Stamp } from "@/components/doc/stamp";
import { cn } from "@/lib/utils";

const COPY = {
  ko: {
    optionSr: "기각된 선택지: ",
    reasonSr: "기각 사유: ",
    reasonPrefix: "사유: ",
  },
  en: {
    optionSr: "Rejected option: ",
    reasonSr: "Rejection reason: ",
    reasonPrefix: "Reason: ",
  },
} as const;

const CHIP_ROTATION = -2;

type RejectedOptionProps = {
  option: string;
  reason: string;
  lang?: "ko" | "en";
  className?: string;
};

export function RejectedOption({
  option,
  reason,
  lang = "ko",
  className,
}: RejectedOptionProps) {
  const copy = COPY[lang];

  return (
    <div className={cn("border-t border-hairline pt-5 pb-6", className)}>
      <Stamp
        variant="rejected"
        size="sm"
        lang={lang}
        rotate={CHIP_ROTATION}
        className="mb-3"
      />
      <p className="text-body text-subtle">
        <del className="line-through decoration-stamp decoration-[length:1.5px]">
          <span className="sr-only">{copy.optionSr}</span>
          {option}
        </del>
      </p>
      <p className="mt-1 text-body-sm text-muted-foreground">
        <span className="sr-only">{copy.reasonSr}</span>
        <span aria-hidden className="font-mono text-subtle">
          {copy.reasonPrefix}
        </span>
        {reason}
      </p>
    </div>
  );
}

export type { RejectedOptionProps };
