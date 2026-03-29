import { AdminShell } from '@/components/admin-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
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
      <Card className="rounded-2xl"><CardHeader><CardTitle>List Area</CardTitle></CardHeader><CardContent>
        <DataTable
          title="Area Table"
          searchPlaceholder="Cari area, code, site..."
          data={areas}
          searchKeys={['code', 'name', 'site']}
          columns={[
            { key: 'code', header: 'Code' },
            { key: 'name', header: 'Area Name' },
            { key: 'site', header: 'Site' },
          ]}
        />
      </CardContent></Card>
    </AdminShell>
  );
}
