"use client";

import { useState } from "react";

export default function ProprietaireInscriptionPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    const fd = new FormData(e.currentTarget);
    const name = fd.get("name");
    const email = fd.get("email");
    const password = fd.get("password");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role: "OWNER" }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Inscription impossible.");
      setMessage("Compte créé avec succès. Vous pouvez vous connecter.");
      (e.currentTarget as HTMLFormElement).reset();
    } catch (err: any) {
      setError(err.message || "Erreur inconnue.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-md px-4 sm:px-6 py-14">
      <h1 className="text-2xl font-bold text-gray-900 text-center">Créer un compte propriétaire</h1>
      <p className="mt-2 text-center text-gray-500">Gérez vos biens simplement avec LocaFlow.</p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4 rounded-xl border bg-white p-6 shadow">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nom</label>
          <input name="name" type="text" className="mt-1 w-full rounded-lg border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email *</label>
          <input name="email" type="email" required className="mt-1 w-full rounded-lg border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Mot de passe *</label>
          <input name="password" type="password" required className="mt-1 w-full rounded-lg border px-3 py-2" />
        </div>

        {message && <p className="text-sm text-green-600">{message}</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-gray-900 px-4 py-2 font-semibold text-white hover:bg-black disabled:opacity-60"
        >
          {loading ? "Création…" : "Créer mon compte"}
        </button>

        <div className="pt-2 text-center text-sm">
          Déjà inscrit ? <a className="text-indigo-600 hover:underline" href="/api/auth/signin">Se connecter</a>
        </div>
      </form>
    </main>
  );
}
