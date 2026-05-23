import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/SiteHeader";
import { ProductCard, type Product } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Crosshair, Zap, ShieldCheck, Headphones } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Product[];
    },
  });

  return (
    <div className="min-h-screen">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
              Live ops · Updated daily
            </div>
            <h1 className="text-5xl font-bold leading-tight tracking-tight sm:text-7xl">
              Dominate every <span className="text-gradient">round.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              Premium Rainbow Six Siege scripts and macros. Built by operators, for operators.
              Undetected, lightning-fast, and ranked-ready.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg">
                <a href="#products">Browse scripts <ArrowRight className="ml-1 h-4 w-4" /></a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="https://discord.gg/fkRThkmE3s" target="_blank" rel="noreferrer">Join Discord</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:grid-cols-3 sm:px-6">
          {[
            { icon: Zap, t: "Zero recoil", d: "Frame-perfect macros for every weapon in the meta." },
            { icon: ShieldCheck, t: "Undetected", d: "Hardware-level routing. No bans, no flags." },
            { icon: Headphones, t: "24/7 support", d: "Direct line to our team via the Discord." },
          ].map((f) => (
            <div key={f.t} className="rounded-lg border border-border bg-surface p-6">
              <f.icon className="mb-3 h-7 w-7 text-primary" />
              <h3 className="text-lg font-semibold">{f.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-primary">Arsenal</div>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">All scripts</h2>
          </div>
        </div>

        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-96 animate-pulse rounded-lg border border-border bg-surface" />
            ))}
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-surface/50 py-20 text-center">
            <Crosshair className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="text-lg font-semibold">No scripts deployed yet</h3>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              The admin hasn't added any products yet. Check back soon or join the Discord for updates.
            </p>
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
          <div className="flex items-center gap-2 font-display font-bold tracking-wider">
            <Crosshair className="h-5 w-5 text-primary" />
            KDOTS STORE
          </div>
          <div className="font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} Kdots. For educational use.
          </div>
          <a href="https://discord.gg/fkRThkmE3s" target="_blank" rel="noreferrer" className="text-sm text-muted-foreground hover:text-foreground">
            discord.gg/fkRThkmE3s
          </a>
        </div>
      </footer>
    </div>
  );
}
