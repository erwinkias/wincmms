import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="auth-shell">
      <div className="auth-card">
        <h1>WinCMMS</h1>
        <p className="muted">
          Pondasi awal CMMS untuk maintenance, asset tracking, work order, dan preventive maintenance.
        </p>
        <div className="notice" style={{ margin: '16px 0' }}>
          MVP1 sekarang sudah punya auth base, role base, dan halaman admin/master awal.
        </div>
        <div className="inline-actions">
          <Link className="btn btn-primary" href="/login">Masuk</Link>
          <Link className="btn btn-secondary" href="/admin">Buka Admin</Link>
        </div>
      </div>
    </main>
  );
}
