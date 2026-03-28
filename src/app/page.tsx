import Link from 'next/link';
import { ArrowRight, BadgeCheck, BarChart3, ClipboardCheck, ShieldCheck, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ThemeToggle } from '@/components/theme-toggle';

const features = [
  {
    icon: ClipboardCheck,
    title: 'Work Order Management',
    description: 'Kelola corrective, preventive, dan breakdown work order dalam satu alur yang rapi.',
  },
  {
    icon: Wrench,
    title: 'Asset Visibility',
    description: 'Pantau performa asset, kategori, status, dan histori maintenance dengan lebih jelas.',
  },
  {
    icon: BarChart3,
    title: 'Operational Insight',
    description: 'Lihat snapshot KPI dan dashboard maintenance tanpa harus lompat ke spreadsheet.',
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/85 backdrop-blur dark:border-slate-800 dark:bg-slate-950/85">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">WinCMMS</p>
            <h1 className="font-heading text-xl font-bold">Maintenance, simplified.</h1>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/login"><Button variant="outline" className="rounded-xl">Login</Button></Link>
            <Link href="/register"><Button className="rounded-xl">Get Started</Button></Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.18),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.16),_transparent_24%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
          <div className="flex flex-col justify-center">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
              <ShieldCheck className="h-4 w-4" />
              CMMS dashboard for modern operations
            </div>
            <h2 className="mt-6 max-w-3xl font-heading text-4xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-6xl">
              Better maintenance flow for every team, asset, and site.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
              WinCMMS membantu Bos membangun sistem maintenance yang lebih rapi, cepat, dan nyaman dipakai.
              Dari request, dashboard, user access, sampai master data — semuanya dibikin lebih terstruktur.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/register">
                <Button className="h-12 rounded-xl px-6 text-base font-semibold">
                  Start now <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" className="h-12 rounded-xl px-6 text-base">Go to login</Button>
              </Link>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div>
                <div className="text-3xl font-bold">96%</div>
                <div className="text-sm text-muted-foreground">PM compliance target</div>
              </div>
              <div>
                <div className="text-3xl font-bold">24/7</div>
                <div className="text-sm text-muted-foreground">Monitoring readiness</div>
              </div>
              <div>
                <div className="text-3xl font-bold">1 dashboard</div>
                <div className="text-sm text-muted-foreground">For all maintenance data</div>
              </div>
            </div>
          </div>

          <div className="grid gap-5">
            <Card className="rounded-3xl border-0 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white shadow-2xl shadow-slate-900/15">
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-300">Dashboard Overview</p>
                    <h3 className="mt-2 font-heading text-2xl font-bold">Daily Planner Snapshot</h3>
                  </div>
                  <BadgeCheck className="h-10 w-10 text-cyan-300" />
                </div>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Completed WO</p>
                    <p className="mt-3 text-3xl font-semibold">17,399</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Running Tasks</p>
                    <p className="mt-3 text-3xl font-semibold">835</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-5 sm:grid-cols-2">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <Card key={feature.title} className="rounded-2xl border-0 bg-white shadow-sm dark:bg-slate-900">
                    <CardContent className="p-6">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-4 font-heading text-lg font-semibold">{feature.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
