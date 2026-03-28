import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { z } from 'zod';

const demoUsers = [
  { id: '1', name: 'Admin WinCMMS', email: 'admin@wincmms.local', password: 'admin123', role: 'ADMIN' },
  { id: '2', name: 'Supervisor WinCMMS', email: 'supervisor@wincmms.local', password: 'supervisor123', role: 'SUPERVISOR' },
  { id: '3', name: 'Technician WinCMMS', email: 'tech@wincmms.local', password: 'tech12345', role: 'TECHNICIAN' },
];

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const parsed = z
          .object({
            email: z.email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        if (!parsed.success) return null;

        const user = demoUsers.find(
          (item) => item.email === parsed.data.email && item.password === parsed.data.password,
        );

        if (!user) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        } as any;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.sub;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
};
