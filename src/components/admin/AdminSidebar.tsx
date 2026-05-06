import { NavLink, Link } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  Scale,
  Users,
  LogOut,
  ShieldCheck,
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
  { to: "/admin", label: "Pano", icon: LayoutDashboard },
  { to: "/admin/basvurular", label: "Başvurular", icon: ClipboardList },
  { to: "/admin/avukatlar", label: "Avukatlar", icon: Users },
];

export function AdminSidebar() {
  const { signOut } = useAuth();

  return (
    <div className="h-full flex flex-col">
      <Link to="/" className="flex items-center gap-2.5 px-2 py-1.5">
        <span className="grid place-items-center w-9 h-9 rounded-md bg-primary text-primary-foreground shadow-soft">
          <Scale className="w-5 h-5" strokeWidth={1.75} />
        </span>
        <span className="font-serif text-lg font-semibold tracking-tight">
          Avukat<span className="text-accent">Istanbul</span>
        </span>
      </Link>

      <p className="mt-2 px-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
        <ShieldCheck className="w-3.5 h-3.5" />
        Yönetim
      </p>

      <nav className="mt-7 flex flex-col gap-1">
        {NAV.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/admin"}
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

export default AdminSidebar;
