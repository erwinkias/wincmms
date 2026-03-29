import { AdminShell } from '@/components/admin-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { requireAdminAccess } from '@/lib/auth';

const warehouses = [
  { code: 'WH-001', name: 'Main Warehouse', area: 'Production Area' },
  { code: 'WH-002', name: 'Utility Spare Part Store', area: 'Utility Area' },
  { code: 'WH-003', name: 'Raw Material Warehouse', area: 'Warehouse Zone' },
];

export default async function ListWarehousePage() {
  await requireAdminAccess();

  return (
    <AdminShell title="List Warehouse" description="Daftar warehouse per area/site.">
      <Card className="rounded-2xl"><CardHeader><CardTitle>List Warehouse</CardTitle></CardHeader><CardContent>
        <DataTable
          title="Warehouse Table"
          searchPlaceholder="Cari warehouse, code, area..."
          data={warehouses}
          searchKeys={['code', 'name', 'area']}
          columns={[
            { key: 'code', header: 'Code' },
            { key: 'name', header: 'Warehouse Name' },
            { key: 'area', header: 'Area' },
          ]}
        />
      </CardContent></Card>
    </AdminShell>
  );
}
