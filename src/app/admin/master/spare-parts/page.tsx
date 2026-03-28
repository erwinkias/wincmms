import { requireAdminAccess } from '@/lib/auth';
import { db } from '@/lib/db';
import { DataTableCard } from '@/components/data-table-card';
import { AdminShell } from '@/components/admin-shell';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { createSparePartAction } from '@/app/admin/actions';

export default async function AdminMasterSparePartsPage() {
  await requireAdminAccess();
  const parts = await db.sparePart.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <AdminShell title="Master Spare Parts" description="Kelola stock dan part master.">
      <div className="form-grid-2">
        <Card>
          <CardHeader><CardTitle>Add Spare Part</CardTitle></CardHeader>
          <CardContent>
            <form action={createSparePartAction} className="space-y-4">
              <div className="space-y-2"><Label htmlFor="partCode">Part Code</Label><Input id="partCode" name="partCode" required /></div>
              <div className="space-y-2"><Label htmlFor="name">Name</Label><Input id="name" name="name" required /></div>
              <div className="space-y-2"><Label htmlFor="unit">Unit</Label><Input id="unit" name="unit" required /></div>
              <div className="space-y-2"><Label htmlFor="stockQty">Stock Qty</Label><Input id="stockQty" name="stockQty" type="number" required /></div>
              <div className="space-y-2"><Label htmlFor="minStockQty">Min Stock Qty</Label><Input id="minStockQty" name="minStockQty" type="number" required /></div>
              <Button className="w-full" type="submit">Save Spare Part</Button>
            </form>
          </CardContent>
        </Card>

        <DataTableCard title="Spare Parts" description="Data part real dari database.">
          <Table>
            <TableHeader><TableRow><TableHead>Part Code</TableHead><TableHead>Name</TableHead><TableHead>Unit</TableHead><TableHead>Stock</TableHead><TableHead>Min Stock</TableHead></TableRow></TableHeader>
            <TableBody>
              {parts.map((part) => (
                <TableRow key={part.id}><TableCell>{part.partCode}</TableCell><TableCell>{part.name}</TableCell><TableCell>{part.unit}</TableCell><TableCell>{String(part.stockQty)}</TableCell><TableCell>{String(part.minStockQty)}</TableCell></TableRow>
              ))}
            </TableBody>
          </Table>
        </DataTableCard>
      </div>
    </AdminShell>
  );
}
