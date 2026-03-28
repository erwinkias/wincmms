import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export type AppRole = 'ADMIN' | 'SUPERVISOR' | 'TECHNICIAN' | 'REQUESTER';

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: AppRole;
};

const demoUsers = [
  { id: '1', name: 'Admin WinCMMS', email: 'admin@wincmms.local', password: 'admin123', role: 'ADMIN' as const },
  { id: '2', name: 'Supervisor WinCMMS', email: 'supervisor@wincmms.local', password: 'supervisor123', role: 'SUPERVISOR' as const },
  { id: '3', name: 'Technician WinCMMS', email: 'tech@wincmms.local', password: 'tech12345', role: 'TECHNICIAN' as const },
];

const SESSION_COOKIE = 'wincmms_session';

export async function loginWithCredentials(email: string, password: string) {
  const user = demoUsers.find((item) => item.email === email && item.password === password);
  if (!user) return false;

  const cookieStore = await cookies();
  cookieStore.set(
    SESSION_COOKIE,
    JSON.stringify({ id: user.id, name: user.name, email: user.email, role: user.role }),
    {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      secure: false,
      maxAge: 60 * 60 * 24,
    },
  );

  return true;
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(SESSION_COOKIE)?.value;
  if (!raw) return null;

  try {
    return JSON.parse(raw) as SessionUser;
  } catch {
    return null;
  }
}

export async function requireAdminAccess() {
  const user = await getSessionUser();
  if (!user) {
    redirect('/login');
  }

  if (user.role !== 'ADMIN' && user.role !== 'SUPERVISOR') {
    redirect('/login');
  }

  return user;
}
