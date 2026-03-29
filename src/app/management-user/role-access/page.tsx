import Link from 'next/link';
import { AdminShell } from '@/components/admin-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { requireAdminAccess } from '@/lib/auth';

const managementUserLinks = [
  { href: '/management-user/list-user', label: 'List User' },
  { href: '/management-user/role-access', label: 'Role Access' },
  { href: '/management-user/permission-role-access', label: 'Permission Role & Access' },
];

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
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <Card className="rounded-2xl"><CardHeader><CardTitle>Menu</CardTitle></CardHeader><CardContent className="space-y-2">{managementUserLinks.map((item) => <Link key={item.href} href={item.href} className={`block rounded-xl px-3 py-2 text-sm ${item.href === '/management-user/role-access' ? 'bg-slate-100 font-medium dark:bg-slate-800' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}>{item.label}</Link>)}</CardContent></Card>
        <Card className="rounded-2xl"><CardHeader><CardTitle>Role Access</CardTitle></CardHeader><CardContent><div className="space-y-3">{roles.map((item) => <div key={item.role} className="rounded-xl border p-4"><div className="font-medium">{item.role}</div><div className="text-sm text-muted-foreground">{item.access}</div></div>)}</div></CardContent></Card>
      </div>
    </AdminShell>
  );
}
