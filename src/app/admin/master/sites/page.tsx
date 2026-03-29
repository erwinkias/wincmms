import { requireAdminAccess } from '@/lib/auth';
import { db } from '@/lib/db';
import { AdminShell } from '@/components/admin-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { createSiteAction } from '@/app/admin/actions';
import { DataTable } from '@/components/ui/data-table';

export default async function AdminMasterSitesPage() {
  await requireAdminAccess();
  const sites = await db.site.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <AdminShell title="Master Sites" description="Kelola site utama operasional.">
      <div className="grid gap-6 xl:grid-cols-[380px_1fr]">
        <Card>
          <CardHeader><CardTitle>Add Site</CardTitle></CardHeader>
          <CardContent>
            <form action={createSiteAction} className="space-y-4">
              <div className="space-y-2"><Label htmlFor="code">Code</Label><Input id="code" name="code" required /></div>
              <div className="space-y-2"><Label htmlFor="name">Name</Label><Input id="name" name="name" required /></div>
              <div className="space-y-2"><Label htmlFor="address">Address</Label><Input id="address" name="address" /></div>
              <Button className="w-full" type="submit">Save Site</Button>
            </form>
          </CardContent>
        </Card>

        <Card><CardHeader><CardTitle>Sites</CardTitle></CardHeader><CardContent>
          <DataTable data={sites} searchKeys={['code','name','address']} searchPlaceholder="Cari site..." columns={[
            { key: 'code', header: 'Code' },
            { key: 'name', header: 'Site Name' },
            { key: 'address', header: 'Address' },
            { key: 'isActive', header: 'Status', render: (site) => site.isActive ? 'Active' : 'Inactive' },
          ]} />
        </CardContent></Card>
      </div>
    </AdminShell>
  );
}
