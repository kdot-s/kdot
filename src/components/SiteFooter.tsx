import { Crosshair } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border/70">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
        <div className="flex items-center gap-2 font-display font-bold tracking-wider">
          <Crosshair className="h-5 w-5 text-primary" />
          KDOTS STORE
        </div>
        <div className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} Kdots. All rights reserved.
        </div>
        <a href="https://discord.gg/fkRThkmE3s" target="_blank" rel="noreferrer" className="text-sm text-muted-foreground hover:text-primary">
          discord.gg/fkRThkmE3s
        </a>
      </div>
    </footer>
  );
}
