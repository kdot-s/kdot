import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, Crosshair, Zap, ShieldCheck, Cpu, RefreshCw, Lock, Headphones,
  Star, MessageCircle, ChevronRight, Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Kdots Store — Premium Siege Cheats" },
      { name: "description", content: "Premium Rainbow Six Siege cheats, macros, and scripts. Undetected, frame-perfect, ranked-ready." },
    ],
  }),
});

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <AnimatedBackground />
      <SiteHeader />

      {/* ===== HERO ===== */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 pt-24 pb-20 sm:px-6 sm:pt-32 sm:pb-28">
          <div className="mx-auto max-w-4xl text-center fade-up">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-primary backdrop-blur">
              <Sparkles className="h-3 w-3" />
              v2.4 · Y9S4 ready · Undetected
            </div>
            <h1 className="text-6xl font-bold leading-[0.95] tracking-tight sm:text-8xl">
              <span className="text-gradient-soft">Outplay them</span>
              <br />
              <span className="text-gradient">before they react.</span>
            </h1>
            <p className="mx-auto mt-7 max-w-xl text-lg text-muted-foreground">
              Kdots builds the cleanest cheats in Rainbow Six Siege. Frame-perfect,
              undetected, and trusted by thousands of operators worldwide.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="h-12 px-7 text-base glow-border">
                <Link to="/cheats">Browse cheats <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 px-7 text-base">
                <a href="https://discord.gg/fkRThkmE3s" target="_blank" rel="noreferrer">
                  <MessageCircle className="mr-1 h-4 w-4" /> Join Discord
                </a>
              </Button>
            </div>

            {/* Trust strip */}
            <div className="mx-auto mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs uppercase tracking-widest text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
                  ))}
                </div>
                <span>4.9 / 5 · 2,400 reviews</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                Live & undetected
              </div>
              <div>12,400+ operators</div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/70 bg-border/70 sm:grid-cols-4">
            {[
              { k: "12k+", v: "Active users" },
              { k: "99.8%", v: "Uptime" },
              { k: "<5m", v: "Support reply" },
              { k: "24/7", v: "Always on" },
            ].map((s) => (
              <div key={s.v} className="bg-surface/70 p-6 text-center backdrop-blur">
                <div className="font-mono text-3xl font-bold text-gradient">{s.k}</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES GRID ===== */}
      <section id="features" className="relative">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
          <div className="mb-14 text-center fade-up">
            <div className="font-mono text-xs uppercase tracking-widest text-primary">Why Kdots</div>
            <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
              Built different. <span className="text-gradient">Tuned every patch.</span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Most stores resell the same leaked junk. We build ours from scratch and tune them every patch.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              { icon: Zap, t: "Frame-perfect recoil", d: "Per-weapon macros tuned to in-game frame timing. No spray drift." },
              { icon: ShieldCheck, t: "Undetected by design", d: "Hardware-level input routing. Indistinguishable from a real mouse." },
              { icon: Cpu, t: "Low CPU footprint", d: "Runs under 1% CPU. No frame drops, no input lag, no system stutter." },
              { icon: RefreshCw, t: "Weekly updates", d: "New patch? We ship the same day. Lifetime updates with every cheat." },
              { icon: Lock, t: "HWID locked", d: "Your license, your machine. Nobody else can run it. Resets on request." },
              { icon: Headphones, t: "24/7 support", d: "Real humans in Discord. Setup help, config tuning, you're never alone." },
            ].map((f) => (
              <div
                key={f.t}
                className="glow-hover group relative overflow-hidden rounded-2xl border border-border/70 bg-surface/50 p-6 backdrop-blur"
              >
                <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-primary/10 blur-2xl transition group-hover:bg-primary/20" />
                <div className="relative">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold">{f.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{f.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SHOWCASE / VISUAL SECTION ===== */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="fade-up">
              <div className="font-mono text-xs uppercase tracking-widest text-primary">The arsenal</div>
              <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
                One loader. <br /><span className="text-gradient">Every weapon dialed.</span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                Switch operators mid-round, configs auto-apply. From the SMG-11 to the BOSG,
                we've shipped recoil profiles for every gun in the meta — and re-tuned them every season since.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Per-operator profile auto-detection",
                  "Anti-recoil with adaptive randomization",
                  "Hotkey-bound config switching",
                  "Optional silent loader for streamers",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm">
                    <ChevronRight className="mt-0.5 h-4 w-4 text-primary" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex gap-3">
                <Button asChild className="glow-border"><Link to="/cheats">See all cheats</Link></Button>
                <Button asChild variant="outline"><Link to="/features">Full feature list</Link></Button>
              </div>
            </div>

            {/* Mock loader window */}
            <div className="relative fade-up">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-primary/20 via-primary/0 to-accent/20 blur-2xl" />
              <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-surface/80 shadow-2xl backdrop-blur">
                {/* Window chrome */}
                <div className="flex items-center justify-between border-b border-border/70 bg-background/60 px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    kdots-loader.exe
                  </div>
                  <Crosshair className="h-3.5 w-3.5 text-primary" />
                </div>
                {/* Body */}
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Status</div>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                        <span className="font-mono text-sm font-bold text-emerald-300">UNDETECTED · LOADED</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">HWID</div>
                      <div className="mt-1 font-mono text-xs text-muted-foreground">kx · 9F2A · ████</div>
                    </div>
                  </div>

                  <div className="mt-5 space-y-2">
                    {[
                      { n: "Ash · R4-C", s: 96 },
                      { n: "Jäger · 416-C", s: 92 },
                      { n: "Smoke · FMG-9", s: 88 },
                      { n: "Recruit · SMG-11", s: 99 },
                    ].map((r) => (
                      <div key={r.n} className="rounded-lg border border-border/60 bg-background/50 p-3">
                        <div className="mb-1.5 flex items-center justify-between text-xs">
                          <span className="font-medium">{r.n}</span>
                          <span className="font-mono text-primary">{r.s}%</span>
                        </div>
                        <div className="h-1 overflow-hidden rounded-full bg-border/70">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-primary to-accent shimmer"
                            style={{ width: `${r.s}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 grid grid-cols-3 gap-2 border-t border-border/60 pt-4">
                    <Stat label="CPU" val="0.8%" />
                    <Stat label="Mem" val="22mb" />
                    <Stat label="Ping" val="9ms" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS / MARQUEE ===== */}
      <section className="relative overflow-hidden border-y border-border/60 bg-surface/30 py-16 backdrop-blur">
        <div className="mb-8 text-center">
          <div className="font-mono text-xs uppercase tracking-widest text-primary">The squad</div>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Loved by ranked operators.</h2>
        </div>
        <div className="relative">
          <div className="flex w-max gap-4 marquee">
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
              <div key={i} className="w-80 shrink-0 rounded-2xl border border-border/70 bg-surface/70 p-5 backdrop-blur">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="h-3.5 w-3.5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="mt-3 text-sm text-foreground/90">"{t.q}"</p>
                <div className="mt-4 flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 font-mono text-xs font-bold text-primary">
                    {t.a[0]}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{t.a}</div>
                    <div className="text-xs text-muted-foreground">{t.r}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="mx-auto max-w-4xl px-4 py-24 sm:px-6">
        <div className="mb-10 text-center">
          <div className="font-mono text-xs uppercase tracking-widest text-primary">FAQ</div>
          <h2 className="mt-2 text-4xl font-bold sm:text-5xl">Common questions.</h2>
        </div>
        <div className="space-y-3">
          {FAQ.map((f, i) => (
            <details
              key={i}
              className="group rounded-2xl border border-border/70 bg-surface/50 p-5 backdrop-blur transition open:border-primary/40"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 list-none">
                <h3 className="text-base font-semibold">{f.q}</h3>
                <ChevronRight className="h-4 w-4 text-primary transition group-open:rotate-90" />
              </summary>
              <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="mx-auto max-w-5xl px-4 pb-24 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/15 via-surface/60 to-accent/10 p-10 text-center backdrop-blur sm:p-16">
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/30 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
          <div className="relative">
            <Crosshair className="mx-auto mb-4 h-10 w-10 text-primary float-y" />
            <h2 className="text-3xl font-bold sm:text-5xl">
              Ready to <span className="text-gradient">dominate</span>?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-muted-foreground">
              Join 12,400+ operators already running Kdots. Setup takes 60 seconds.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="h-12 px-7 glow-border">
                <Link to="/cheats">Pick your cheat <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 px-7">
                <a href="https://discord.gg/fkRThkmE3s" target="_blank" rel="noreferrer">
                  Join Discord
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function Stat({ label, val }: { label: string; val: string }) {
  return (
    <div className="rounded-lg bg-background/50 p-2 text-center">
      <div className="font-mono text-xs font-bold text-foreground">{val}</div>
      <div className="text-[9px] uppercase tracking-widest text-muted-foreground">{label}</div>
    </div>
  );
}

const TESTIMONIALS = [
  { q: "Cleanest macros I've ever used. SMG-11 feels illegal.", a: "Vortex", r: "Champion · EU" },
  { q: "Been running for 6 months. Zero issues, zero bans.", a: "Mira", r: "Diamond · NA" },
  { q: "Support is unreal. Replied in 2 minutes at 3am.", a: "Kano", r: "Diamond · APAC" },
  { q: "Switched from a $40/mo competitor. Never going back.", a: "Drift", r: "Plat · EU" },
  { q: "Recoil profiles are next level. Patch-day updates too.", a: "Echo", r: "Champion · NA" },
  { q: "Loader is so clean it looks legit. Friends thought I just got better.", a: "Frost", r: "Diamond · EU" },
];

const FAQ = [
  { q: "Is it actually undetected?", a: "Yes — we use hardware-level input routing, not memory injection. Track record: zero detection waves since launch. We pause sales the moment any risk appears." },
  { q: "How do I get the cheat after buying?", a: "You'll receive a Discord DM with your license and loader within 60 seconds of payment. Setup takes another minute." },
  { q: "What if I get a new PC?", a: "HWID resets are free for the first one per month. Just open a ticket in Discord." },
  { q: "Do you support consoles?", a: "PC only. Macros via mouse/keyboard input — works on any title Siege runs on (Steam, Ubisoft Connect)." },
  { q: "What's the refund policy?", a: "Full refund within 24 hours if the cheat won't load on your system. After setup we don't refund — but we'll fix any issue." },
];
