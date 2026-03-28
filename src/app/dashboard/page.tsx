import { ClipboardList, Database, Factory, FileSpreadsheet, Gauge, PackageSearch, Rocket, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AdminShell } from '@/components/admin-shell';
import { getSessionUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

const yearlyWorkOrders = [
  { label: 'Perbaikan Mesin', open: 13, done: 207, cancel: 0 },
  { label: 'Modifikasi Mesin', open: 18, done: 12, cancel: 0 },
  { label: 'Perbaikan Utility', open: 27, done: 50, cancel: 3 },
  { label: 'Perbaikan Bangunan', open: 48, done: 54, cancel: 2 },
  { label: 'Penambahan Bangunan', open: 12, done: 22, cancel: 0 },
  { label: 'Fabrikasi Metal', open: 59, done: 112, cancel: 5 },
  { label: 'Machining', open: 7, done: 32, cancel: 0 },
  { label: 'Kalibrasi & Instrument', open: 7, done: 16, cancel: 0 },
  { label: 'Otomasi & Mekatronik', open: 1, done: 1, cancel: 0 },
  { label: 'Perawatan Pompa', open: 4, done: 8, cancel: 0 },
];

const totalDone = yearlyWorkOrders.reduce((sum, item) => sum + item.done, 0);
const totalOpen = yearlyWorkOrders.reduce((sum, item) => sum + item.open, 0);
const totalCancel = yearlyWorkOrders.reduce((sum, item) => sum + item.cancel, 0);
const totalOrders = totalDone + totalOpen + totalCancel;

const pieData = [
  { label: 'Done', value: totalDone, color: '#4f6bed' },
  { label: 'Open', value: totalOpen, color: '#86d26f' },
  { label: 'Cancel', value: totalCancel, color: '#f7c948' },
];

function donutSegments() {
  const circumference = 2 * Math.PI * 70;
  let offset = 0;

  return pieData.map((item) => {
    const length = (item.value / totalOrders) * circumference;
    const segment = {
      ...item,
      strokeDasharray: `${length} ${circumference - length}`,
      strokeDashoffset: -offset,
    };
    offset += length;
    return segment;
  });
}

export default async function DashboardPage() {
  const user = await getSessionUser();
  if (!user) redirect('/login');

  const segments = donutSegments();

  return (
    <AdminShell title="Dashboard" description="Ringkasan operasional ala planner dashboard dengan data dummy untuk preview desain.">
      <div className="space-y-6">
        <div className="grid gap-4 xl:grid-cols-[1fr_auto_auto]">
          <div>
            <h2 className="font-heading text-3xl font-bold tracking-tight">DASHBOARD</h2>
            <p className="mt-2 text-sm text-muted-foreground">CMMS / Dashboard preview untuk {user.username}</p>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border bg-white px-4 py-3 shadow-sm dark:bg-slate-900">
            <span className="text-sm font-medium text-muted-foreground">Plant</span>
            <select className="min-w-[180px] border-0 bg-transparent text-sm outline-none">
              <option>All Plant</option>
              <option>Plant A</option>
              <option>Plant B</option>
            </select>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border bg-white px-4 py-3 shadow-sm dark:bg-slate-900">
            <span className="text-sm font-medium text-muted-foreground">Month</span>
            <select className="min-w-[180px] border-0 bg-transparent text-sm outline-none">
              <option>March 2026</option>
              <option>February 2026</option>
              <option>January 2026</option>
            </select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            { label: 'Work Order Done', value: '17,399', icon: ShieldCheck, color: 'text-indigo-500' },
            { label: 'Work Order Active', value: '835', icon: Rocket, color: 'text-sky-500' },
            { label: 'Total Machine', value: '1,566', icon: Factory, color: 'text-violet-500' },
            { label: 'Form Preventive', value: '16,907', icon: FileSpreadsheet, color: 'text-blue-500' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.label} className="rounded-2xl border bg-white shadow-sm dark:bg-slate-900">
                <CardContent className="flex items-center justify-between p-5">
                  <div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="mt-2 text-3xl font-bold tracking-tight">{item.value}</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                    <Icon className={`h-5 w-5 ${item.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
          <Card className="rounded-2xl border bg-white shadow-sm dark:bg-slate-900">
            <CardHeader>
              <CardTitle className="font-heading text-lg">Chart Work Order Yearly</CardTitle>
              <CardDescription>Dummy data preview untuk komposisi open, done, dan cancel.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-5 flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-2"><span className="h-3 w-6 rounded-full bg-red-500" /> Open</div>
                <div className="flex items-center gap-2"><span className="h-3 w-6 rounded-full bg-emerald-500" /> Done</div>
                <div className="flex items-center gap-2"><span className="h-3 w-6 rounded-full bg-yellow-400" /> Cancel</div>
              </div>

              <div className="space-y-5">
                {yearlyWorkOrders.map((row) => {
                  const total = row.open + row.done + row.cancel || 1;
                  return (
                    <div key={row.label} className="grid gap-2 md:grid-cols-[180px_1fr] md:items-center">
                      <div className="text-sm font-medium text-slate-700 dark:text-slate-200">{row.label}</div>
                      <div>
                        <div className="flex h-7 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                          <div className="flex items-center justify-center bg-red-500 text-[11px] font-semibold text-white" style={{ width: `${(row.open / total) * 100}%` }}>{row.open ? row.open : ''}</div>
                          <div className="flex items-center justify-center bg-emerald-500 text-[11px] font-semibold text-white" style={{ width: `${(row.done / total) * 100}%` }}>{row.done ? row.done : ''}</div>
                          <div className="flex items-center justify-center bg-yellow-400 text-[11px] font-semibold text-slate-900" style={{ width: `${(row.cancel / total) * 100}%` }}>{row.cancel ? row.cancel : ''}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {[
              { label: 'Form Predictive', value: '64,356', icon: Gauge, color: 'text-blue-500' },
              { label: 'Monthly Overtime', value: '5797 Hours', icon: ClipboardList, color: 'text-violet-500' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.label} className="rounded-2xl border bg-white shadow-sm dark:bg-slate-900">
                  <CardContent className="flex items-center justify-between p-5">
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="mt-2 text-3xl font-bold tracking-tight">{item.value}</p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                      <Icon className={`h-5 w-5 ${item.color}`} />
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            <Card className="rounded-2xl border bg-white shadow-sm dark:bg-slate-900">
              <CardHeader>
                <CardTitle className="font-heading text-lg">Precentage Work Order</CardTitle>
                <CardDescription>Data yearly</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-5">
                <div className="relative flex h-[220px] w-[220px] items-center justify-center">
                  <svg width="220" height="220" viewBox="0 0 220 220" className="-rotate-90">
                    <circle cx="110" cy="110" r="70" fill="none" stroke="#e5e7eb" strokeWidth="28" />
                    {segments.map((segment) => (
                      <circle
                        key={segment.label}
                        cx="110"
                        cy="110"
                        r="70"
                        fill="none"
                        stroke={segment.color}
                        strokeWidth="28"
                        strokeLinecap="round"
                        strokeDasharray={segment.strokeDasharray}
                        strokeDashoffset={segment.strokeDashoffset}
                      />
                    ))}
                  </svg>
                  <div className="absolute text-center">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Total</p>
                    <p className="text-3xl font-bold">{totalOrders}</p>
                  </div>
                </div>

                <div className="grid w-full gap-3 text-sm">
                  {pieData.map((item) => (
                    <div key={item.label} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-800/70">
                      <div className="flex items-center gap-3">
                        <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span>{item.label}</span>
                      </div>
                      <strong>{item.value}</strong>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border bg-white shadow-sm dark:bg-slate-900">
              <CardContent className="flex items-center justify-between p-5">
                <div>
                  <p className="text-sm text-muted-foreground">Database Mode</p>
                  <p className="mt-2 text-xl font-bold tracking-tight">Dummy Preview</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                  <Database className="h-5 w-5 text-emerald-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
