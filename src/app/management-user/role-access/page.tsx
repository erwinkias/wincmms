import { AdminShell } from '@/components/admin-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { requireAdminAccess } from '@/lib/auth';

const roles = [
  { role: 'ADMIN', access: 'Full system access' },
  { role: 'SUPERVISOR', access: 'Operational and approval access' },
  { role: 'TECHNICIAN', access: 'Assigned work order access' },
  { role: 'REQUESTER', access: 'Request creation and tracking' },
];

export default async function RoleAccessPage() {
  await requireAdminAccess();

  return (
    <AdminShell title="Role Access" description="Ringkasan akses untuk setiap role user.">
      <Card className="rounded-2xl"><CardHeader><CardTitle>Role Access</CardTitle></CardHeader><CardContent>
        <DataTable
          title="Role Access Table"
          searchPlaceholder="Cari role atau access..."
          data={roles}
          searchKeys={['role', 'access']}
          columns={[
            { key: 'role', header: 'Role' },
            { key: 'access', header: 'Access Description' },
          ]}
        />
      </CardContent></Card>
    </AdminShell>
  );
}
