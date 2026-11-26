"use client";

import { useRunProgress } from "@/lib/run-progress";

type ProgressMeterProps = {
  stageIds: readonly string[];
  label: string;
};

/** "Stages explored" pips in the HUD. Counts only stages that exist on the map. */
export function ProgressMeter({ stageIds, label }: ProgressMeterProps) {
  const { stages } = useRunProgress();
  const explored = stageIds.filter((id) => stages.includes(id)).length;

  return (
    <div className="g-meter" title={label}>
      <span className="sr-only">
        {label}: {explored} / {stageIds.length}
      </span>
      <span aria-hidden className="g-meter__pips">
        {stageIds.map((id) => (
          <span key={id} className="g-meter__pip" data-on={stages.includes(id) || undefined} />
        ))}
      </span>
      <span aria-hidden className="g-pixel g-meter__count">
        {explored}/{stageIds.length}
      </span>
    </div>
  );
}
