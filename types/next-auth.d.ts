import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      role?: "OWNER" | "TENANT";
    };
  }

  interface User {
    id: string;
    role?: "OWNER" | "TENANT";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: "OWNER" | "TENANT";
  }
}
