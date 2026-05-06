import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, Scale, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavItem {
  to: string;
  label: string;
}

const NAV: NavItem[] = [
  { to: "/hizmetler", label: "Hizmetler" },
  { to: "/avukat-bul", label: "Avukat Bul" },
  { to: "/avukat-kayit", label: "Avukatım, Kaydolmak İstiyorum" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const goToRequest = () => {
    setMobileOpen(false);
    navigate("/talep-olustur");
  };

  return (
    <header className="sticky top-0 z-40 bg-background/85 backdrop-blur-md border-b border-border/60">
      <div className="container-main">
        <div className="relative flex items-center justify-between h-16 lg:h-20">
          <Link
            to="/"
            className="flex items-center gap-2.5 group"
            onClick={() => setMobileOpen(false)}
          >
            <span className="grid place-items-center w-9 h-9 rounded-md bg-primary text-primary-foreground shadow-soft">
              <Scale className="w-5 h-5" strokeWidth={1.75} />
            </span>
            <span className="font-serif text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
              Avukat<span className="text-accent">Istanbul</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    "text-sm font-medium transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Button variant="cta" size="md" onClick={goToRequest}>
              Ücretsiz Teklif Al
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden p-2 rounded-md hover:bg-secondary transition-colors"
            aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileOpen ? (
          <div className="lg:hidden py-4 border-t border-border/60 animate-fade-in">
            <nav className="flex flex-col gap-1">
              {NAV.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "px-3 py-3 rounded-md text-base font-medium transition-colors",
                      isActive
                        ? "bg-secondary text-foreground"
                        : "text-foreground/85 hover:bg-secondary",
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <Button
                variant="cta"
                size="lg"
                className="mt-3 w-full"
                onClick={goToRequest}
              >
                Ücretsiz Teklif Al
                <ArrowRight className="w-5 h-5" />
              </Button>
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  );
}

export default Header;
