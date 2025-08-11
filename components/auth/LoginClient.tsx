"use client";

import { useSearchParams } from "next/navigation";

export default function LoginClient() {
  const sp = useSearchParams();
  const role = sp.get("role") ?? ""; // "owner" | "tenant" | null

  return (
    <div className="mx-auto max-w-md px-4 sm:px-6 py-8">
      {role && (
        <p className="mb-4 text-center text-sm text-gray-500">
          Vous vous connectez en tant que{" "}
          <span className="font-medium">
            {role === "owner" ? "propriétaire" : "locataire"}
          </span>.
        </p>
      )}

      {/* Ton formulaire */}
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" className="mt-1 w-full rounded-lg border px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
          <input type="password" className="mt-1 w-full rounded-lg border px-3 py-2" required />
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-500"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
}
