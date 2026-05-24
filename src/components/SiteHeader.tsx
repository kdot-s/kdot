import { Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Crosshair, LogOut, Shield } from "lucide-react";

const tabs: { to: "/" | "/cheats" | "/features" | "/community"; label: string; exact?: boolean }[] = [
  { to: "/", label: "Home", exact: true },
  { to: "/cheats", label: "Cheats" },
  { to: "/features", label: "Features" },
  { to: "/community", label: "Community" },
];

export function SiteHeader() {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/40 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5 font-display text-xl font-bold tracking-wider">
          <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 ring-1 ring-primary/40">
            <Crosshair className="h-4 w-4 text-primary" />
            <span className="absolute inset-0 ring-pulse rounded-lg" />
          </span>
          <span>K<span className="text-gradient">DOTS</span></span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-border/70 bg-surface/50 p-1 backdrop-blur md:flex">
          {tabs.map((t) => (
            <Link
              key={t.to}
              to={t.to}
              activeOptions={{ exact: t.exact ?? false }}
              activeProps={{ className: "bg-primary/20 text-foreground shadow-[0_0_20px_-5px_oklch(0.72_0.21_240/0.5)]" }}
              inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
              className="rounded-full px-4 py-1.5 text-sm font-medium transition-all"
            >
              {t.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {isAdmin && (
            <Button asChild size="sm" variant="secondary">
              <Link to="/admin"><Shield className="mr-1 h-4 w-4" />Admin</Link>
            </Button>
          )}
          {user ? (
            <Button size="sm" variant="ghost" onClick={async () => { await supabase.auth.signOut(); navigate({ to: "/" }); }}>
              <LogOut className="mr-1 h-4 w-4" />Sign out
            </Button>
          ) : (
            <Button asChild size="sm" className="glow-border">
              <Link to="/login">Sign in</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
