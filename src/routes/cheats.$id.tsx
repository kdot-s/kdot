import { createFileRoute, Link, useRouter, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Check, ExternalLink, Crosshair, ShieldCheck, Zap, Cpu, RefreshCw } from "lucide-react";
import type { Cheat } from "./cheats";

export const Route = createFileRoute("/cheats/$id")({
  component: CheatDetailPage,
  errorComponent: CheatErrorComponent,
  notFoundComponent: CheatNotFound,
  head: ({ params }) => ({
    meta: [
      { title: `Cheat · ${params.id.slice(0, 8)} — Kdots Store` },
      { name: "description", content: "Full breakdown of this Kdots cheat — features, pricing, and how to get set up." },
    ],
  }),
});

function CheatDetailPage() {
  const { id } = Route.useParams();
  const { data: cheat, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*").eq("id", id).maybeSingle();
      if (error) throw error;
      return data as Cheat | null;
    },
  });

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <SiteHeader />

      <section className="mx-auto max-w-6xl px-4 pt-12 pb-20 sm:px-6">
        <Link to="/cheats" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> All cheats
        </Link>

        {isLoading ? (
          <div className="mt-8 grid gap-8 lg:grid-cols-5">
            <div className="aspect-video animate-pulse rounded-2xl border border-border/60 bg-surface/40 lg:col-span-3" />
            <div className="space-y-4 lg:col-span-2">
              <div className="h-10 w-3/4 animate-pulse rounded bg-surface/60" />
              <div className="h-24 animate-pulse rounded bg-surface/60" />
              <div className="h-12 animate-pulse rounded bg-surface/60" />
            </div>
          </div>
        ) : !cheat ? (
          <div className="mt-20 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface/30 py-24 text-center">
            <Crosshair className="mb-4 h-12 w-12 text-muted-foreground" />
            <h2 className="text-xl font-bold">Cheat not found</h2>
            <p className="mt-2 text-sm text-muted-foreground">It may have been pulled or never existed.</p>
            <Button asChild className="mt-6"><Link to="/cheats">Back to arsenal</Link></Button>
          </div>
        ) : (
          <div className="mt-8 grid gap-10 lg:grid-cols-5">
            {/* Left: visual */}
            <div className="lg:col-span-3">
              <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-surface/50 glow-border">
                <div className="relative aspect-video">
                  {cheat.image_url ? (
                    <img src={cheat.image_url} alt={cheat.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center grid-bg">
                      <Crosshair className="h-24 w-24 text-primary/30 float-y" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-transparent to-transparent" />
                </div>
              </div>

              {/* Stats strip */}
              <div className="mt-4 grid grid-cols-4 gap-3">
                {[
                  { icon: Zap, label: "Recoil", val: "0.00°" },
                  { icon: ShieldCheck, label: "Status", val: "UD" },
                  { icon: Cpu, label: "CPU", val: "<1%" },
                  { icon: RefreshCw, label: "Updates", val: "Weekly" },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl border border-border/70 bg-surface/50 p-3 text-center backdrop-blur">
                    <s.icon className="mx-auto h-4 w-4 text-primary" />
                    <div className="mt-1.5 font-mono text-base font-bold">{s.val}</div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: info */}
            <div className="space-y-6 lg:col-span-2">
              <div>
                <Badge className="border-primary/30 bg-primary/10 font-mono text-[10px] uppercase tracking-widest text-primary">
                  {cheat.category}
                </Badge>
                <h1 className="mt-3 text-4xl font-bold leading-tight">{cheat.name}</h1>
                <p className="mt-3 text-muted-foreground">{cheat.description}</p>
              </div>

              <div className="flex items-end justify-between rounded-2xl border border-border/70 bg-surface/60 p-5 backdrop-blur">
                <div>
                  <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Lifetime license</div>
                  <div className="mt-1 font-mono text-4xl font-bold text-gradient">${cheat.price.toFixed(2)}</div>
                </div>
                <Button asChild size="lg" className="glow-border">
                  <a href={cheat.purchase_url || "https://discord.gg/fkRThkmE3s"} target="_blank" rel="noreferrer">
                    Get it now <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                </Button>
              </div>

              {cheat.features.length > 0 && (
                <div className="rounded-2xl border border-border/70 bg-surface/40 p-5 backdrop-blur">
                  <div className="font-mono text-xs uppercase tracking-widest text-primary">What's inside</div>
                  <ul className="mt-3 space-y-2.5">
                    {cheat.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="rounded-2xl border border-border/70 bg-surface/40 p-5 backdrop-blur">
                <div className="font-mono text-xs uppercase tracking-widest text-primary">How it works</div>
                <ol className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li><span className="font-mono text-primary">01.</span> Purchase, get instant license in Discord DM.</li>
                  <li><span className="font-mono text-primary">02.</span> Download the loader, bind to your HWID.</li>
                  <li><span className="font-mono text-primary">03.</span> Launch Siege. Outplay. We handle updates.</li>
                </ol>
              </div>
            </div>
          </div>
        )}
      </section>

      <SiteFooter />
    </div>
  );
}

function CheatNotFound() {
  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <SiteHeader />
      <div className="mx-auto max-w-md px-4 py-32 text-center">
        <h1 className="text-5xl font-bold text-gradient">404</h1>
        <p className="mt-3 text-muted-foreground">That cheat doesn't exist.</p>
        <Button asChild className="mt-6"><Link to="/cheats">Back to arsenal</Link></Button>
      </div>
    </div>
  );
}

function CheatErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  console.error(error);
  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <SiteHeader />
      <div className="mx-auto max-w-md px-4 py-32 text-center">
        <h1 className="text-2xl font-bold">Something went wrong loading this cheat.</h1>
        <div className="mt-6 flex justify-center gap-2">
          <Button onClick={() => { router.invalidate(); reset(); }}>Retry</Button>
          <Button asChild variant="outline"><Link to="/cheats">Back</Link></Button>
        </div>
      </div>
    </div>
  );
}
