import Link from 'next/link';
import { AdminShell } from '@/components/admin-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { requireAdminAccess } from '@/lib/auth';
import { db } from '@/lib/db';

const managementUserLinks = [
  { href: '/management-user/list-user', label: 'List User' },
  { href: '/management-user/role-access', label: 'Role Access' },
  { href: '/management-user/permission-role-access', label: 'Permission Role & Access' },
];

export default async function ListUserPage() {
  await requireAdminAccess();
  const users = await db.user.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <AdminShell title="Management User" description="Kelola user, role, dan permission access.">
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <Card className="rounded-2xl"><CardHeader><CardTitle>Menu</CardTitle></CardHeader><CardContent className="space-y-2">{managementUserLinks.map((item) => <Link key={item.href} href={item.href} className={`block rounded-xl px-3 py-2 text-sm ${item.href === '/management-user/list-user' ? 'bg-slate-100 font-medium dark:bg-slate-800' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}>{item.label}</Link>)}</CardContent></Card>
        <Card className="rounded-2xl"><CardHeader><CardTitle>List User</CardTitle></CardHeader><CardContent><div className="space-y-3">{users.map((user) => <div key={user.id} className="flex items-center justify-between rounded-xl border p-4"><div><div className="font-medium">{user.name}</div><div className="text-sm text-muted-foreground">{user.email} • {user.username}</div></div><div className="text-sm font-medium">{user.role}</div></div>)}</div></CardContent></Card>
      </div>
    </AdminShell>
  );
}
