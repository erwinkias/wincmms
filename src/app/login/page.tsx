import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { getSession } from '@/lib/session';
import { loginAction } from './actions';
import { ThemeToggle } from '@/components/theme-toggle';

export default async function LoginPage({ searchParams }: { searchParams?: Promise<{ error?: string; registered?: string }> }) {
  const session = await getSession();
  if (session?.user) redirect('/admin');
  const params = (await searchParams) ?? {};

  return (
    <main className="page-center">
      <div className="top-right"><ThemeToggle /></div>
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-heading font-bold">Masuk ke WinCMMS</CardTitle>
          <CardDescription>Login menggunakan email atau username.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={loginAction} className="stack stack-4">
            <div className="stack stack-2">
              <Label htmlFor="identifier">Email / Username</Label>
              <Input id="identifier" name="identifier" placeholder="admin@wincmms.local atau admin" required />
            </div>
            <div className="stack stack-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="••••••••" required />
            </div>
            {params.error ? <p className="text-sm text-danger">Login gagal. Cek kredensial Bos.</p> : null}
            {params.registered ? <p className="text-sm text-success">Registrasi berhasil. Silakan login.</p> : null}
            <Button className="w-full" type="submit">Login</Button>
          </form>
          <div className="inline-actions text-sm muted" style={{ justifyContent: 'space-between', marginTop: 24 }}>
            <Link href="/register">Register</Link>
            <Link href="/forgot-password">Forgot password</Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
