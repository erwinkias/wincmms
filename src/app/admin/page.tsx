import { AdminShell } from '@/components/admin-shell';
import { StatCard } from '@/components/stat-card';
import { SimpleTable } from '@/components/simple-table';
import { requireAdminAccess } from '@/lib/auth';

const pendingWorkOrders = [
  { wo: 'WO-2026-001', asset: 'Boiler Feed Pump', priority: 'High', status: 'Open' },
  { wo: 'WO-2026-002', asset: 'Air Compressor #2', priority: 'Critical', status: 'Assigned' },
  { wo: 'WO-2026-003', asset: 'Cooling Tower Fan', priority: 'Medium', status: 'Waiting Part' },
];

export default async function AdminDashboardPage() {
  await requireAdminAccess();

  return (
    <AdminShell
      title="Admin Dashboard"
      description="Ringkasan awal operasional dan pintu masuk ke master data WinCMMS."
    >
      <div className="grid grid-4">
        <StatCard title="Open Work Orders" value="18" subtitle="6 overdue, perlu follow-up" />
        <StatCard title="Active Assets" value="124" subtitle="12 critical assets" />
        <StatCard title="PM Due This Week" value="21" subtitle="5 sudah overdue" />
        <StatCard title="Low Stock Parts" value="7" subtitle="2 item level kritis" />
      </div>

      <div className="grid grid-2" style={{ marginTop: 16 }}>
        <div className="card">
          <h3>Quick Access</h3>
          <p className="muted">Mulai dari master data supaya pondasi aplikasi rapi.</p>
          <div className="inline-actions" style={{ marginTop: 14 }}>
            <a className="btn btn-primary" href="/admin/master/users">Kelola Users</a>
            <a className="btn btn-secondary" href="/admin/master/sites">Kelola Sites</a>
            <a className="btn btn-secondary" href="/admin/master/assets">Kelola Assets</a>
          </div>
        </div>

        <div className="card">
          <h3>Role Access Summary</h3>
          <ul className="muted" style={{ margin: 0, paddingLeft: 18 }}>
            <li>Admin: full access ke seluruh menu admin</li>
            <li>Supervisor: akses area admin dan master operasional</li>
            <li>Technician: tidak boleh masuk area admin</li>
          </ul>
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <SimpleTable
          columns={[
            { key: 'wo', label: 'WO No' },
            { key: 'asset', label: 'Asset' },
            { key: 'priority', label: 'Priority' },
            { key: 'status', label: 'Status' },
          ]}
          rows={pendingWorkOrders}
        />
      </div>
    </AdminShell>
  );
}
