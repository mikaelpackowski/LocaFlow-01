// app/(default)/proprietaire/inscription/page.tsx
import OwnerSignupForm from "@/components/forms/OwnerSignupForm";

export const metadata = {
  title: "Créer un compte propriétaire | LocaFlow",
  description: "Inscription propriétaire LocaFlow",
};

export default function OwnerSignupPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 py-14">
      <h1 className="text-3xl font-bold text-gray-900 text-center">
        Créer un compte propriétaire
      </h1>
      <p className="mt-2 text-center text-gray-500">
        Gérez vos biens, vos locataires et vos démarches en un seul endroit.
      </p>

      <div className="mt-8 rounded-2xl border border-gray-200 p-6 shadow-sm bg-white">
        <OwnerSignupForm />
      </div>
    </main>
  );
}
