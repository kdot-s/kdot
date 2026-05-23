import { Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Crosshair, LogOut, Shield } from "lucide-react";

export function SiteHeader() {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold tracking-wider">
          <Crosshair className="h-6 w-6 text-primary" />
          <span>K<span className="text-gradient">DOTS</span> STORE</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <a href="/#products" className="text-muted-foreground hover:text-foreground">Scripts</a>
          <a href="/#features" className="text-muted-foreground hover:text-foreground">Features</a>
          <a href="https://discord.gg/fkRThkmE3s" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground">Discord</a>
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
            <Button asChild size="sm">
              <Link to="/login">Sign in</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
