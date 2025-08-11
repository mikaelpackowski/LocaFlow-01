// app/(default)/auth/login/page.tsx
import LoginForm from "./LoginForm";

export const metadata = {
  title: "Connexion | LocaFlow",
  description: "Connectez-vous pour accéder à votre espace.",
};

export default function LoginPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string>>;
}) {
  // Next 15: searchParams peut être une Promise
  const sp = searchParams ? undefined : undefined; // évite TS sur cette page
  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
      <div className="mx-auto w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 text-center">
          Connexion
        </h1>
        <p className="mt-2 text-center text-gray-600">
          Entrez vos identifiants pour accéder à votre espace.
        </p>

        <div className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
