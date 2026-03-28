'use server';

import { redirect } from 'next/navigation';
import { loginWithCredentials } from '@/lib/auth';

export async function loginAction(formData: FormData) {
  const email = String(formData.get('email') ?? '');
  const password = String(formData.get('password') ?? '');

  const ok = await loginWithCredentials(email, password);
  if (!ok) {
    redirect('/login?error=invalid');
  }

  redirect('/admin');
}
