interface CourseProgressItemProps {
  name: string;
  color: string;
  progress: number;
}

export default function CourseProgressItem({
  name,
  color,
  progress,
}: CourseProgressItemProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className={`w-2.5 h-2.5 rounded-full shrink-0`} style={{ backgroundColor: color }} />
          <span className="text-sm text-foreground truncate">{name}</span>
        </div>
        <span className="text-sm font-medium text-foreground shrink-0">
          {progress}%
        </span>
      </div>
      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-foreground rounded-full transition-all duration-700"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}