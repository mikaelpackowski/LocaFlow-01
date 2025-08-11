"use client";

import { useSearchParams } from "next/navigation";

export default function NotFoundClient() {
  const sp = useSearchParams();
  const from = sp.get("from") ?? ""; // exemple: afficher d'où on vient, facultatif

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold text-gray-900">Page introuvable</h1>
      <p className="mt-2 text-gray-600">
        La page que vous cherchez n’existe pas ou a été déplacée.
      </p>

      {from && (
        <p className="mt-2 text-sm text-gray-500">
          Requête initiale : <span className="font-mono">{from}</span>
        </p>
      )}

      <a
        href="/"
        className="mt-6 inline-flex rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-500"
      >
        Retour à l’accueil
      </a>
    </div>
  );
}
