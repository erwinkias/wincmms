import { requireAdminAccess } from '@/lib/auth';
import { db } from '@/lib/db';
import { AdminShell } from '@/components/admin-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { createUserAction } from '@/app/admin/actions';
import { DataTable } from '@/components/ui/data-table';

export default async function AdminMasterUsersPage() {
  await requireAdminAccess();
  const users = await db.user.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <AdminShell title="Master Users" description="Kelola user, role, dan akses aplikasi.">
      <div className="grid gap-6 xl:grid-cols-[380px_1fr]">
        <Card>
          <CardHeader><CardTitle>Add User</CardTitle></CardHeader>
          <CardContent>
            <form action={createUserAction} className="space-y-4">
              <div className="space-y-2"><Label htmlFor="name">Name</Label><Input id="name" name="name" required /></div>
              <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" required /></div>
              <div className="space-y-2"><Label htmlFor="username">Username</Label><Input id="username" name="username" required /></div>
              <div className="space-y-2"><Label htmlFor="phone">Phone</Label><Input id="phone" name="phone" /></div>
              <div className="space-y-2"><Label htmlFor="role">Role</Label><select id="role" name="role" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"><option>ADMIN</option><option>SUPERVISOR</option><option>TECHNICIAN</option><option>REQUESTER</option></select></div>
              <Button className="w-full" type="submit">Save User</Button>
            </form>
          </CardContent>
        </Card>

        <Card><CardHeader><CardTitle>Users</CardTitle></CardHeader><CardContent>
          <DataTable data={users} searchKeys={['name','email','username','role']} searchPlaceholder="Cari user..." columns={[
            { key: 'name', header: 'Name' },
            { key: 'email', header: 'Email' },
            { key: 'username', header: 'Username' },
            { key: 'role', header: 'Role' },
          ]} />
        </CardContent></Card>
      </div>
    </AdminShell>
  );
}
