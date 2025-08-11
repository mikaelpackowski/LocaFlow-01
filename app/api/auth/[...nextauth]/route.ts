// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

// Minimal config so the build passes. We'll wire this to Prisma later.
export const {
  handlers: { GET, POST }, // <-- this is what Next 15 expects
  auth,                     // optional: use in middleware / server
} = NextAuth({
  providers: [
    Credentials({
      name: "Email & Mot de passe",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      // TEMP: accept any non-empty credentials (for now).
      // Replace with a real check (Prisma) later.
      authorize: async (creds) => {
        if (creds?.email && creds.password) {
          return { id: "temp-user", name: "LocaFlow User", email: creds.email };
        }
        return null;
      },
    }),
  ],
  // You can add pages, callbacks, session, etc. later
});
