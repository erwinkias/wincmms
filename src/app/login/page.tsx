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
    <main className="flex min-h-screen items-center justify-center bg-muted/40 p-6">
      <div className="absolute right-6 top-6"><ThemeToggle /></div>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Masuk ke WinCMMS</CardTitle>
          <CardDescription>Login menggunakan email atau username.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={loginAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="identifier">Email / Username</Label>
              <Input id="identifier" name="identifier" placeholder="admin@wincmms.local atau admin" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="••••••••" required />
            </div>
            {params.error ? <p className="text-sm text-destructive">Login gagal. Cek kredensial Bos.</p> : null}
            {params.registered ? <p className="text-sm text-emerald-600">Registrasi berhasil. Silakan login.</p> : null}
            <Button className="w-full" type="submit">Login</Button>
          </form>
          <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground">
            <Link href="/register">Register</Link>
            <Link href="/forgot-password">Forgot password</Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
