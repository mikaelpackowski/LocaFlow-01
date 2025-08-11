import { Suspense } from "react";
import LoginForm from "@/components/auth/LoginForm";

export const metadata = {
  title: "Connexion | LocaFlow",
  description: "Connectez-vous pour accéder à votre espace LocaFlow.",
};

// Optionnel : évite le pré-rendu si besoin
export const dynamic = "force-dynamic";

export default function LoginPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
      <h1 className="mb-6 text-center text-3xl font-bold text-gray-900">
        Connexion
      </h1>

      <div className="mx-auto max-w-md">
        <Suspense fallback={<div className="text-center text-gray-500">Chargement…</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
