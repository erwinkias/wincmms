import { AdminShell } from '@/components/admin-shell';
import { SimpleTable } from '@/components/simple-table';
import { requireAdminAccess } from '@/lib/auth';

const sites = [
  { code: 'JKT-PLANT', name: 'Jakarta Plant', address: 'Cakung, Jakarta', status: 'Active' },
  { code: 'BDG-WH', name: 'Bandung Warehouse', address: 'Rancaekek, Bandung', status: 'Active' },
];

export default async function AdminMasterSitesPage() {
  await requireAdminAccess();

  return (
    <AdminShell
      title="Master Sites"
      description="Kelola site utama operasional dan cakupan lokasi maintenance."
    >
      <SimpleTable
        columns={[
          { key: 'code', label: 'Code' },
          { key: 'name', label: 'Site Name' },
          { key: 'address', label: 'Address' },
          { key: 'status', label: 'Status' },
        ]}
        rows={sites}
      />
    </AdminShell>
  );
}
