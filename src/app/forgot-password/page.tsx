import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';

export default function ForgotPasswordPage() {
  return (
    <main className="page-center">
      <div className="top-right"><ThemeToggle /></div>
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-heading font-bold">Forgot Password</CardTitle>
          <CardDescription>Placeholder reset password flow untuk MVP awal.</CardDescription>
        </CardHeader>
        <CardContent className="stack stack-4">
          <div className="stack stack-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="email@company.com" />
          </div>
          <Button className="w-full" type="button">Send reset link</Button>
          <p className="text-sm muted">Balik ke <Link href="/login">login</Link></p>
        </CardContent>
      </Card>
    </main>
  );
}
