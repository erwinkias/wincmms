import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Building2, ShieldCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { getSession } from '@/lib/session';
import { loginAction } from './actions';
import { ThemeToggle } from '@/components/theme-toggle';

export default async function LoginPage({ searchParams }: { searchParams?: Promise<{ error?: string; registered?: string }> }) {
  const session = await getSession();
  if (session?.user) redirect('/dashboard');
  const params = (await searchParams) ?? {};

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10 dark:bg-slate-950">
      <div className="absolute right-6 top-6 z-20">
        <ThemeToggle />
      </div>

      <Card className="w-full max-w-6xl overflow-hidden border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">
        <CardContent className="grid min-h-[640px] p-0 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="hidden border-r border-slate-200 bg-slate-950 text-white dark:border-slate-800 lg:flex lg:flex-col lg:justify-between">
            <div className="p-10">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">WinCMMS</p>
              <h1 className="mt-6 max-w-lg font-heading text-4xl font-bold leading-tight">
                Clean control for maintenance teams and industrial operations.
              </h1>
              <p className="mt-4 max-w-md text-sm leading-7 text-slate-300">
                Monitor work orders, machine activity, preventive tasks, and spare parts in one enterprise workspace that feels calm and focused.
              </p>
            </div>

            <div className="grid gap-4 p-10 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <ShieldCheck className="h-5 w-5 text-blue-400" />
                <p className="mt-5 text-sm uppercase tracking-[0.2em] text-slate-400">PM Compliance</p>
                <p className="mt-2 text-3xl font-semibold">96.2%</p>
                <p className="mt-2 text-sm text-slate-400">Preventive tasks stay on target every week.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <Building2 className="h-5 w-5 text-emerald-400" />
                <p className="mt-5 text-sm uppercase tracking-[0.2em] text-slate-400">Multi Site</p>
                <p className="mt-2 text-3xl font-semibold">12</p>
                <p className="mt-2 text-sm text-slate-400">Plant, utility, and warehouse coverage ready.</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center p-6 sm:p-10 lg:p-14">
            <div className="w-full max-w-md">
              <div className="mb-8">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h2 className="mt-5 font-heading text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Sign in</h2>
                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Gunakan email atau username untuk masuk ke workspace WinCMMS.
                </p>
              </div>

              <form action={loginAction} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="identifier">Email / Username</Label>
                  <Input id="identifier" name="identifier" placeholder="admin@wincmms.local atau admin" required className="h-11 rounded-xl border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="/forgot-password" className="text-xs font-medium text-slate-500 hover:text-primary dark:text-slate-400">
                      Forgot password?
                    </Link>
                  </div>
                  <Input id="password" name="password" type="password" placeholder="••••••••" required className="h-11 rounded-xl border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950" />
                </div>

                {params.error ? (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-950 dark:bg-red-950/40 dark:text-red-300">
                    Login gagal. Cek lagi email/username dan password Bos.
                  </div>
                ) : null}

                {params.registered ? (
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-950 dark:bg-emerald-950/40 dark:text-emerald-300">
                    Registrasi berhasil. Sekarang tinggal login.
                  </div>
                ) : null}

                <Button className="h-11 w-full rounded-xl bg-slate-900 text-base font-semibold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200" type="submit">
                  Enter dashboard
                </Button>
              </form>

              <div className="mt-8 border-t border-slate-200 pt-5 text-center text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
                Belum punya akun?{' '}
                <Link href="/register" className="font-semibold text-slate-900 hover:underline dark:text-white">
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
