import { AdminShell } from '@/components/admin-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { requireAdminAccess } from '@/lib/auth';

const areas = [
  { code: 'AREA-001', name: 'Production Area', site: 'Main Plant' },
  { code: 'AREA-002', name: 'Utility Area', site: 'Main Plant' },
  { code: 'AREA-003', name: 'Warehouse Zone', site: 'Warehouse' },
];

export default async function ListAreaPage() {
  await requireAdminAccess();

  return (
    <AdminShell title="List Area" description="Daftar area aktif di dalam sistem.">
      <Card className="rounded-2xl"><CardHeader><CardTitle>List Area</CardTitle></CardHeader><CardContent><div className="space-y-3">{areas.map((item) => <div key={item.code} className="rounded-xl border p-4"><div className="font-medium">{item.name}</div><div className="text-sm text-muted-foreground">{item.code} • {item.site}</div></div>)}</div></CardContent></Card>
    </AdminShell>
  );
}
