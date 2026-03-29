import { AdminShell } from '@/components/admin-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { requireAdminAccess } from '@/lib/auth';

const permissions = [
  { role: 'ADMIN', resource: 'all', action: 'manage', allowed: 'Yes' },
  { role: 'SUPERVISOR', resource: 'work_orders', action: 'approve', allowed: 'Yes' },
  { role: 'TECHNICIAN', resource: 'work_orders', action: 'update_assigned', allowed: 'Yes' },
  { role: 'REQUESTER', resource: 'requests', action: 'create_view_own', allowed: 'Yes' },
];

export default async function PermissionRoleAccessPage() {
  await requireAdminAccess();

  return (
    <AdminShell title="Permission Role & Access" description="Daftar permission berdasarkan role.">
      <Card className="rounded-2xl"><CardHeader><CardTitle>Permission Role & Access</CardTitle></CardHeader><CardContent>
        <DataTable
          title="Permission Matrix"
          searchPlaceholder="Cari role, resource, action..."
          data={permissions}
          searchKeys={['role', 'resource', 'action', 'allowed']}
          columns={[
            { key: 'role', header: 'Role' },
            { key: 'resource', header: 'Resource' },
            { key: 'action', header: 'Action' },
            { key: 'allowed', header: 'Allowed' },
          ]}
        />
      </CardContent></Card>
    </AdminShell>
  );
}
