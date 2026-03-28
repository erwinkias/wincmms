import { AdminShell } from '@/components/admin-shell';
import { SimpleTable } from '@/components/simple-table';
import { requireAdminAccess } from '@/lib/auth';

const parts = [
  { code: 'PRT-001', name: 'Bearing 6205', unit: 'pcs', stock: '24', min: '10' },
  { code: 'PRT-002', name: 'V-Belt A45', unit: 'pcs', stock: '8', min: '12' },
  { code: 'PRT-003', name: 'Hydraulic Oil', unit: 'liter', stock: '60', min: '20' },
];

export default async function AdminMasterSparePartsPage() {
  await requireAdminAccess();

  return (
    <AdminShell
      title="Master Spare Parts"
      description="Kelola katalog spare parts dan level stok minimum."
    >
      <SimpleTable
        columns={[
          { key: 'code', label: 'Part Code' },
          { key: 'name', label: 'Part Name' },
          { key: 'unit', label: 'Unit' },
          { key: 'stock', label: 'Stock' },
          { key: 'min', label: 'Min Stock' },
        ]}
        rows={parts}
      />
    </AdminShell>
  );
}
