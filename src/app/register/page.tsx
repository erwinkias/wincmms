import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { getSession } from '@/lib/session';
import { registerAction } from './actions';
import { ThemeToggle } from '@/components/theme-toggle';

export default async function RegisterPage({ searchParams }: { searchParams?: Promise<{ error?: string }> }) {
  const session = await getSession();
  if (session?.user) redirect('/admin');
  const params = (await searchParams) ?? {};

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/40 p-6">
      <div className="absolute right-6 top-6"><ThemeToggle /></div>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Register WinCMMS</CardTitle>
          <CardDescription>Buat akun baru dengan role default requester.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={registerAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" name="username" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            {params.error ? <p className="text-sm text-destructive">Registrasi gagal atau akun sudah ada.</p> : null}
            <Button className="w-full" type="submit">Register</Button>
          </form>
          <div className="mt-6 text-sm text-muted-foreground">
            Sudah punya akun? <Link href="/login">Login</Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
