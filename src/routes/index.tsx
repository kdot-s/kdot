import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Button } from "@/components/ui/button";
import { ArrowRight, Crosshair, Zap, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Kdots Store — Premium Siege Scripts" },
      { name: "description", content: "Premium Rainbow Six Siege scripts and macros. Undetected, instant, ranked-ready." },
    ],
  }),
});

function Index() {
  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <SiteHeader />

      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 py-28 sm:px-6 sm:py-36">
          <div className="mx-auto max-w-3xl text-center fade-up">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs uppercase tracking-widest text-primary">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              v2.4 · Y9S4 ready
            </div>
            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl">
              Outplay them <br />
              <span className="text-gradient">before they react.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              Kdots builds the cleanest macros and scripts in Rainbow Six Siege.
              Frame-perfect, undetected, and trusted by thousands of operators.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="glow-border">
                <Link to="/scripts">Browse scripts <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/community">Join the community</Link>
              </Button>
            </div>

            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-3 gap-6 border-t border-border/60 pt-8 text-left">
              {[
                { k: "12k+", v: "active users" },
                { k: "99.8%", v: "uptime" },
                { k: "24/7", v: "support" },
              ].map((s) => (
                <div key={s.v}>
                  <div className="font-mono text-2xl font-bold text-foreground">{s.k}</div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick highlight strip */}
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: Zap, t: "Zero recoil", d: "Frame-perfect across the meta." },
            { icon: ShieldCheck, t: "Undetected", d: "Hardware-level safety." },
            { icon: Crosshair, t: "Operator tuned", d: "Built by ranked grinders." },
          ].map((f) => (
            <div key={f.t} className="glow-hover rounded-xl border border-border/70 bg-surface/60 p-5 backdrop-blur">
              <f.icon className="mb-3 h-6 w-6 text-primary" />
              <h3 className="font-semibold">{f.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
