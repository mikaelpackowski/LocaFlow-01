import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },

  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      authorize: async (creds) => {
        if (!creds?.email || !creds?.password) return null;
        const user = await prisma.user.findUnique({ where: { email: String(creds.email).toLowerCase() } });
        if (!user) return null;
        const ok = await bcrypt.compare(String(creds.password), user.password);
        if (!ok) return null;
        return { id: user.id, name: user.name, email: user.email, role: user.role };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // inject role/id dans le JWT
      if (user) {
        token.id = user.id as string;
        // @ts-ignore
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      // reflète le JWT dans la session côté client
      // @ts-ignore
      session.user.id = token.id as string;
      // @ts-ignore
      session.user.role = token.role as string;
      return session;
    },
  },
});
