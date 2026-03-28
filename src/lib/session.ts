import { getSessionUser } from '@/lib/auth';

export async function getSession() {
  const user = await getSessionUser();
  return user ? { user } : null;
}
