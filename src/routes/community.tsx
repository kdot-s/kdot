import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Button } from "@/components/ui/button";
import { MessageCircle, Users, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/community")({
  component: CommunityPage,
  head: () => ({
    meta: [
      { title: "Community — Kdots Store" },
      { name: "description", content: "Join the Kdots Discord — support, updates, and the squad." },
    ],
  }),
});

function CommunityPage() {
  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <SiteHeader />

      <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <div className="fade-up">
          <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary glow-border">
            <MessageCircle className="h-8 w-8" />
          </div>
          <div className="font-mono text-xs uppercase tracking-widest text-primary">Community</div>
          <h1 className="mt-2 text-4xl font-bold sm:text-5xl">Plug into the squad.</h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            The Kdots Discord is where everything happens — purchases, support, patch notes,
            beta drops, and ranked lobbies with the team.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="glow-border">
              <a href="https://discord.gg/fkRThkmE3s" target="_blank" rel="noreferrer">
                Join Discord <ArrowUpRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
          </div>

          <div className="mx-auto mt-12 grid max-w-xl grid-cols-3 gap-6 rounded-xl border border-border/70 bg-surface/60 p-6 backdrop-blur">
            <div>
              <Users className="mx-auto mb-2 h-5 w-5 text-primary" />
              <div className="font-mono text-2xl font-bold">12k+</div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">members</div>
            </div>
            <div>
              <MessageCircle className="mx-auto mb-2 h-5 w-5 text-primary" />
              <div className="font-mono text-2xl font-bold">{"<5m"}</div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">avg reply</div>
            </div>
            <div>
              <ArrowUpRight className="mx-auto mb-2 h-5 w-5 text-primary" />
              <div className="font-mono text-2xl font-bold">24/7</div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">staffed</div>
            </div>
          </div>

          <div className="mt-8 font-mono text-sm text-muted-foreground">
            discord.gg/<span className="text-foreground">fkRThkmE3s</span>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
