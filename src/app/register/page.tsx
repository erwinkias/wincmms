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
    <main className="page-center">
      <div className="top-right"><ThemeToggle /></div>
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-heading font-bold">Register WinCMMS</CardTitle>
          <CardDescription>Buat akun baru dengan role default requester.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={registerAction} className="stack stack-4">
            <div className="stack stack-2"><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" required /></div>
            <div className="stack stack-2"><Label htmlFor="username">Username</Label><Input id="username" name="username" required /></div>
            <div className="stack stack-2"><Label htmlFor="phone">Phone Number</Label><Input id="phone" name="phone" required /></div>
            <div className="stack stack-2"><Label htmlFor="password">Password</Label><Input id="password" name="password" type="password" required /></div>
            {params.error ? <p className="text-sm text-danger">Registrasi gagal atau akun sudah ada.</p> : null}
            <Button className="w-full" type="submit">Register</Button>
          </form>
          <div className="text-sm muted" style={{ marginTop: 24 }}>
            Sudah punya akun? <Link href="/login">Login</Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
