import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Building2, ShieldCheck, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { getSession } from '@/lib/session';
import { registerAction } from './actions';
import { ThemeToggle } from '@/components/theme-toggle';

export default async function RegisterPage({ searchParams }: { searchParams?: Promise<{ error?: string }> }) {
  const session = await getSession();
  if (session?.user) redirect('/dashboard');
  const params = (await searchParams) ?? {};

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 py-10 dark:bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(14,165,233,0.16),_transparent_26%),radial-gradient(circle_at_bottom_left,_rgba(99,102,241,0.16),_transparent_24%)]" />
      <div className="absolute right-6 top-6 z-20">
        <ThemeToggle />
      </div>

      <Card className="relative z-10 w-full max-w-5xl overflow-hidden border-slate-200/80 bg-white/95 shadow-2xl shadow-slate-200/60 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95 dark:shadow-black/30">
        <CardContent className="grid min-h-[660px] p-0 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="flex items-center justify-center p-6 sm:p-10 lg:p-12">
            <div className="w-full max-w-md">
              <div className="mb-8">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary dark:bg-primary/15">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight">Create your account</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Daftarkan akun baru untuk mulai mengelola request maintenance, asset, dan aktivitas kerja di WinCMMS.
                </p>
              </div>

              <form action={registerAction} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" required className="h-11 rounded-xl bg-slate-50 dark:bg-slate-950" />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" name="username" required className="h-11 rounded-xl bg-slate-50 dark:bg-slate-950" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" name="phone" required className="h-11 rounded-xl bg-slate-50 dark:bg-slate-950" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" name="password" type="password" required className="h-11 rounded-xl bg-slate-50 dark:bg-slate-950" />
                </div>

                {params.error ? (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-950 dark:bg-red-950/40 dark:text-red-300">
                    Registrasi gagal. Kemungkinan email atau username sudah dipakai.
                  </div>
                ) : null}

                <Button className="h-11 w-full rounded-xl text-base font-semibold shadow-lg shadow-primary/20" type="submit">
                  Create account
                </Button>
              </form>

              <div className="mt-8 border-t border-border pt-5 text-center text-sm text-muted-foreground">
                Sudah punya akun?{' '}
                <Link href="/login" className="font-semibold text-primary hover:underline">
                  Login di sini
                </Link>
              </div>
            </div>
          </div>

          <div className="hidden flex-col justify-between bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 p-10 text-white lg:flex">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium backdrop-blur">
                <Sparkles className="h-4 w-4" />
                Modern plant management
              </div>
              <div className="mt-10 max-w-md">
                <h1 className="font-heading text-4xl font-bold leading-tight">
                  From first request to complete maintenance visibility.
                </h1>
                <p className="mt-4 text-sm leading-7 text-slate-200">
                  Register sekali, lalu Bos bisa mulai bangun workflow maintenance yang lebih tertata,
                  terukur, dan gampang dipantau oleh supervisor maupun technician.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <Building2 className="h-5 w-5 text-cyan-300" />
                <p className="mt-4 text-xl font-semibold">Multi site ready</p>
                <p className="mt-2 text-sm text-slate-300">Cocok untuk plant, warehouse, building, dan utility area.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <ShieldCheck className="h-5 w-5 text-indigo-300" />
                <p className="mt-4 text-xl font-semibold">Role based access</p>
                <p className="mt-2 text-sm text-slate-300">Admin, supervisor, technician, dan requester punya ruang kerja masing-masing.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
