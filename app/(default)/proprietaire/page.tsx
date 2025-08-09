export const metadata = {
  title: "Propriétaire – LocaFlow",
  description: "Outils et automatisations pour propriétaires bailleurs.",
};

export default function ProprietairePage() {
  return (
    <section className="pt-28 md:pt-36">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold">
            Solutions pour <span className="bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">propriétaires</span>
          </h1>
          <p className="mt-4 text-gray-600">
            Centralisez vos biens, contrats et loyers. Automatisez les relances et gagnez du temps.
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-xl border p-6">
            <h3 className="font-semibold mb-2">Suivi des loyers</h3>
            <p className="text-gray-600">Tableau de bord, échéances, relances automatiques.</p>
          </div>
          <div className="rounded-xl border p-6">
            <h3 className="font-semibold mb-2">Documents & baux</h3>
            <p className="text-gray-600">Modèles de baux, états des lieux, archivage sécurisé.</p>
          </div>
          <div className="rounded-xl border p-6">
            <h3 className="font-semibold mb-2">Annonces simplifiées</h3>
            <p className="text-gray-600">Publiez vos biens en quelques clics et gérez les visites.</p>
          </div>
        </div>

        <div className="text-center mt-12">
          <a href="/auth/login?role=owner" className="inline-flex rounded-full bg-violet-500 px-7 py-3 text-white font-semibold hover:bg-violet-600 transition">
            Créer un compte propriétaire
          </a>
        </div>
      </div>
    </section>
  );
}
