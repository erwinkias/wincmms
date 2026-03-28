'use server';

import { redirect } from 'next/navigation';
import { Prisma } from '@prisma/client';
import { registerUser } from '@/lib/auth';
import { hashPassword } from '@/lib/password';
import { registerSchema } from '@/lib/validations';

export async function registerAction(formData: FormData) {
  const parsed = registerSchema.safeParse({
    email: formData.get('email'),
    username: formData.get('username'),
    phone: formData.get('phone'),
    password: formData.get('password'),
  });

  if (!parsed.success) {
    redirect('/register?error=invalid');
  }

  try {
    await registerUser({
      email: parsed.data.email,
      username: parsed.data.username,
      name: parsed.data.username,
      phone: parsed.data.phone,
      passwordHash: await hashPassword(parsed.data.password),
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      redirect('/register?error=exists');
    }
    redirect('/register?error=failed');
  }

  redirect('/login?registered=1');
}
