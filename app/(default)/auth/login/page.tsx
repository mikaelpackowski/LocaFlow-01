import { Suspense } from "react";
import LoginForm from "./LoginForm"; // Chemin corrigé

export const metadata = {
  title: "Connexion | LocaFlow",
};

export default function LoginPage() {
  return (
    <main className="mx-auto max-w-md px-4 sm:px-6 py-16">
      <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">
        Connexion à votre compte
      </h1>
      <Suspense fallback={<div className="text-center text-gray-500">Chargement…</div>}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
