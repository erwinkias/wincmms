import { BarChart3, CheckCircle2, Clock3, Factory, PackageSearch, ShieldCheck } from 'lucide-react';
import { AdminShell } from '@/components/admin-shell';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { db } from '@/lib/db';
import { requireAdminAccess } from '@/lib/auth';

export default async function AdminDashboardPage() {
  await requireAdminAccess();

  const [usersCount, sitesCount, assetsCount, partsCount, latestUsers] = await Promise.all([
    db.user.count(),
    db.site.count(),
    db.asset.count(),
    db.sparePart.count(),
    db.user.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
  ]);

  const metrics = [
    {
      label: 'Work Order Done',
      value: '17,399',
      note: 'Monthly completed jobs',
      icon: CheckCircle2,
      accent: 'from-emerald-500/20 to-emerald-500/5 text-emerald-600 dark:text-emerald-400',
    },
    {
      label: 'Work Order Active',
      value: '835',
      note: 'Running maintenance tasks',
      icon: Clock3,
      accent: 'from-amber-500/20 to-amber-500/5 text-amber-600 dark:text-amber-400',
    },
    {
      label: 'Total Machine',
      value: String(assetsCount),
      note: 'Registered machine assets',
      icon: Factory,
      accent: 'from-sky-500/20 to-sky-500/5 text-sky-600 dark:text-sky-400',
    },
    {
      label: 'Spare Parts',
      value: String(partsCount),
      note: 'Parts currently listed',
      icon: PackageSearch,
      accent: 'from-violet-500/20 to-violet-500/5 text-violet-600 dark:text-violet-400',
    },
  ];

  const bars = [
    { name: 'Repair Utility', open: 27, done: 50, cancel: 3 },
    { name: 'Machine Improvement', open: 13, done: 207, cancel: 0 },
    { name: 'Building Repair', open: 48, done: 54, cancel: 2 },
    { name: 'Pump Addition', open: 0, done: 36, cancel: 0 },
    { name: 'Plant Fabrication', open: 59, done: 112, cancel: 5 },
  ];

  return (
    <AdminShell title="Dashboard" description="Monitoring operasional maintenance, asset, dan activity ringkasan harian.">
      <div className="mb-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="rounded-2xl border-0 bg-gradient-to-r from-slate-900 via-slate-800 to-blue-900 text-white shadow-xl shadow-slate-900/10 dark:from-slate-800 dark:via-slate-900 dark:to-blue-950">
          <CardContent className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <Badge className="rounded-full border-white/10 bg-white/10 text-white hover:bg-white/10">Administrator Planner</Badge>
              <h3 className="mt-4 font-heading text-3xl font-bold">Welcome back, keep the plant moving.</h3>
              <p className="mt-2 max-w-2xl text-sm text-slate-200">
                Pantau work order, performa asset, dan aktivitas maintenance dalam tampilan yang lebih rapi dan siap dipakai daily operation.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Users</p>
                <p className="mt-2 text-3xl font-semibold">{usersCount}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Sites</p>
                <p className="mt-2 text-3xl font-semibold">{sitesCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-0 bg-white shadow-sm dark:bg-slate-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-heading text-lg"><ShieldCheck className="h-5 w-5 text-primary" /> Quick Status</CardTitle>
            <CardDescription>Snapshot sistem dan kesiapan operasional.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-800/70"><span>PM Compliance</span><strong>96.2%</strong></div>
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-800/70"><span>Open WO</span><strong>835</strong></div>
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-800/70"><span>Low Stock Alerts</span><strong>07 items</strong></div>
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-800/70"><span>Avg. Completion</span><strong>14.6 hrs</strong></div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.label} className="rounded-2xl border-0 bg-white shadow-sm dark:bg-slate-900">
              <CardContent className="flex items-start justify-between p-5">
                <div>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="mt-2 text-3xl font-bold tracking-tight">{item.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{item.note}</p>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${item.accent}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        <Card className="rounded-2xl border-0 bg-white shadow-sm dark:bg-slate-900">
          <CardHeader>
            <CardTitle className="font-heading text-lg">Chart Work Order Yearly</CardTitle>
            <CardDescription>Visual ringkas workload berdasarkan kategori pekerjaan.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {bars.map((row) => {
              const total = row.open + row.done + row.cancel || 1;
              return (
                <div key={row.name} className="space-y-2">
                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="font-medium text-slate-700 dark:text-slate-200">{row.name}</span>
                    <span className="text-xs text-muted-foreground">{total} total jobs</span>
                  </div>
                  <div className="flex h-4 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div className="bg-red-500" style={{ width: `${(row.open / total) * 100}%` }} />
                    <div className="bg-emerald-500" style={{ width: `${(row.done / total) * 100}%` }} />
                    <div className="bg-yellow-400" style={{ width: `${(row.cancel / total) * 100}%` }} />
                  </div>
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span>Open: {row.open}</span>
                    <span>Done: {row.done}</span>
                    <span>Cancel: {row.cancel}</span>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="rounded-2xl border-0 bg-white shadow-sm dark:bg-slate-900">
            <CardHeader>
              <CardTitle className="font-heading text-lg">Planner Insight</CardTitle>
              <CardDescription>Quick KPI yang sering dicek setiap pagi.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/70">
                <p className="text-sm text-muted-foreground">Form Predictive</p>
                <p className="mt-2 text-3xl font-bold">64,356</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/70">
                <p className="text-sm text-muted-foreground">Monthly Overtime</p>
                <p className="mt-2 text-3xl font-bold">5797 hrs</p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-0 bg-white shadow-sm dark:bg-slate-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-heading text-lg"><BarChart3 className="h-5 w-5 text-primary" /> Latest Users</CardTitle>
              <CardDescription>User terbaru yang masuk ke sistem.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {latestUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-xs text-muted-foreground">{user.email}</div>
                        </div>
                      </TableCell>
                      <TableCell><Badge variant="secondary">{user.role}</Badge></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminShell>
  );
}
