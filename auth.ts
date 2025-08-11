// auth.ts (NextAuth v5)
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Email & Mot de passe",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      // v5 signature: (credentials, request)
      async authorize(credentials, _req) {
        const email = String(credentials?.email ?? "");
        const password = String(credentials?.password ?? "");

        // ⚠️ Démo: accepter si non vide (remplace par ta vérif DB)
        if (email && password) {
          return {
            id: "demo-user",
            name: "Demo",
            email, // <- string, pas {}
          };
        }
        return null;
      },
    }),
  ],
  // (optionnel) pages personnalisées plus tard
  // pages: { signIn: "/auth/login" },
});
