import { AdminShell } from '@/components/admin-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
      <Card className="rounded-2xl"><CardHeader><CardTitle>Role Access</CardTitle></CardHeader><CardContent><div className="space-y-3">{roles.map((item) => <div key={item.role} className="rounded-xl border p-4"><div className="font-medium">{item.role}</div><div className="text-sm text-muted-foreground">{item.access}</div></div>)}</div></CardContent></Card>
    </AdminShell>
  );
}
