import Link from 'next/link';
import { Bell, LayoutDashboard, Package, Settings2, ShieldUser, Wrench, Menu } from 'lucide-react';
import { getSession } from '@/lib/session';
import { logoutAction } from '@/app/logout/actions';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { AppFooter } from '@/components/app-footer';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/master/users', label: 'Users', icon: ShieldUser },
  { href: '/admin/master/sites', label: 'Sites', icon: Settings2 },
  { href: '/admin/master/assets', label: 'Assets', icon: Wrench },
  { href: '/admin/master/spare-parts', label: 'Spare Parts', icon: Package },
];

export async function AdminShell({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  const session = await getSession();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <div className="flex min-h-screen">
        <aside className="hidden w-[280px] shrink-0 border-r border-slate-200 bg-slate-900 text-slate-100 dark:border-slate-800 dark:bg-slate-900 lg:flex lg:flex-col">
          <div className="border-b border-white/10 px-6 py-6">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">WinCMMS</p>
            <h1 className="mt-3 font-heading text-3xl font-bold">Control Panel</h1>
            <p className="mt-2 text-sm text-slate-400">Maintenance operations in one place.</p>
          </div>

          <nav className="flex-1 space-y-2 px-4 py-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-white/10 p-4">
            <div className="rounded-2xl bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Current role</p>
              <p className="mt-2 text-base font-semibold text-white">{session?.user.role}</p>
              <p className="mt-1 text-sm text-slate-400">{session?.user.email}</p>
            </div>
          </div>
        </aside>

        <div className="flex min-h-screen flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
            <div className="flex items-center justify-between gap-4 px-5 py-4 lg:px-8">
              <div className="flex items-center gap-3">
                <button className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 lg:hidden">
                  <Menu className="h-4 w-4" />
                </button>
                <div>
                  <h2 className="font-heading text-2xl font-bold tracking-tight">{title}</h2>
                  <p className="text-sm text-muted-foreground">{description}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <ThemeToggle />
                <button className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                  <Bell className="h-4 w-4" />
                </button>
                <div className="hidden text-right md:block">
                  <div className="text-sm font-semibold">{session?.user.name}</div>
                  <div className="text-xs text-muted-foreground">{session?.user.role}</div>
                </div>
                <form action={logoutAction}>
                  <Button variant="outline" className="rounded-xl">Logout</Button>
                </form>
              </div>
            </div>
          </header>

          <main className="flex-1 px-5 py-6 lg:px-8">{children}</main>
          <AppFooter />
        </div>
      </div>
    </div>
  );
}
