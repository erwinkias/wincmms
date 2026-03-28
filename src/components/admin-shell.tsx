import Link from 'next/link';
import { getSession } from '@/lib/session';

const navItems = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/master/users', label: 'Master Users' },
  { href: '/admin/master/sites', label: 'Master Sites' },
  { href: '/admin/master/assets', label: 'Master Assets' },
  { href: '/admin/master/spare-parts', label: 'Master Spare Parts' },
];

export async function AdminShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <div className="layout">
      <header className="topbar">
        <div>
          <div className="brand">WinCMMS Admin</div>
          <div className="muted">Role: {(session?.user as any)?.role ?? 'GUEST'}</div>
        </div>
        <div className="inline-actions">
          <Link className="btn btn-secondary" href="/api/auth/signout">Logout</Link>
        </div>
      </header>
      <div className="container">
        <aside className="sidebar">
          <div className="sidebar-section">
            <div className="sidebar-title">Navigation</div>
            <nav className="nav-list">
              {navItems.map((item) => (
                <Link className="nav-item" key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </aside>
        <main className="content">
          <div className="page-header">
            <div>
              <h1>{title}</h1>
              <p>{description}</p>
            </div>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
