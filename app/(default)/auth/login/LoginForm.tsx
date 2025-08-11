"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const roleFromURL = (searchParams?.get("role") ?? "").toLowerCase();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // rôle par défaut selon l’URL: owner | tenant
  const [role, setRole] = useState<"owner" | "tenant">(
    roleFromURL === "tenant" ? "tenant" : "owner"
  );

  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  useEffect(() => {
    if (roleFromURL === "owner" || roleFromURL === "tenant") {
      setRole(roleFromURL as "owner" | "tenant");
    }
  }, [roleFromURL]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrMsg(null);
    setLoading(true);

    // Où rediriger après login
    const callbackUrl =
      role === "owner"
        ? "/proprietaire/dashboard"
        : "/locataire/dashboard";

    // NB: côté CredentialsProvider (dans auth.ts), tu acceptes email/password
    // Ici on passe également 'role' si tu veux l’exploiter plus tard.
    const res = await signIn("credentials", {
      redirect: false, // on gère la redirection nous-mêmes
      email,
      password,
      role,
      callbackUrl,
    });

    setLoading(false);

    if (!res) {
      setErrMsg("Erreur inattendue. Réessayez.");
      return;
    }

    if (res.error) {
      // NextAuth renvoie "CredentialsSignin" si mauvais identifiants
      setErrMsg(
        res.error === "CredentialsSignin"
          ? "Identifiants invalides."
          : res.error
      );
      return;
    }

    // Succès : redirection
    router.push(res.url || callbackUrl);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {errMsg && (
        <div className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {errMsg}
        </div>
      )}

      <div className="space-y-1">
        <label htmlFor="email" className="text-sm font-medium text-gray-800">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border px-3 py-2"
          placeholder="vous@exemple.com"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="password" className="text-sm font-medium text-gray-800">
          Mot de passe
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border px-3 py-2"
          placeholder="••••••••"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-800">
          Je suis
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setRole("owner")}
            className={`rounded-lg border px-3 py-2 text-sm ${
              role === "owner"
                ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                : "hover:bg-gray-50"
            }`}
          >
            Propriétaire
          </button>
          <button
            type="button"
            onClick={() => setRole("tenant")}
            className={`rounded-lg border px-3 py-2 text-sm ${
              role === "tenant"
                ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                : "hover:bg-gray-50"
            }`}
          >
            Locataire
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-500 disabled:opacity-60"
      >
        {loading ? "Connexion..." : "Se connecter"}
      </button>

      <div className="text-center text-sm text-gray-600">
        Pas de compte ?{" "}
        <a
          href="/proprietaire/inscription"
          className="font-medium text-indigo-600 hover:underline"
        >
          Créer un compte propriétaire
        </a>
        {" · "}
        <a
          href="/locataire/inscription"
          className="font-medium text-indigo-600 hover:underline"
        >
          Créer un compte locataire
        </a>
      </div>
    </form>
  );
}
