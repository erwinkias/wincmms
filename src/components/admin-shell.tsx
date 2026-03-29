'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Bell, ChevronDown, LayoutDashboard, Settings2, ShieldUser, Users2, Warehouse, MapPinned, KeyRound, Menu } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { AppFooter } from '@/components/app-footer';

type NavLeaf = { href: string; label: string; icon: React.ComponentType<{ className?: string }> };
type NavMenu = { title: string; icon: React.ComponentType<{ className?: string }>; items: NavLeaf[] };

const standaloneLinks: NavLeaf[] = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
];

const expandableMenus: NavMenu[] = [
  {
    title: 'Management User',
    icon: Users2,
    items: [
      { href: '/management-user/list-user', label: 'List User', icon: ShieldUser },
      { href: '/management-user/role-access', label: 'Role Access', icon: KeyRound },
      { href: '/management-user/permission-role-access', label: 'Permission Role & Access', icon: ShieldUser },
    ],
  },
  {
    title: 'Configuration',
    icon: Settings2,
    items: [
      { href: '/configuration/list-area', label: 'List Area', icon: MapPinned },
      { href: '/configuration/list-warehouse', label: 'List Warehouse', icon: Warehouse },
    ],
  },
];

function leafActive(href: string, pathname: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function menuActive(items: NavLeaf[], pathname: string) {
  return items.some((item) => leafActive(item.href, pathname));
}

export function AdminShell({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>(() => ({
    'Management User': pathname.startsWith('/management-user'),
    Configuration: pathname.startsWith('/configuration'),
  }));

  const activeMenuStates = useMemo(() => {
    return Object.fromEntries(expandableMenus.map((menu) => [menu.title, menuActive(menu.items, pathname)]));
  }, [pathname]);

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <div className="flex min-h-screen">
        <aside className="hidden w-[290px] shrink-0 border-r border-slate-200 bg-[#2a2c3f] text-slate-100 dark:border-slate-800 lg:flex lg:flex-col">
          <div className="border-b border-white/10 px-6 py-6">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">WinCMMS</p>
            <h1 className="mt-3 font-heading text-3xl font-bold">Control Panel</h1>
            <p className="mt-2 text-sm text-slate-400">Clean enterprise maintenance workspace.</p>
          </div>

          <nav className="flex-1 space-y-8 px-4 py-6">
            <div>
              <p className="px-3 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Administrator</p>
              <div className="mt-3 space-y-1">
                {standaloneLinks.map((item) => {
                  const Icon = item.icon;
                  const active = leafActive(item.href, pathname);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${active ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}

                {expandableMenus.map((menu) => {
                  const Icon = menu.icon;
                  const opened = openMenus[menu.title];
                  const active = activeMenuStates[menu.title];
                  return (
                    <div key={menu.title} className="rounded-2xl">
                      <button
                        type="button"
                        onClick={() => toggleMenu(menu.title)}
                        className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition ${active ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`}
                      >
                        <span className="flex items-center gap-3">
                          <Icon className="h-4 w-4" />
                          <span>{menu.title}</span>
                        </span>
                        <ChevronDown className={`h-4 w-4 transition-transform ${opened ? 'rotate-180' : ''}`} />
                      </button>

                      {opened ? (
                        <div className="mt-2 space-y-1 pl-4">
                          {menu.items.map((item) => {
                            const ChildIcon = item.icon;
                            const childActive = leafActive(item.href, pathname);
                            return (
                              <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm transition ${childActive ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`}
                              >
                                <ChildIcon className="h-4 w-4" />
                                <span>{item.label}</span>
                              </Link>
                            );
                          })}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          </nav>
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
                  <div className="text-sm font-semibold">Workspace</div>
                  <div className="text-xs text-muted-foreground">WinCMMS</div>
                </div>
                <Button variant="outline" className="rounded-xl" asChild>
                  <Link href="/login">Logout</Link>
                </Button>
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
