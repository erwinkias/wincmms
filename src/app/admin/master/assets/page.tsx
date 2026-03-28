import { AdminShell } from '@/components/admin-shell';
import { SimpleTable } from '@/components/simple-table';
import { requireAdminAccess } from '@/lib/auth';

const assets = [
  { code: 'AST-001', name: 'Air Compressor #1', category: 'Utility', location: 'Compressor Room', status: 'ACTIVE' },
  { code: 'AST-002', name: 'Boiler Feed Pump', category: 'Pump', location: 'Boiler Area', status: 'MAINTENANCE' },
  { code: 'AST-003', name: 'Packing Conveyor', category: 'Conveyor', location: 'Line A', status: 'ACTIVE' },
];

export default async function AdminMasterAssetsPage() {
  await requireAdminAccess();

  return (
    <AdminShell
      title="Master Assets"
      description="Kelola daftar aset, kategori, dan status operasionalnya."
    >
      <SimpleTable
        columns={[
          { key: 'code', label: 'Asset Code' },
          { key: 'name', label: 'Asset Name' },
          { key: 'category', label: 'Category' },
          { key: 'location', label: 'Location' },
          { key: 'status', label: 'Status' },
        ]}
        rows={assets}
      />
    </AdminShell>
  );
}
