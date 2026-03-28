import { UserRole } from '@prisma/client';
import { AdminShell } from '@/components/admin-shell';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { db } from '@/lib/db';
import { requireAdminAccess } from '@/lib/auth';

export default async function AdminDashboardPage() {
  await requireAdminAccess();

  const [usersCount, sitesCount, assetsCount, partsCount, latestUsers] = await Promise.all([
    db.user.count(),
    db.site.count(),
    db.asset.count(),
    db.sparePart.count(),
    db.user.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
  ]);

  return (
    <AdminShell title="Dashboard" description="Ringkasan operasional WinCMMS dengan data real dari database.">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <Card><CardHeader><CardDescription>Total Users</CardDescription><CardTitle className="text-3xl">{usersCount}</CardTitle></CardHeader></Card>
        <Card><CardHeader><CardDescription>Total Sites</CardDescription><CardTitle className="text-3xl">{sitesCount}</CardTitle></CardHeader></Card>
        <Card><CardHeader><CardDescription>Total Assets</CardDescription><CardTitle className="text-3xl">{assetsCount}</CardTitle></CardHeader></Card>
        <Card><CardHeader><CardDescription>Total Spare Parts</CardDescription><CardTitle className="text-3xl">{partsCount}</CardTitle></CardHeader></Card>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Latest Users</CardTitle>
            <CardDescription>Akun terbaru yang masuk ke sistem.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {latestUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell><Badge variant={user.role === UserRole.ADMIN ? 'default' : 'secondary'}>{user.role}</Badge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Notes</CardTitle>
            <CardDescription>Status fondasi MVP saat ini.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>• Auth sudah terhubung ke tabel User Prisma</p>
            <p>• Register membuat akun role REQUESTER</p>
            <p>• Master data users, sites, assets, dan spare parts sudah pakai database</p>
            <p>• Dark theme aktif dan layout admin sudah lengkap</p>
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}
