import { NavLink, Link } from "react-router-dom";
import {
  LayoutDashboard,
  UserCircle2,
  Inbox,
  FileText,
  Coins,
  ShieldCheck,
  LogOut,
  Scale,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

interface NavItem {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
}

const NAV: NavItem[] = [
  { to: "/panel", label: "Pano", icon: LayoutDashboard },
  { to: "/panel/profil", label: "Profilim", icon: UserCircle2 },
  { to: "/panel/talepler", label: "Gelen Talepler", icon: Inbox },
  { to: "/panel/teklifler", label: "Tekliflerim", icon: FileText },
  { to: "/panel/krediler", label: "Krediler", icon: Coins },
  { to: "/panel/dogrulama", label: "Doğrulama", icon: ShieldCheck },
];

export function PanelSidebar() {
  const { signOut } = useAuth();

  return (
    <div className="h-full flex flex-col">
      <Link
        to="/"
        className="flex items-center gap-2.5 px-2 py-1.5"
      >
        <span className="grid place-items-center w-9 h-9 rounded-md bg-primary text-primary-foreground shadow-soft">
          <Scale className="w-5 h-5" strokeWidth={1.75} />
        </span>
        <span className="font-serif text-lg font-semibold tracking-tight">
          Avukat<span className="text-accent">Istanbul</span>
        </span>
      </Link>

      <nav className="mt-8 flex flex-col gap-1">
        {NAV.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/panel"}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
                )
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-border/60">
        <Button
          variant="ghost"
          size="sm"
          onClick={signOut}
          className="w-full justify-start text-muted-foreground hover:text-foreground"
        >
          <LogOut className="w-4 h-4" />
          Çıkış yap
        </Button>
      </div>
    </div>
  );
}

export default PanelSidebar;
