import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Zap, ShieldCheck, Headphones, Cpu, RefreshCw, Lock } from "lucide-react";

export const Route = createFileRoute("/features")({
  component: FeaturesPage,
  head: () => ({
    meta: [
      { title: "Features — Kdots Store" },
      { name: "description", content: "What makes Kdots scripts the cleanest in Siege." },
    ],
  }),
});

const features = [
  { icon: Zap, t: "Frame-perfect recoil", d: "Per-weapon macros tuned to in-game frame timing. No spray drift, no overshoot." },
  { icon: ShieldCheck, t: "Undetected by design", d: "Hardware-level input routing. Indistinguishable from a real mouse to anti-cheat." },
  { icon: Cpu, t: "Low CPU footprint", d: "Runs under 1% CPU. No frame drops, no input lag, no system stutter." },
  { icon: RefreshCw, t: "Weekly updates", d: "New patch? We ship the same day. Lifetime updates included with every script." },
  { icon: Lock, t: "HWID locked", d: "Your license, your machine. Nobody else can run it. Resets available on request." },
  { icon: Headphones, t: "24/7 support", d: "Real humans in the Discord. Setup help, troubleshooting, and config tuning." },
];

function FeaturesPage() {
  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <SiteHeader />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-12 max-w-2xl fade-up">
          <div className="font-mono text-xs uppercase tracking-widest text-primary">Why Kdots</div>
          <h1 className="mt-2 text-4xl font-bold sm:text-5xl">Built different.</h1>
          <p className="mt-3 text-muted-foreground">
            Most stores resell the same leaked scripts. We build ours from scratch and tune
            them every patch. Here's what you actually get.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <div
              key={f.t}
              className="glow-hover relative overflow-hidden rounded-xl border border-border/70 bg-surface/60 p-6 backdrop-blur"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold">{f.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
