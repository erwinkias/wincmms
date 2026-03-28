import Link from 'next/link';
import { LayoutDashboard, Package, Settings2, ShieldUser, Wrench } from 'lucide-react';
import { getSession } from '@/lib/session';
import { logoutAction } from '@/app/logout/actions';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { AppFooter } from '@/components/app-footer';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/master/users', label: 'Users', icon: ShieldUser },
  { href: '/admin/master/sites', label: 'Sites', icon: Settings2 },
  { href: '/admin/master/assets', label: 'Assets', icon: Wrench },
  { href: '/admin/master/spare-parts', label: 'Spare Parts', icon: Package },
];

export async function AdminShell({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  const session = await getSession();

  return (
    <div className="layout-shell">
      <div className="layout-main">
        <aside className="sidebar">
          <div className="sidebar-head">
            <h1 className="font-heading text-2xl font-bold">WinCMMS</h1>
            <p className="text-sm muted">Admin Control Center</p>
          </div>
          <nav className="sidebar-nav">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href} className="sidebar-link text-sm font-semibold">
                  <Icon size={16} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        <div className="content-shell">
          <header className="navbar">
            <div className="navbar-inner">
              <div>
                <h2 className="font-heading" style={{ margin: 0, fontSize: 24, fontWeight: 700 }}>{title}</h2>
                <p className="text-sm muted" style={{ margin: '6px 0 0' }}>{description}</p>
              </div>
              <div className="inline-actions">
                <ThemeToggle />
                <div className="user-info text-sm">
                  <div className="font-semibold">{session?.user.name}</div>
                  <div className="muted">{session?.user.role}</div>
                </div>
                <form action={logoutAction}>
                  <Button variant="outline" type="submit">Logout</Button>
                </form>
              </div>
            </div>
          </header>

          <main className="main-content">{children}</main>
          <AppFooter />
        </div>
      </div>
    </div>
  );
}
