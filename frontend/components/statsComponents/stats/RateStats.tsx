interface RateStatsProps {
  rate: number;
  rateSub?: string;
}

export default function RateStats({ rate, rateSub }: RateStatsProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-baseline gap-0.5">
        <span className="text-3xl font-semibold text-foreground md:text-4xl">
          {rate}
        </span>
        <span className="text-muted-foreground text-base">%</span>
      </div>
      {rateSub && (
        <span className="text-xs text-muted-foreground">{rateSub}</span>
      )}
    </div>
  );
}