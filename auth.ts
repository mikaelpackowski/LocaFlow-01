// /auth.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const {
  handlers: { GET, POST }, // ces 2 fonctions serviront dans le route handler
  auth,
  signIn,
  signOut,
} = NextAuth({
  // TODO: remplace par tes vrais providers (Google, Email, etc.)
  providers: [
    Credentials({
      name: "Email & Mot de passe",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        // Démo : accepte toute combinaison non vide (à remplacer par Prisma/Supabase)
        if (credentials?.email && credentials.password) {
          return { id: "demo-user", name: "Demo", email: credentials.email };
        }
        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
});
