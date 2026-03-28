import { requireAdminAccess } from '@/lib/auth';
import { db } from '@/lib/db';
import { DataTableCard } from '@/components/data-table-card';
import { AdminShell } from '@/components/admin-shell';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { createAssetAction } from '@/app/admin/actions';

export default async function AdminMasterAssetsPage() {
  await requireAdminAccess();
  const [assets, categories, sites] = await Promise.all([
    db.asset.findMany({ include: { category: true, site: true }, orderBy: { createdAt: 'desc' } }),
    db.assetCategory.findMany({ orderBy: { name: 'asc' } }),
    db.site.findMany({ orderBy: { name: 'asc' } }),
  ]);

  return (
    <AdminShell title="Master Assets" description="Kelola daftar asset dan statusnya.">
      <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
        <Card>
          <CardHeader><CardTitle>Add Asset</CardTitle></CardHeader>
          <CardContent>
            <form action={createAssetAction} className="space-y-4">
              <div className="space-y-2"><Label htmlFor="assetCode">Asset Code</Label><Input id="assetCode" name="assetCode" required /></div>
              <div className="space-y-2"><Label htmlFor="name">Name</Label><Input id="name" name="name" required /></div>
              <div className="space-y-2"><Label htmlFor="categoryId">Category</Label><select id="categoryId" name="categoryId" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">{categories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></div>
              <div className="space-y-2"><Label htmlFor="siteId">Site</Label><select id="siteId" name="siteId" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">{sites.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></div>
              <div className="space-y-2"><Label htmlFor="status">Status</Label><select id="status" name="status" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"><option>ACTIVE</option><option>DOWN</option><option>MAINTENANCE</option><option>RETIRED</option></select></div>
              <Button className="w-full" type="submit">Save Asset</Button>
            </form>
          </CardContent>
        </Card>

        <DataTableCard title="Assets" description="Asset yang tersimpan di database.">
          <Table>
            <TableHeader><TableRow><TableHead>Code</TableHead><TableHead>Name</TableHead><TableHead>Category</TableHead><TableHead>Site</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
            <TableBody>
              {assets.map((asset) => (
                <TableRow key={asset.id}><TableCell>{asset.assetCode}</TableCell><TableCell>{asset.name}</TableCell><TableCell>{asset.category.name}</TableCell><TableCell>{asset.site.name}</TableCell><TableCell>{asset.status}</TableCell></TableRow>
              ))}
            </TableBody>
          </Table>
        </DataTableCard>
      </div>
    </AdminShell>
  );
}
