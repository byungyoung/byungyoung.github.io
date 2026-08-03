type MetricWithCaveatProps = {
  value: string;
  unit?: string;
  label: string;
  caveat?: string;
  comparison?: string;
  className?: string;
};

export function MetricWithCaveat({
  value,
  unit,
  label,
  caveat,
  comparison,
  className,
}: MetricWithCaveatProps) {
  return (
    <div className={className}>
      <p className="font-mono text-metric tabular-nums text-foreground">
        {value}
        {unit ? <span className="text-h3">{unit}</span> : null}
        {caveat ? (
          <sup aria-hidden className="doc-metric__mark">
            ※
          </sup>
        ) : null}
      </p>
      <span aria-hidden className="my-3 block h-px w-6 bg-strong" />
      <p className="text-caption text-muted-foreground">{label}</p>
      {caveat ? (
        <p className="mt-1 text-caption text-muted-foreground">{caveat}</p>
      ) : null}
      {comparison ? (
        <p className="mt-1 text-caption text-muted-foreground">{comparison}</p>
      ) : null}
    </div>
  );
}

export type { MetricWithCaveatProps };
