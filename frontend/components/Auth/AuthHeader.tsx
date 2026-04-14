import { GraduationCap } from "lucide-react";

interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

export default function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  return (
    <div className="flex flex-col items-center mb-8">
      {/* Logo */}
      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary mb-4">
        <GraduationCap className="w-6 h-6 text-primary-foreground" />
      </div>

      {/* App name */}
      <div className="text-center mb-1">
        <span className="text-xl font-medium text-foreground tracking-tight">
          StudyFlow
        </span>
      </div>

      {/* Page title & subtitle */}
      <h1 className="text-2xl font-medium text-foreground mt-4 mb-1">{title}</h1>
      <p className="text-sm text-muted-foreground text-center">{subtitle}</p>
    </div>
  );
}