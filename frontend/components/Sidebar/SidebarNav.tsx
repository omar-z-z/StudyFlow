import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/basicComponents/button";
import navItems from "@/lib/sidebarNavItems";

export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
      {navItems.map(({ label, icon: Icon, href }) => {
        const isActive =
          href === "/" ? pathname === href : pathname.startsWith(href);

        return (
          <Link key={label} href={href}>
            <Button
              size="default"
              variant={isActive ? "default" : "secondary"}
              className={`w-full justify-start gap-3 text-base rounded-lg my-1 ${
                isActive ? "shadow-sm" : "text-muted-foreground"
              }`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {label}
            </Button>
          </Link>
        );
      })}
    </nav>
  );
}