import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import { loginAction } from './actions';

export default async function LoginPage({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string }>;
}) {
  const session = await getSession();
  if (session?.user) {
    redirect('/admin');
  }

  const params = (await searchParams) ?? {};

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
        {params.error === 'invalid' ? (
          <div className="badge red" style={{ marginBottom: 16 }}>Email atau password tidak valid.</div>
        ) : null}
        <form className="form-grid" action={loginAction}>
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
