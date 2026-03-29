import Link from 'next/link';
import { AdminShell } from '@/components/admin-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { requireAdminAccess } from '@/lib/auth';

const configurationLinks = [
  { href: '/configuration/list-area', label: 'List Area' },
  { href: '/configuration/list-warehouse', label: 'List Warehouse' },
];

const areas = [
  { code: 'AREA-001', name: 'Production Area', site: 'Main Plant' },
  { code: 'AREA-002', name: 'Utility Area', site: 'Main Plant' },
  { code: 'AREA-003', name: 'Warehouse Zone', site: 'Warehouse' },
];

export default async function ListAreaPage() {
  await requireAdminAccess();

  return (
    <AdminShell title="Configuration" description="Pengaturan area dan warehouse.">
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <Card className="rounded-2xl"><CardHeader><CardTitle>Menu</CardTitle></CardHeader><CardContent className="space-y-2">{configurationLinks.map((item) => <Link key={item.href} href={item.href} className={`block rounded-xl px-3 py-2 text-sm ${item.href === '/configuration/list-area' ? 'bg-slate-100 font-medium dark:bg-slate-800' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}>{item.label}</Link>)}</CardContent></Card>
        <Card className="rounded-2xl"><CardHeader><CardTitle>List Area</CardTitle></CardHeader><CardContent><div className="space-y-3">{areas.map((item) => <div key={item.code} className="rounded-xl border p-4"><div className="font-medium">{item.name}</div><div className="text-sm text-muted-foreground">{item.code} • {item.site}</div></div>)}</div></CardContent></Card>
      </div>
    </AdminShell>
  );
}
