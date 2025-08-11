// auth.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      // NOTE: bien typer pour éviter l'erreur précédente
      async authorize(credentials) {
        const email = String(credentials?.email ?? "");
        const password = String(credentials?.password ?? "");
        if (!email || !password) return null;

        // ⚠️ Démo: accepte tout. À remplacer par vérif DB (Prisma, Supabase, etc.)
        return { id: "demo-user", name: "Demo", email };
      },
    }),
  ],
  session: { strategy: "jwt" },
});
