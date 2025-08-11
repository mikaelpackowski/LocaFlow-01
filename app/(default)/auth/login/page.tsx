import { Suspense } from "react";
import LoginClient from "@/components/auth/LoginClient";

export const metadata = {
  title: "Connexion | LocaFlow",
  description: "Connectez-vous pour accéder à votre espace.",
};

// Optionnel si tu veux forcer le rendu dynamique
// export const dynamic = "force-dynamic";

export default function LoginPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
      <h1 className="text-2xl font-bold text-gray-900 text-center">Connexion</h1>

      <Suspense fallback={<div className="py-10 text-center text-gray-500">Chargement…</div>}>
        <LoginClient />
      </Suspense>
    </main>
  );
}
