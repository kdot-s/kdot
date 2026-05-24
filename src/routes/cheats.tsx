import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Crosshair, ArrowRight, Check } from "lucide-react";

export interface Cheat {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string | null;
  features: string[];
  category: string;
  purchase_url: string | null;
}

export const Route = createFileRoute("/cheats")({
  component: CheatsPage,
  head: () => ({
    meta: [
      { title: "Cheats — Kdots Store" },
      { name: "description", content: "Every Kdots Siege cheat — undetected macros, scripts, and configs. Pick your loadout." },
    ],
  }),
});

function CheatsPage() {
  const { data: cheats, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as Cheat[];
    },
  });

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <SiteHeader />

      <section className="mx-auto max-w-7xl px-4 pt-20 pb-12 sm:px-6">
        <div className="mb-12 max-w-2xl fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs uppercase tracking-widest text-primary">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            Live arsenal
          </div>
          <h1 className="mt-4 text-5xl font-bold sm:text-6xl">
            All <span className="text-gradient">cheats.</span>
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Frame-perfect macros, undetected internals, and weekly-tuned configs. Click any cheat to see the full breakdown.
          </p>
        </div>

        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-96 animate-pulse rounded-2xl border border-border/70 bg-surface/40" />
            ))}
          </div>
        ) : cheats && cheats.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cheats.map((c) => <CheatCard key={c.id} cheat={c} />)}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface/30 py-24 text-center">
            <Crosshair className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="text-lg font-semibold">No cheats deployed yet</h3>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              The admin hasn't loaded any cheats yet. Drop into the Discord — early access lands there first.
            </p>
          </div>
        )}
      </section>

      <SiteFooter />
    </div>
  );
}

function CheatCard({ cheat }: { cheat: Cheat }) {
  return (
    <Link
      to="/cheats/$id"
      params={{ id: cheat.id }}
      className="group relative block"
    >
      <Card className="relative overflow-hidden border-border/70 bg-surface/60 p-0 backdrop-blur transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary/50 group-hover:shadow-[0_0_50px_-10px_oklch(0.72_0.21_240/0.5)]">
        <div className="relative aspect-[16/10] overflow-hidden bg-background">
          {cheat.image_url ? (
            <img src={cheat.image_url} alt={cheat.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
          ) : (
            <div className="flex h-full w-full items-center justify-center grid-bg">
              <Crosshair className="h-14 w-14 text-primary/40" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent" />
          <Badge className="absolute top-3 left-3 border-primary/30 bg-background/80 font-mono text-[10px] uppercase tracking-widest backdrop-blur">
            {cheat.category}
          </Badge>
          <div className="absolute bottom-3 right-3 font-mono text-2xl font-bold text-gradient">
            ${cheat.price.toFixed(2)}
          </div>
        </div>
        <div className="space-y-3 p-5">
          <h3 className="text-xl font-bold tracking-tight">{cheat.name}</h3>
          <p className="line-clamp-2 text-sm text-muted-foreground">{cheat.description}</p>
          {cheat.features.length > 0 && (
            <ul className="space-y-1.5">
              {cheat.features.slice(0, 3).map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-xs">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                  <span className="text-muted-foreground">{f}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="flex items-center justify-between border-t border-border/60 pt-3 text-sm">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">View details</span>
            <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Card>
    </Link>
  );
}
