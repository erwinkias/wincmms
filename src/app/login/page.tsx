import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ShieldCheck, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { getSession } from '@/lib/session';
import { loginAction } from './actions';
import { ThemeToggle } from '@/components/theme-toggle';

export default async function LoginPage({ searchParams }: { searchParams?: Promise<{ error?: string; registered?: string }> }) {
  const session = await getSession();
  if (session?.user) redirect('/admin');
  const params = (await searchParams) ?? {};

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 py-10 dark:bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.18),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.16),_transparent_24%)]" />
      <div className="absolute right-6 top-6 z-20">
        <ThemeToggle />
      </div>

      <Card className="relative z-10 w-full max-w-5xl overflow-hidden border-slate-200/80 bg-white/95 shadow-2xl shadow-slate-200/60 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95 dark:shadow-black/30">
        <CardContent className="grid min-h-[620px] p-0 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="hidden flex-col justify-between bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 p-10 text-white lg:flex">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium backdrop-blur">
                <Sparkles className="h-4 w-4" />
                Smart maintenance platform
              </div>
              <div className="mt-10 max-w-md">
                <h1 className="font-heading text-4xl font-bold leading-tight">
                  Keep every asset healthy, visible, and under control.
                </h1>
                <p className="mt-4 text-sm leading-7 text-blue-50/90">
                  WinCMMS bantu tim maintenance memantau work order, preventive schedule, part stock,
                  dan performa asset dalam satu dashboard yang enak dipakai setiap hari.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.2em] text-blue-100/70">Work Order</p>
                <p className="mt-3 text-3xl font-semibold">1,284</p>
                <p className="mt-1 text-sm text-blue-100/80">Active tasks monitored this month</p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.2em] text-blue-100/70">PM Compliance</p>
                <p className="mt-3 text-3xl font-semibold">96.2%</p>
                <p className="mt-1 text-sm text-blue-100/80">Preventive execution stays on track</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center p-6 sm:p-10 lg:p-12">
            <div className="w-full max-w-md">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary dark:bg-primary/15">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight">Welcome back</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Masuk ke WinCMMS dengan email atau username untuk lanjut ke dashboard.
                  </p>
                </div>
              </div>

              <form action={loginAction} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="identifier">Email / Username</Label>
                  <Input id="identifier" name="identifier" placeholder="admin@wincmms.local atau admin" required className="h-11 rounded-xl bg-slate-50 dark:bg-slate-950" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="/forgot-password" className="text-xs font-medium text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input id="password" name="password" type="password" placeholder="••••••••" required className="h-11 rounded-xl bg-slate-50 dark:bg-slate-950" />
                </div>

                {params.error ? (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-950 dark:bg-red-950/40 dark:text-red-300">
                    Login gagal. Cek lagi email/username dan password Bos.
                  </div>
                ) : null}

                {params.registered ? (
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-600 dark:border-emerald-950 dark:bg-emerald-950/40 dark:text-emerald-300">
                    Registrasi berhasil. Sekarang tinggal login.
                  </div>
                ) : null}

                <Button className="h-11 w-full rounded-xl text-base font-semibold shadow-lg shadow-primary/20" type="submit">
                  Log in to dashboard
                </Button>
              </form>

              <div className="mt-8 border-t border-border pt-5 text-center text-sm text-muted-foreground">
                Belum punya akun?{' '}
                <Link href="/register" className="font-semibold text-primary hover:underline">
                  Register sekarang
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
