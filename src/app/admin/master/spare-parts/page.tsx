import { requireAdminAccess } from '@/lib/auth';
import { db } from '@/lib/db';
import { AdminShell } from '@/components/admin-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { createSparePartAction } from '@/app/admin/actions';
import { DataTable } from '@/components/ui/data-table';

export default async function AdminMasterSparePartsPage() {
  await requireAdminAccess();
  const parts = await db.sparePart.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <AdminShell title="Master Spare Parts" description="Kelola stock dan part master.">
      <div className="grid gap-6 xl:grid-cols-[380px_1fr]">
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

        <Card><CardHeader><CardTitle>Spare Parts</CardTitle></CardHeader><CardContent>
          <DataTable data={parts} searchKeys={['partCode','name','unit']} searchPlaceholder="Cari spare part..." columns={[
            { key: 'partCode', header: 'Part Code' },
            { key: 'name', header: 'Part Name' },
            { key: 'unit', header: 'Unit' },
            { key: 'stockQty', header: 'Stock', render: (part) => String(part.stockQty) },
            { key: 'minStockQty', header: 'Min Stock', render: (part) => String(part.minStockQty) },
          ]} />
        </CardContent></Card>
      </div>
    </AdminShell>
  );
}
