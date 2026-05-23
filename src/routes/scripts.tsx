import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { ProductCard, type Product } from "@/components/ProductCard";
import { Crosshair } from "lucide-react";

export const Route = createFileRoute("/scripts")({
  component: ScriptsPage,
  head: () => ({
    meta: [
      { title: "Scripts — Kdots Store" },
      { name: "description", content: "All Kdots siege scripts and macros — pick your loadout." },
    ],
  }),
});

function ScriptsPage() {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as Product[];
    },
  });

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <SiteHeader />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-10 fade-up">
          <div className="font-mono text-xs uppercase tracking-widest text-primary">Arsenal</div>
          <h1 className="mt-2 text-4xl font-bold sm:text-5xl">All scripts</h1>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Every script we ship. Pick one, drop into the Discord, and we'll get you set up.
          </p>
        </div>

        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-96 animate-pulse rounded-xl border border-border/70 bg-surface/60" />
            ))}
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface/40 py-20 text-center">
            <Crosshair className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="text-lg font-semibold">No scripts deployed yet</h3>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              The admin hasn't added any products yet. Check back soon.
            </p>
          </div>
        )}
      </section>

      <SiteFooter />
    </div>
  );
}
