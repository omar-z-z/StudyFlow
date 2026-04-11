import { Clock } from "lucide-react";

interface TimeStatsProps {
  hours: number;
  minutes: number;
}

export default function TimeStats({ hours, minutes }: TimeStatsProps) {
  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Clock className="w-4 h-4 text-muted-foreground shrink-0 md:w-5 md:h-5" />
      <div className="flex items-baseline gap-1 flex-wrap">
        <span className="text-3xl font-semibold text-foreground md:text-4xl">
          {hours}
        </span>
        <span className="text-muted-foreground text-xs md:text-sm">hours</span>
        <span className="text-3xl font-semibold text-foreground ml-1 md:text-4xl">
          {minutes}
        </span>
        <span className="text-muted-foreground text-xs md:text-sm">min</span>
      </div>
    </div>
  );
}