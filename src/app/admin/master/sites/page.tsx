import { requireAdminAccess } from '@/lib/auth';
import { db } from '@/lib/db';
import { DataTableCard } from '@/components/data-table-card';
import { AdminShell } from '@/components/admin-shell';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { createSiteAction } from '@/app/admin/actions';

export default async function AdminMasterSitesPage() {
  await requireAdminAccess();
  const sites = await db.site.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <AdminShell title="Master Sites" description="Kelola site utama operasional.">
      <div className="form-grid-2">
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

        <DataTableCard title="Sites" description="Site aktif yang tersimpan di database.">
          <Table>
            <TableHeader><TableRow><TableHead>Code</TableHead><TableHead>Name</TableHead><TableHead>Address</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
            <TableBody>
              {sites.map((site) => (
                <TableRow key={site.id}><TableCell>{site.code}</TableCell><TableCell>{site.name}</TableCell><TableCell>{site.address}</TableCell><TableCell>{site.isActive ? 'Active' : 'Inactive'}</TableCell></TableRow>
              ))}
            </TableBody>
          </Table>
        </DataTableCard>
      </div>
    </AdminShell>
  );
}
