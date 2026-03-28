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
      <div className="card-grid-4">
        <Card><CardHeader><CardDescription>Total Users</CardDescription><CardTitle className="text-3xl font-heading">{usersCount}</CardTitle></CardHeader></Card>
        <Card><CardHeader><CardDescription>Total Sites</CardDescription><CardTitle className="text-3xl font-heading">{sitesCount}</CardTitle></CardHeader></Card>
        <Card><CardHeader><CardDescription>Total Assets</CardDescription><CardTitle className="text-3xl font-heading">{assetsCount}</CardTitle></CardHeader></Card>
        <Card><CardHeader><CardDescription>Total Spare Parts</CardDescription><CardTitle className="text-3xl font-heading">{partsCount}</CardTitle></CardHeader></Card>
      </div>

      <div className="card-grid-2" style={{ marginTop: 24 }}>
        <Card>
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
                    <TableCell><Badge>{user.role === UserRole.ADMIN ? 'ADMIN' : user.role}</Badge></TableCell>
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
          <CardContent className="stack stack-3 muted text-sm">
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
