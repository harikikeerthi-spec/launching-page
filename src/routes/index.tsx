import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  BellRing,
  Building2,
  CalendarClock,
  FileCheck2,
  GraduationCap,
  Globe2,
  Headphones,
  Instagram,
  Youtube,
  Twitter,
  Percent,
  ShieldCheck,
  Sparkles,
  Star,
  UserRound,
  Zap,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Countdown } from "@/components/site/Countdown";
import { supabase } from "@/lib/supabase";
import logo from "@/assets/vidyaloans-logo-transparent.png";
import heroArt from "@/assets/hero-3d.jpg";
import rocket from "@/assets/rocket-3d.png";
import envelope from "@/assets/envelope-3d.png";
import campus from "@/assets/campus-3d.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vidya Loans — Abroad Education Loans Launching 19 Aug 2026" },
      {
        name: "description",
        content:
          "Vidya Loans is launching 19 August 2026: smarter abroad education loans with quick approval, competitive rates and expert guidance for top global universities.",
      },
      { property: "og:title", content: "Vidya Loans — Abroad Education Loans, Launching Soon" },
      {
        property: "og:description",
        content:
          "Study-abroad financing made simpler, faster and smarter. Counted down to launch on 19 August 2026, 11:09 AM IST.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const NAV = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "How It Works", href: "#how" },
  { label: "Benefits", href: "#benefits" },
  { label: "Partners", href: "#partners" },
  { label: "Contact", href: "#contact" },
];

const BENEFITS = [
  { icon: Zap, title: "Quick Approval", text: "Faster process, far less hassle." },
  { icon: Percent, title: "Competitive Rates", text: "Affordable plans that help you grow." },
  { icon: FileCheck2, title: "Minimal Docs", text: "Less paperwork, more convenience." },
  { icon: CalendarClock, title: "Flexible Repayment", text: "Plans that fit your future." },
  { icon: ShieldCheck, title: "Trusted & Secure", text: "Safe, transparent and reliable." },
];

const STEPS = [
  { n: "01", title: "Share your profile", text: "University, course, country and funding need." },
  { n: "02", title: "Get matched", text: "Compare lender options curated for your admit." },
  { n: "03", title: "Approval & sanction", text: "Digital docs, expert review, quick sanction." },
  { n: "04", title: "Fly with confidence", text: "Disbursal on time for your visa and tuition." },
];

const PILLARS = [
  { icon: UserRound, title: "Personalized Guidance" },
  { icon: Globe2, title: "Affordable Solutions" },
  { icon: Headphones, title: "End-to-End Support" },
  { icon: Star, title: "Bright Future Ahead" },
];

const PARTNERS = [
  "Avance",
  "HDFC Credila",
  "Poonawala",
  "Auxilo",
  "IDFC",
];

const SOCIALS = [
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/vidya_loans/" },
  { icon: Youtube, label: "YouTube", href: "https://www.youtube.com/@VidyaLoans" },
  { icon: Twitter, label: "Twitter", href: "https://x.com/VidyaLoans07" },
];

function Landing() {
  const [form, setForm] = useState({ name: "", mobile: "", email: "" });
  const [loading, setLoading] = useState(false);

  const notify = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = form.name.trim();
    const mobile = form.mobile.replace(/\D/g, "");
    const email = form.email.trim().toLowerCase();

    if (!name || name.length < 2) {
      toast.error("Please enter your full name (at least 2 characters).");
      return;
    }
    if (name.length > 30) {
      toast.error("Full name cannot exceed 30 characters.");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      toast.error("Please enter a valid 10-digit Indian mobile number starting with 6-9.");
      return;
    }
    if (!email || email.length > 40) {
      toast.error("Email address cannot exceed 40 characters.");
      return;
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const url = import.meta.env.VITE_SUPABASE_URL;
      const key =
        import.meta.env.VITE_SUPABASE_ANON_KEY ||
        import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

      if (!url || !key || url.includes("your-supabase") || url.includes("placeholder")) {
        toast.error("Please set your real VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in the .env file.");
        setLoading(false);
        return;
      }

      const { error } = await supabase.from("leads").insert([
        {
          name: form.name.trim(),
          mobile: form.mobile.trim(),
          email: form.email.trim().toLowerCase(),
        },
      ]);

      if (error) {
        console.error("Supabase insert error:", error);
        if (
          error.message.includes("relation") ||
          error.message.includes("find table") ||
          error.code === "42P01" ||
          error.code === "PGRST204"
        ) {
          toast.error("Table 'leads' not found in Supabase. Please run the SQL table script in Supabase.");
        } else if (
          error.message.includes("row-level security") ||
          error.message.includes("RLS") ||
          error.code === "42501"
        ) {
          toast.error("Row Level Security error. Please run the SQL policy script in Supabase SQL editor.");
        } else {
          toast.error(`Submission failed: ${error.message}`);
        }
      } else {
        toast.success("You're on the list! We'll reach out the moment we launch.");
        setForm({ name: "", mobile: "", email: "" });
      }
    } catch (err: any) {
      console.error("Unexpected error:", err);
      toast.error(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="home" className="min-h-screen overflow-x-hidden">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6 lg:flex lg:justify-between">
          <a href="#home" className="flex min-w-0 items-center gap-2.5 sm:gap-3">
            <img
              src={logo}
              alt="Vidya Loans logo"
              width={96}
              height={96}
              className="h-10 w-auto shrink-0 object-contain sm:h-12 md:h-14"
            />
            <span className="min-w-0">
              <span className="block whitespace-nowrap text-lg leading-tight font-black tracking-tight sm:text-xl lg:text-2xl">
                VIDYA <span className="text-gradient">LOANS</span>
              </span>
              <span className="block text-[0.7rem] font-semibold tracking-wide text-accent-foreground uppercase sm:truncate sm:text-xs">
                Presented by BMK Study Abroad Consultants
              </span>
            </span>
          </a>
          <nav className="hidden items-center gap-7 text-sm font-semibold text-muted-foreground lg:flex">
            {NAV.map((n) => (
              <a key={n.label} href={n.href} className="transition-colors hover:text-primary">
                {n.label}
              </a>
            ))}
          </nav>
          <Button variant="hero" size="pill" className="shrink-0 px-4 py-1 sm:h-12 sm:px-7 sm:py-0" asChild>
            <a href="#notify" aria-label="Get notified at launch">
              <BellRing /> <span className="hidden sm:inline">COMING SOON</span>
            </a>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 pt-10 pb-6 sm:px-6 lg:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <p className="font-script text-2xl text-primary sm:text-3xl">Something Big is</p>
            <h1 className="mt-1 text-[clamp(2.7rem,10vw,5.6rem)] leading-[0.92] font-black">
              <span className="block text-ink">COMING</span>
              <span className="text-gradient block">SOON!</span>
            </h1>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-cta)] px-5 py-2 text-sm font-bold text-primary-foreground shadow-[var(--shadow-glow)]">
              <GraduationCap className="size-4" /> Smart Loans for Bright Minds
            </div>
            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-bold text-secondary-foreground">
              <Building2 className="size-3.5 text-primary" /> Presented by BMK Study Abroad Consultants
            </div>
            <p className="mt-6 max-w-lg text-base text-muted-foreground sm:text-lg">
              Vidya Loans is on the way to make abroad education financing simpler, faster and
              smarter — backed by trusted education-loan partners so you can study at the world's
              top universities.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button variant="hero" size="pill" asChild>
                <a href="#notify">
                  <Sparkles /> Notify me at launch
                </a>
              </Button>
              <Button variant="soft" size="pill" asChild>
                <a href="#how">How it works</a>
              </Button>
            </div>
            <div className="mt-7 inline-flex max-w-md items-center gap-3 rounded-2xl px-4 py-3 glass-card">
              <BellRing className="size-5 shrink-0 text-accent-foreground" />
              <p className="text-sm">
                Big things are on the horizon.{" "}
                <span className="font-bold text-accent-foreground">Stay tuned!</span>
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] border border-border/70 bg-surface/70 shadow-[var(--shadow-float)]">
              <img
                src={heroArt}
                alt="3D illustration of students planning their abroad education"
                width={1280}
                height={1024}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -top-4 -left-3 hidden items-center gap-2 rounded-2xl px-4 py-2 text-xs font-bold glass-card float-slow sm:inline-flex">
              <Percent className="size-4 text-primary" /> Affordable Plans
            </div>
            <div className="absolute -right-2 bottom-8 hidden items-center gap-2 rounded-2xl px-4 py-2 text-xs font-bold glass-card float-fast sm:inline-flex">
              <GraduationCap className="size-4 text-primary" /> Fuel Your Education
            </div>
            <div className="absolute -top-5 right-6 hidden items-center gap-2 rounded-2xl px-4 py-2 text-xs font-bold glass-card float-fast md:inline-flex">
              <Star className="size-4 text-sun" /> Bright Future
            </div>
          </div>
        </div>
      </section>

      {/* Countdown */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="rounded-[2rem] p-6 glass-card sm:p-8">
          <div className="grid items-center gap-6 md:grid-cols-[auto_minmax(0,1fr)]">
            <img
              src={rocket}
              alt=""
              width={768}
              height={768}
              loading="lazy"
              aria-hidden
              className="mx-auto h-28 w-28 object-contain float-slow sm:h-36 sm:w-36"
            />
            <div className="min-w-0">
              <p className="mb-4 text-center text-xs font-black tracking-[0.28em] text-primary uppercase md:text-left">
                Launching in
              </p>
              <Countdown />
              <p className="mt-4 text-center text-xs text-muted-foreground md:text-left">
                Go live: 19 August 2026 · 11:09 AM IST
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <h2 className="text-center text-2xl font-black sm:text-3xl">
          Why choose <span className="text-gradient">Vidya Loans?</span>
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {BENEFITS.map((b) => (
            <div
              key={b.title}
              className="rounded-3xl p-6 text-center glass-card transition-transform hover:-translate-y-1"
            >
              <div className="mx-auto grid size-12 place-items-center rounded-full bg-[image:var(--gradient-cta)] text-primary-foreground shadow-[var(--shadow-glow)]">
                <b.icon className="size-5" />
              </div>
              <h3 className="mt-4 text-sm font-black tracking-wide uppercase">{b.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Partners */}
      <section id="partners" className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <h2 className="text-center text-2xl font-black sm:text-3xl">
          Trusted <span className="text-gradient">Partners</span>
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-muted-foreground">
          We work with India's leading education-loan providers to find the best fit for your admit.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {PARTNERS.map((name) => (
            <div
              key={name}
              className="flex items-center justify-center rounded-3xl px-6 py-6 text-center glass-card transition-transform hover:-translate-y-1"
            >
              <span className="text-lg font-black tracking-tight">{name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <h2 className="text-2xl font-black sm:text-3xl">
          How it <span className="text-gradient">works</span>
        </h2>
        <p className="mt-2 max-w-xl text-muted-foreground">
          A guided, four-step journey designed by experts in overseas education finance.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <div key={s.n} className="relative rounded-3xl p-6 glass-card">
              <span className="text-3xl font-black text-violet-soft">{s.n}</span>
              <h3 className="mt-2 text-base font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid items-center gap-8 lg:grid-cols-3">
          <div>
            <h2 className="text-2xl font-black sm:text-3xl">
              Empowering <span className="text-gradient">Education.</span>
              <br />
              Enriching <span className="text-gradient">Lives.</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              We believe every dream deserves a chance. From admit to arrival, we help you fund a
              world-class education abroad — transparently.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-3 rounded-3xl bg-ink p-5 text-primary-foreground">
              {[
                { v: "5+", l: "Trusted Lenders" },
                { v: "50+", l: "Partner Institutions" },
                { v: "100%", l: "Commitment to You" },
              ].map((s) => (
                <div key={s.v} className="min-w-0">
                  <div className="text-xl font-black sm:text-2xl">{s.v}</div>
                  <div className="text-[0.65rem] leading-tight opacity-80">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-border/70 shadow-[var(--shadow-float)]">
            <img
              src={campus}
              alt="3D illustration of students on an international university campus"
              width={1024}
              height={1024}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="grid gap-3">
            {PILLARS.map((p) => (
              <div key={p.title} className="flex items-center gap-3 rounded-2xl px-5 py-4 glass-card">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-secondary text-primary">
                  <p.icon className="size-5" />
                </span>
                <span className="min-w-0 text-sm font-semibold">{p.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notify */}
      <section id="notify" className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid items-center gap-6 rounded-[2rem] p-6 glass-card sm:p-10 lg:grid-cols-[auto_minmax(0,1fr)]">
          <img
            src={envelope}
            alt=""
            aria-hidden
            width={768}
            height={768}
            loading="lazy"
            className="mx-auto h-32 w-32 object-contain float-slow sm:h-44 sm:w-44"
          />
          <div className="min-w-0">
            <h2 className="text-2xl font-black sm:text-3xl">
              Be the first to <span className="text-gradient">know!</span>
            </h2>
            <p className="mt-2 text-muted-foreground">
              Leave your details and we will reach out the moment we launch.
            </p>
            <form onSubmit={notify} className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Input
                type="text"
                maxLength={30}
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Full name"
                aria-label="Full name"
                className="h-12 rounded-full border-border bg-surface px-5 text-base"
              />
              <Input
                type="tel"
                maxLength={10}
                value={form.mobile}
                onChange={(e) =>
                  setForm((f) => ({ ...f, mobile: e.target.value.replace(/\D/g, "").slice(0, 10) }))
                }
                placeholder="10-digit Mobile number"
                aria-label="Mobile number"
                className="h-12 rounded-full border-border bg-surface px-5 text-base"
              />
              <Input
                type="email"
                maxLength={40}
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="Email address"
                aria-label="Email address"
                className="h-12 rounded-full border-border bg-surface px-5 text-base"
              />
              <Button type="submit" variant="hero" size="pill" disabled={loading} className="h-12 shrink-0">
                {loading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> SUBMITTING...
                  </>
                ) : (
                  <>
                    NOTIFY ME <BellRing />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="mt-6 border-t border-border/60 bg-surface/60">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 md:grid-cols-3 md:items-center">
          <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
            <img
              src={logo}
              alt="Vidya Loans"
              width={80}
              height={80}
              loading="lazy"
              className="h-9 w-auto shrink-0 object-contain sm:h-10 md:h-12"
            />
            <span className="min-w-0">
              <span className="block text-base leading-tight font-black sm:text-lg lg:text-xl">
                VIDYA <span className="text-gradient">LOANS</span>
              </span>
              <span className="block truncate text-[0.7rem] font-semibold tracking-wide text-accent-foreground uppercase sm:text-xs">
                Presented by BMK Study Abroad Consultants
              </span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-muted-foreground">Follow us</span>
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow on ${social.label}`}
                className="grid size-9 place-items-center rounded-full bg-[image:var(--gradient-cta)] text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                <social.icon className="size-4" />
              </a>
            ))}
          </div>
          <p className="text-sm text-muted-foreground md:text-right">
            Vidya Loans — because every dream deserves a chance.
            <br />
            <span className="inline-flex items-center gap-1">
              <Building2 className="size-3.5" /> Abroad education financing, launching 19 Aug 2026.
            </span>
          </p>
        </div>
      </footer>
    </div>
  );
}
