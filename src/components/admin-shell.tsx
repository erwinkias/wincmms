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
    <div className="min-h-screen bg-muted/30">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 border-r bg-background lg:block">
          <div className="border-b px-6 py-5">
            <h1 className="font-[var(--font-heading)] text-2xl font-bold">WinCMMS</h1>
            <p className="text-sm text-muted-foreground">Admin Control Center</p>
          </div>
          <nav className="space-y-2 p-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-accent hover:text-foreground">
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur">
            <div className="flex items-center justify-between px-6 py-4">
              <div>
                <h2 className="font-[var(--font-heading)] text-xl font-semibold">{title}</h2>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
              <div className="flex items-center gap-3">
                <ThemeToggle />
                <div className="text-right text-sm">
                  <div className="font-medium">{session?.user.name}</div>
                  <div className="text-muted-foreground">{session?.user.role}</div>
                </div>
                <form action={logoutAction}>
                  <Button variant="outline" type="submit">Logout</Button>
                </form>
              </div>
            </div>
          </header>

          <main className="flex-1 p-6">{children}</main>
          <AppFooter />
        </div>
      </div>
    </div>
  );
}
