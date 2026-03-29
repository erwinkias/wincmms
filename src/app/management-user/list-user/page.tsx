import { AdminShell } from '@/components/admin-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/data-table';
import { requireAdminAccess } from '@/lib/auth';
import { db } from '@/lib/db';
import { CircleUserRound, Shield, UserCog, Wrench } from 'lucide-react';

function getRoleIcon(role: string) {
  if (role === 'ADMIN') return Shield;
  if (role === 'SUPERVISOR') return UserCog;
  if (role === 'TECHNICIAN') return Wrench;
  return CircleUserRound;
}

function getRoleBadgeClass(role: string) {
  if (role === 'ADMIN') return 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900';
  if (role === 'SUPERVISOR') return 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300';
  if (role === 'TECHNICIAN') return 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300';
  return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300';
}

export default async function ListUserPage() {
  await requireAdminAccess();
  const users = await db.user.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <AdminShell title="List User" description="Daftar seluruh user dalam sistem dengan tampilan data table yang lebih rapi dan informatif.">
      <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <CardHeader>
          <CardTitle className="font-heading text-lg">List User</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            title="User Directory"
            searchPlaceholder="Cari nama, email, username..."
            data={users}
            searchKeys={['name', 'email', 'username', 'role']}
            columns={[
              {
                key: 'name',
                header: 'User',
                render: (user) => {
                  const RoleIcon = getRoleIcon(user.role);
                  return (
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                        <RoleIcon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-medium text-slate-900 dark:text-white">{user.name}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">ID: {user.id.slice(0, 8)}...</div>
                      </div>
                    </div>
                  );
                },
              },
              { key: 'email', header: 'Email' },
              { key: 'username', header: 'Username' },
              { key: 'phone', header: 'Phone' },
              {
                key: 'role',
                header: 'Role',
                render: (user) => (
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getRoleBadgeClass(user.role)}`}>
                    {user.role}
                  </span>
                ),
              },
              {
                key: 'status',
                header: 'Status',
                render: (user) => (
                  <Badge variant="outline" className={user.isActive ? 'border-emerald-200 text-emerald-600 dark:border-emerald-900 dark:text-emerald-300' : 'border-slate-300 text-slate-500'}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                ),
              },
            ]}
          />
        </CardContent>
      </Card>
    </AdminShell>
  );
}
