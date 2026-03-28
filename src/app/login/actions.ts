'use server';

import { redirect } from 'next/navigation';
import { loginWithCredentials } from '@/lib/auth';
import { loginSchema } from '@/lib/validations';

export async function loginAction(formData: FormData) {
  const parsed = loginSchema.safeParse({
    identifier: formData.get('identifier'),
    password: formData.get('password'),
  });

  if (!parsed.success) {
    redirect('/login?error=invalid');
  }

  const ok = await loginWithCredentials(parsed.data.identifier, parsed.data.password);
  if (!ok) {
    redirect('/login?error=invalid');
  }

  redirect('/dashboard');
}
