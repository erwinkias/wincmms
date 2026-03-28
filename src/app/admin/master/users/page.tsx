import { requireAdminAccess } from '@/lib/auth';
import { db } from '@/lib/db';
import { DataTableCard } from '@/components/data-table-card';
import { AdminShell } from '@/components/admin-shell';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { createUserAction } from '@/app/admin/actions';

export default async function AdminMasterUsersPage() {
  await requireAdminAccess();
  const users = await db.user.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <AdminShell title="Master Users" description="Kelola user, role, dan akses aplikasi.">
      <div className="form-grid-2">
        <Card>
          <CardHeader><CardTitle>Add User</CardTitle></CardHeader>
          <CardContent>
            <form action={createUserAction} className="space-y-4">
              <div className="space-y-2"><Label htmlFor="name">Name</Label><Input id="name" name="name" required /></div>
              <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" required /></div>
              <div className="space-y-2"><Label htmlFor="username">Username</Label><Input id="username" name="username" required /></div>
              <div className="space-y-2"><Label htmlFor="phone">Phone</Label><Input id="phone" name="phone" /></div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <select id="role" name="role" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option>ADMIN</option><option>SUPERVISOR</option><option>TECHNICIAN</option><option>REQUESTER</option>
                </select>
              </div>
              <Button className="w-full" type="submit">Save User</Button>
            </form>
          </CardContent>
        </Card>

        <DataTableCard title="Users" description="Data user real dari database.">
          <Table>
            <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead>Username</TableHead><TableHead>Role</TableHead></TableRow></TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}><TableCell>{user.name}</TableCell><TableCell>{user.email}</TableCell><TableCell>{user.username}</TableCell><TableCell>{user.role}</TableCell></TableRow>
              ))}
            </TableBody>
          </Table>
        </DataTableCard>
      </div>
    </AdminShell>
  );
}
