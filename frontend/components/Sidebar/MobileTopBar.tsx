import { GraduationCap, Menu, Moon, Sun, X } from "lucide-react";

interface MobileTopBarProps {
  menuOpen: boolean;
  darkMode: boolean;
  onMenuToggle: () => void;
  onDarkToggle: () => void;
}

export default function MobileTopBar({
  menuOpen,
  darkMode,
  onMenuToggle,
  onDarkToggle,
}: MobileTopBarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center px-4 gap-3 bg-background border-b border-border md:hidden">
      <button
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        onClick={onMenuToggle}
        className="p-2 rounded-md hover:bg-muted transition-colors"
      >
        {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Brand */}
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center shrink-0">
          <GraduationCap className="w-4 h-4 text-primary-foreground" />
        </div>
        <span className="text-sm font-semibold text-foreground">StudyFlow</span>
      </div>

      <button
        aria-label="Toggle dark mode"
        onClick={onDarkToggle}
        className="ml-auto p-2 rounded-md hover:bg-muted transition-colors"
      >
        {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>
    </header>
  );
}