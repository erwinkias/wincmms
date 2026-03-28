import { AdminShell } from '@/components/admin-shell';
import { SimpleTable } from '@/components/simple-table';

const users = [
  { name: 'Admin WinCMMS', email: 'admin@wincmms.local', role: 'ADMIN', status: 'Active' },
  { name: 'Supervisor WinCMMS', email: 'supervisor@wincmms.local', role: 'SUPERVISOR', status: 'Active' },
  { name: 'Technician WinCMMS', email: 'tech@wincmms.local', role: 'TECHNICIAN', status: 'Active' },
  { name: 'Requester Line A', email: 'requester@wincmms.local', role: 'REQUESTER', status: 'Inactive' },
];

export default function AdminMasterUsersPage() {
  return (
    <AdminShell
      title="Master Users"
      description="Kelola user, peran, dan status akses sistem."
    >
      <div className="card" style={{ marginBottom: 16 }}>
        <h3>Draft Scope</h3>
        <p className="muted">Tahap awal ini masih mock UI untuk review struktur halaman admin/master.</p>
      </div>
      <SimpleTable
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'email', label: 'Email' },
          { key: 'role', label: 'Role' },
          { key: 'status', label: 'Status' },
        ]}
        rows={users}
      />
    </AdminShell>
  );
}
