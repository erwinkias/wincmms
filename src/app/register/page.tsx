import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Building2, ShieldCheck, Users2 } from 'lucide-react';
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
    <main className="relative flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10 dark:bg-slate-950">
      <div className="absolute right-6 top-6 z-20">
        <ThemeToggle />
      </div>

      <Card className="w-full max-w-6xl overflow-hidden border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">
        <CardContent className="grid min-h-[660px] p-0 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="flex items-center justify-center p-6 sm:p-10 lg:p-14">
            <div className="w-full max-w-md">
              <div className="mb-8">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h2 className="mt-5 font-heading text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Create account</h2>
                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Daftarkan akun baru untuk mulai memakai WinCMMS dengan workspace yang lebih rapi dan profesional.
                </p>
              </div>

              <form action={registerAction} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" required className="h-11 rounded-xl border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950" />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" name="username" required className="h-11 rounded-xl border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" name="phone" required className="h-11 rounded-xl border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" name="password" type="password" required className="h-11 rounded-xl border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950" />
                </div>

                {params.error ? (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-950 dark:bg-red-950/40 dark:text-red-300">
                    Registrasi gagal. Kemungkinan email atau username sudah dipakai.
                  </div>
                ) : null}

                <Button className="h-11 w-full rounded-xl bg-slate-900 text-base font-semibold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200" type="submit">
                  Create account
                </Button>
              </form>

              <div className="mt-8 border-t border-slate-200 pt-5 text-center text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
                Sudah punya akun?{' '}
                <Link href="/login" className="font-semibold text-slate-900 hover:underline dark:text-white">
                  Login di sini
                </Link>
              </div>
            </div>
          </div>

          <div className="hidden border-l border-slate-200 bg-slate-950 text-white dark:border-slate-800 lg:flex lg:flex-col lg:justify-between">
            <div className="p-10">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Operational Access</p>
              <h1 className="mt-6 max-w-lg font-heading text-4xl font-bold leading-tight">
                Built for teams that prefer clarity over visual noise.
              </h1>
              <p className="mt-4 max-w-md text-sm leading-7 text-slate-300">
                Tampilan yang lebih tenang, struktur yang jelas, dan role-based access yang cocok untuk kebutuhan plant, utility, dan maintenance office.
              </p>
            </div>

            <div className="grid gap-4 p-10 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <Building2 className="h-5 w-5 text-blue-400" />
                <p className="mt-5 text-sm uppercase tracking-[0.2em] text-slate-400">Multi Site</p>
                <p className="mt-2 text-xl font-semibold">Plant ready</p>
                <p className="mt-2 text-sm text-slate-400">Support untuk site, area utility, workshop, dan warehouse.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <Users2 className="h-5 w-5 text-emerald-400" />
                <p className="mt-5 text-sm uppercase tracking-[0.2em] text-slate-400">Role Access</p>
                <p className="mt-2 text-xl font-semibold">Controlled workspace</p>
                <p className="mt-2 text-sm text-slate-400">Admin, supervisor, technician, dan requester dengan akses yang terpisah jelas.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
