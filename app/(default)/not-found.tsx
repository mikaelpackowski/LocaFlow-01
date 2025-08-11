// app/(default)/not-found.tsx
import Link from "next/link";

export const metadata = {
  title: "404 – Page introuvable | LocaFlow",
};

export default function NotFound() {
  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 py-16 text-center">
      <h1 className="text-3xl font-bold text-gray-900">Page introuvable</h1>
      <p className="mt-2 text-gray-600">
        Désolé, la page que vous cherchez n’existe pas ou a été déplacée.
      </p>

      <div className="mt-6 flex items-center justify-center gap-3">
        <Link
          href="/"
          className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-500"
        >
          Revenir à l’accueil
        </Link>
        <Link
          href="/annonces"
          className="rounded-lg border px-4 py-2 hover:bg-gray-50"
        >
          Voir les annonces
        </Link>
      </div>
    </main>
  );
}
