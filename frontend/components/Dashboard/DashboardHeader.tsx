function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

interface DashboardHeaderProps {
  name: string;
}

export default function DashboardHeader({ name }: DashboardHeaderProps) {
  return (
    <div className="mb-6">
      <h1 className="text-xl font-semibold text-foreground sm:text-2xl">
        {getGreeting()}, {name}
      </h1>
      <p className="text-sm text-muted-foreground mt-1">
        Let&apos;s make today productive!
      </p>
    </div>
  );
}