import Link from 'next/link';
import { AdminShell } from '@/components/admin-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { requireAdminAccess } from '@/lib/auth';

const managementUserLinks = [
  { href: '/management-user/list-user', label: 'List User' },
  { href: '/management-user/role-access', label: 'Role Access' },
  { href: '/management-user/permission-role-access', label: 'Permission Role & Access' },
];

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
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <Card className="rounded-2xl"><CardHeader><CardTitle>Menu</CardTitle></CardHeader><CardContent className="space-y-2">{managementUserLinks.map((item) => <Link key={item.href} href={item.href} className={`block rounded-xl px-3 py-2 text-sm ${item.href === '/management-user/permission-role-access' ? 'bg-slate-100 font-medium dark:bg-slate-800' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}>{item.label}</Link>)}</CardContent></Card>
        <Card className="rounded-2xl"><CardHeader><CardTitle>Permission Role & Access</CardTitle></CardHeader><CardContent><div className="space-y-3">{permissions.map((item, index) => <div key={index} className="rounded-xl border p-4"><div className="font-medium">{item.role}</div><div className="text-sm text-muted-foreground">Resource: {item.resource} • Action: {item.action} • Allowed: {item.allowed}</div></div>)}</div></CardContent></Card>
      </div>
    </AdminShell>
  );
}
