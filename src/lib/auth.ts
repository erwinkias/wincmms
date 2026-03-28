import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { UserRole } from '@prisma/client';
import { db } from '@/lib/db';
import { verifyPassword } from '@/lib/password';

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  username: string;
  role: UserRole;
};

const SESSION_COOKIE = 'wincmms_session';

export async function loginWithCredentials(identifier: string, password: string) {
  const user = await db.user.findFirst({
    where: {
      OR: [{ email: identifier }, { username: identifier }],
      isActive: true,
    },
  });

  if (!user) return false;

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) return false;

  const cookieStore = await cookies();
  cookieStore.set(
    SESSION_COOKIE,
    JSON.stringify({
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      role: user.role,
    }),
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

export async function registerUser(input: {
  email: string;
  username: string;
  name: string;
  phone?: string;
  passwordHash: string;
}) {
  return db.user.create({
    data: {
      email: input.email,
      username: input.username,
      name: input.name,
      phone: input.phone,
      passwordHash: input.passwordHash,
      role: UserRole.REQUESTER,
    },
  });
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

export async function requireLogin() {
  const user = await getSessionUser();
  if (!user) redirect('/login');
  return user;
}

export async function requireAdminAccess() {
  const user = await requireLogin();
  if (user.role !== UserRole.ADMIN && user.role !== UserRole.SUPERVISOR) redirect('/dashboard');
  return user;
}
