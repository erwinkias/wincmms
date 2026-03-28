import { ClipboardList, PackageSearch, ShieldCheck, UserCircle2, Wrench } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AdminShell } from '@/components/admin-shell';
import { getSessionUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';

export default async function DashboardPage() {
  const user = await getSessionUser();
  if (!user) redirect('/login');

  const [assetCount, siteCount, sparePartCount] = await Promise.all([
    db.asset.count(),
    db.site.count(),
    db.sparePart.count(),
  ]);

  return (
    <AdminShell title="Dashboard" description="Overview personal dan operasional WinCMMS untuk user yang sedang login.">
      <div className="mb-6 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className="rounded-2xl border-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-900 text-white shadow-xl shadow-blue-900/20">
          <CardContent className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <Badge className="rounded-full border-white/10 bg-white/10 text-white hover:bg-white/10">{user.role} Workspace</Badge>
              <h3 className="mt-4 font-heading text-3xl font-bold">Halo, {user.name}</h3>
              <p className="mt-2 max-w-2xl text-sm text-blue-100">
                Selamat datang di dashboard WinCMMS. Dari sini Bos bisa lanjut kelola data, cek status operasional, dan melihat ringkasan aktivitas maintenance.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.2em] text-blue-100/80">Signed in as</p>
              <p className="mt-2 text-lg font-semibold">{user.username}</p>
              <p className="text-sm text-blue-100/80">{user.email}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-0 bg-white shadow-sm dark:bg-slate-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-heading text-lg"><UserCircle2 className="h-5 w-5 text-primary" /> Account Summary</CardTitle>
            <CardDescription>Info singkat akun yang sedang aktif.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-800/70"><span>Role</span><strong>{user.role}</strong></div>
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-800/70"><span>Username</span><strong>{user.username}</strong></div>
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-800/70"><span>Email</span><strong>{user.email}</strong></div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card className="rounded-2xl border-0 bg-white shadow-sm dark:bg-slate-900"><CardContent className="p-5"><div className="flex items-center justify-between"><div><p className="text-sm text-muted-foreground">Total Assets</p><p className="mt-2 text-3xl font-bold">{assetCount}</p></div><Wrench className="h-10 w-10 text-sky-500" /></div></CardContent></Card>
        <Card className="rounded-2xl border-0 bg-white shadow-sm dark:bg-slate-900"><CardContent className="p-5"><div className="flex items-center justify-between"><div><p className="text-sm text-muted-foreground">Total Sites</p><p className="mt-2 text-3xl font-bold">{siteCount}</p></div><ShieldCheck className="h-10 w-10 text-emerald-500" /></div></CardContent></Card>
        <Card className="rounded-2xl border-0 bg-white shadow-sm dark:bg-slate-900"><CardContent className="p-5"><div className="flex items-center justify-between"><div><p className="text-sm text-muted-foreground">Spare Parts</p><p className="mt-2 text-3xl font-bold">{sparePartCount}</p></div><PackageSearch className="h-10 w-10 text-violet-500" /></div></CardContent></Card>
        <Card className="rounded-2xl border-0 bg-white shadow-sm dark:bg-slate-900"><CardContent className="p-5"><div className="flex items-center justify-between"><div><p className="text-sm text-muted-foreground">Open Requests</p><p className="mt-2 text-3xl font-bold">18</p></div><ClipboardList className="h-10 w-10 text-amber-500" /></div></CardContent></Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="rounded-2xl border-0 bg-white shadow-sm dark:bg-slate-900">
          <CardHeader>
            <CardTitle className="font-heading text-lg">What you can do next</CardTitle>
            <CardDescription>Next step tergantung role yang sedang dipakai.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>• Review data master asset dan site</p>
            <p>• Lanjut input request atau monitoring maintenance</p>
            <p>• Cek spare part yang tersedia untuk pekerjaan aktif</p>
            <p>• Gunakan admin area untuk pengaturan lanjutan jika role Bos mengizinkan</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-0 bg-white shadow-sm dark:bg-slate-900">
          <CardHeader>
            <CardTitle className="font-heading text-lg">Access Policy</CardTitle>
            <CardDescription>Pembagian akses sekarang lebih jelas.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>• <strong>/dashboard</strong> bisa dibuka semua user yang login</p>
            <p>• <strong>/admin</strong> hanya untuk ADMIN dan SUPERVISOR</p>
            <p>• REQUESTER dan TECHNICIAN tetap bisa login tanpa mental dari dashboard</p>
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}
