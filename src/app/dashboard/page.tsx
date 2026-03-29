import { ArrowUpRight, ClipboardList, Gauge, Layers3, PackageSearch, Settings2, Wrench } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AdminShell } from '@/components/admin-shell';
import { DashboardFilters } from '@/components/dashboard-filters';
import { getSessionUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

const summaryDataByPlant = {
  all: [
    { label: 'Work Order Closed', value: '17,399', change: '+8.4%', icon: ClipboardList },
    { label: 'Active Work Orders', value: '835', change: '-2.1%', icon: Settings2 },
    { label: 'Registered Assets', value: '1,566', change: '+3.7%', icon: Wrench },
    { label: 'Spare Part Items', value: '16,907', change: '+5.2%', icon: PackageSearch },
  ],
  'main-plant': [
    { label: 'Work Order Closed', value: '9,842', change: '+5.1%', icon: ClipboardList },
    { label: 'Active Work Orders', value: '412', change: '+1.8%', icon: Settings2 },
    { label: 'Registered Assets', value: '924', change: '+2.7%', icon: Wrench },
    { label: 'Spare Part Items', value: '8,210', change: '+4.1%', icon: PackageSearch },
  ],
  warehouse: [
    { label: 'Work Order Closed', value: '2,304', change: '+1.7%', icon: ClipboardList },
    { label: 'Active Work Orders', value: '104', change: '-0.4%', icon: Settings2 },
    { label: 'Registered Assets', value: '168', change: '+1.1%', icon: Wrench },
    { label: 'Spare Part Items', value: '6,482', change: '+2.0%', icon: PackageSearch },
  ],
  'utility-area': [
    { label: 'Work Order Closed', value: '5,253', change: '+6.8%', icon: ClipboardList },
    { label: 'Active Work Orders', value: '319', change: '-3.2%', icon: Settings2 },
    { label: 'Registered Assets', value: '474', change: '+4.5%', icon: Wrench },
    { label: 'Spare Part Items', value: '2,215', change: '+3.4%', icon: PackageSearch },
  ],
} as const;

const trendDataByPlant = {
  all: [
    { label: 'Machine Repair', open: 20, done: 76, cancel: 4 },
    { label: 'Utility Service', open: 14, done: 58, cancel: 2 },
    { label: 'Building Repair', open: 10, done: 40, cancel: 1 },
    { label: 'Installation Work', open: 8, done: 32, cancel: 0 },
    { label: 'Fabrication', open: 12, done: 51, cancel: 3 },
    { label: 'Inspection', open: 6, done: 28, cancel: 1 },
  ],
  'main-plant': [
    { label: 'Machine Repair', open: 12, done: 52, cancel: 2 },
    { label: 'Utility Service', open: 8, done: 38, cancel: 1 },
    { label: 'Building Repair', open: 5, done: 18, cancel: 1 },
    { label: 'Installation Work', open: 4, done: 17, cancel: 0 },
    { label: 'Fabrication', open: 6, done: 23, cancel: 1 },
    { label: 'Inspection', open: 3, done: 11, cancel: 0 },
  ],
  warehouse: [
    { label: 'Machine Repair', open: 2, done: 8, cancel: 0 },
    { label: 'Utility Service', open: 1, done: 5, cancel: 0 },
    { label: 'Building Repair', open: 2, done: 7, cancel: 0 },
    { label: 'Installation Work', open: 1, done: 4, cancel: 0 },
    { label: 'Fabrication', open: 2, done: 5, cancel: 1 },
    { label: 'Inspection', open: 1, done: 3, cancel: 0 },
  ],
  'utility-area': [
    { label: 'Machine Repair', open: 6, done: 16, cancel: 1 },
    { label: 'Utility Service', open: 5, done: 15, cancel: 1 },
    { label: 'Building Repair', open: 3, done: 15, cancel: 0 },
    { label: 'Installation Work', open: 2, done: 11, cancel: 0 },
    { label: 'Fabrication', open: 4, done: 12, cancel: 1 },
    { label: 'Inspection', open: 2, done: 9, cancel: 1 },
  ],
} as const;

const rightStatsByPlant = {
  all: [
    { label: 'Preventive Forms', value: '64,356', icon: Gauge },
    { label: 'Monthly Overtime', value: '5,797 hrs', icon: Layers3 },
  ],
  'main-plant': [
    { label: 'Preventive Forms', value: '32,110', icon: Gauge },
    { label: 'Monthly Overtime', value: '2,984 hrs', icon: Layers3 },
  ],
  warehouse: [
    { label: 'Preventive Forms', value: '11,482', icon: Gauge },
    { label: 'Monthly Overtime', value: '624 hrs', icon: Layers3 },
  ],
  'utility-area': [
    { label: 'Preventive Forms', value: '20,764', icon: Gauge },
    { label: 'Monthly Overtime', value: '1,903 hrs', icon: Layers3 },
  ],
} as const;

function buildPercentages(trendData: ReadonlyArray<{ open: number; done: number; cancel: number }>) {
  const totals = trendData.reduce(
    (acc, item) => ({
      done: acc.done + item.done,
      open: acc.open + item.open,
      cancel: acc.cancel + item.cancel,
    }),
    { done: 0, open: 0, cancel: 0 },
  );
  const all = totals.done + totals.open + totals.cancel || 1;
  return [
    { label: 'Done', value: Math.round((totals.done / all) * 100), color: 'bg-slate-900 dark:bg-slate-100' },
    { label: 'Open', value: Math.round((totals.open / all) * 100), color: 'bg-slate-400' },
    { label: 'Cancel', value: Math.round((totals.cancel / all) * 100), color: 'bg-slate-200 dark:bg-slate-700' },
  ];
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams?: Promise<{ plant?: keyof typeof summaryDataByPlant; month?: string }>;
}) {
  const user = await getSessionUser();
  if (!user) redirect('/login');

  const params = (await searchParams) ?? {};
  const selectedPlant = params.plant && params.plant in summaryDataByPlant ? params.plant : 'all';
  const selectedMonth = params.month ?? '2026-03';

  const summaryCards = summaryDataByPlant[selectedPlant];
  const trendData = trendDataByPlant[selectedPlant];
  const rightStats = rightStatsByPlant[selectedPlant];
  const percentages = buildPercentages(trendData);

  const [year, monthNumber] = selectedMonth.split('-');
  const monthDate = new Date(Number(year), Number(monthNumber) - 1, 1);
  const selectedMonthLabel = monthDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <AdminShell title="Dashboard" description="Operational overview dengan gaya clean enterprise dan sentuhan industrial ringan.">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.26em] text-slate-400">Operations Overview</p>
            <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Maintenance Control Dashboard</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Good morning, {user.name}. Ringkasan untuk {selectedPlant.replace('-', ' ')} pada {selectedMonthLabel}.
            </p>
          </div>

          <DashboardFilters />
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.label} className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{item.label}</p>
                      <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{item.value}</p>
                    </div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    <ArrowUpRight className="h-3.5 w-3.5" /> {item.change} vs last month
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
          <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div>
                <CardTitle className="font-heading text-lg">Work Order Distribution</CardTitle>
                <CardDescription>Dummy data preview untuk performance pekerjaan tahunan.</CardDescription>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-slate-900 dark:bg-slate-100" /> Done</span>
                <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-slate-400" /> Open</span>
                <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-slate-200 dark:bg-slate-700" /> Cancel</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {trendData.map((row) => {
                const total = row.open + row.done + row.cancel || 1;
                return (
                  <div key={row.label} className="grid gap-3 md:grid-cols-[180px_1fr] md:items-center">
                    <div className="text-sm font-medium text-slate-700 dark:text-slate-200">{row.label}</div>
                    <div className="space-y-2">
                      <div className="flex h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                        <div className="bg-slate-900 dark:bg-slate-100" style={{ width: `${(row.done / total) * 100}%` }} />
                        <div className="bg-slate-400" style={{ width: `${(row.open / total) * 100}%` }} />
                        <div className="bg-slate-200 dark:bg-slate-700" style={{ width: `${(row.cancel / total) * 100}%` }} />
                      </div>
                      <div className="flex gap-4 text-xs text-slate-500 dark:text-slate-400">
                        <span>Done: {row.done}</span>
                        <span>Open: {row.open}</span>
                        <span>Cancel: {row.cancel}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <div className="space-y-4">
            {rightStats.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.label} className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <CardContent className="flex items-center justify-between p-5">
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{item.label}</p>
                      <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{item.value}</p>
                    </div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                      <Icon className="h-5 w-5" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <CardHeader>
                <CardTitle className="font-heading text-lg">Work Order Percentage</CardTitle>
                <CardDescription>Komposisi workload bulan berjalan.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  {percentages.map((item) => (
                    <div key={item.label} className={item.color} style={{ width: `${item.value}%` }} />
                  ))}
                </div>
                <div className="space-y-3">
                  {percentages.map((item) => (
                    <div key={item.label} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm dark:bg-slate-800/70">
                      <div className="flex items-center gap-3">
                        <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                        <span>{item.label}</span>
                      </div>
                      <strong>{item.value}%</strong>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
