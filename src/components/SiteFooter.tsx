import { Link } from "@tanstack/react-router";
import { Crosshair, MessageCircle } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="relative mt-20 border-t border-border/60 bg-surface/30 backdrop-blur">
      <div className="hr-glow" />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-4 sm:px-6">
        <div className="sm:col-span-2">
          <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold tracking-wider">
            <Crosshair className="h-5 w-5 text-primary" />
            K<span className="text-gradient">DOTS</span> STORE
          </Link>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Premium Rainbow Six Siege cheats. Frame-perfect macros, undetected internals,
            tuned every patch by ranked grinders.
          </p>
          <a
            href="https://discord.gg/fkRThkmE3s"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary transition hover:bg-primary/20"
          >
            <MessageCircle className="h-4 w-4" /> discord.gg/fkRThkmE3s
          </a>
        </div>
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Store</div>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/cheats" className="text-foreground/80 hover:text-primary">All cheats</Link></li>
            <li><Link to="/features" className="text-foreground/80 hover:text-primary">Features</Link></li>
            <li><Link to="/community" className="text-foreground/80 hover:text-primary">Community</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Account</div>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/login" className="text-foreground/80 hover:text-primary">Sign in</Link></li>
            <li><a href="https://discord.gg/fkRThkmE3s" target="_blank" rel="noreferrer" className="text-foreground/80 hover:text-primary">Support</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 sm:flex-row sm:px-6">
          <div className="font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} Kdots Store · All rights reserved.
          </div>
          <div className="font-mono text-xs text-muted-foreground">
            <span className="text-emerald-400">●</span> All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}
