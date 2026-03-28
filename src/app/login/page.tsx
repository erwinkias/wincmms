import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';

export default async function LoginPage({
  searchParams,
}: {
  searchParams?: Promise<{ callbackUrl?: string }>;
}) {
  const session = await getSession();
  if (session?.user) {
    redirect('/admin');
  }

  const params = (await searchParams) ?? {};
  const callbackUrl = params.callbackUrl ?? '/admin';

  return (
    <main className="auth-shell">
      <div className="auth-card">
        <h1>Masuk ke WinCMMS</h1>
        <p className="muted">Gunakan akun demo untuk review auth + role base.</p>
        <div className="notice" style={{ margin: '16px 0' }}>
          Admin: admin@wincmms.local / admin123
          <br />
          Supervisor: supervisor@wincmms.local / supervisor123
          <br />
          Technician: tech@wincmms.local / tech12345
        </div>
        <form className="form-grid" method="post" action="/api/auth/callback/credentials">
          <input type="hidden" name="callbackUrl" value={callbackUrl} />
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="admin@wincmms.local" required />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" placeholder="••••••••" required />
          </div>
          <button className="btn btn-primary" type="submit">Login</button>
        </form>
      </div>
    </main>
  );
}
