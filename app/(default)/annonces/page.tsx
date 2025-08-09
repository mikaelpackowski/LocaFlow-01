export const metadata = {
  title: "Annonces – LocaFlow",
  description: "Trouvez un logement ou diffusez votre bien.",
};

export default function AnnoncesPage() {
  return (
    <section className="pt-28 md:pt-36">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold">Annonces</h1>
          <p className="mt-3 text-gray-600">Explorez les biens disponibles et filtrez selon vos critères.</p>
        </header>

        {/* Barre de recherche (placeholder) */}
        <form className="mb-8 grid gap-4 md:grid-cols-4">
          <input className="rounded-lg border px-4 py-3" placeholder="Ville, quartier…" />
          <input className="rounded-lg border px-4 py-3" placeholder="Budget max (€)" type="number" />
          <select className="rounded-lg border px-4 py-3">
            <option>Type</option>
            <option>Studio</option>
            <option>T2</option>
            <option>T3+</option>
          </select>
          <button className="rounded-lg bg-gray-900 px-4 py-3 font-semibold text-white hover:bg-gray-800">Rechercher</button>
        </form>

        {/* Grille d’annonces (placeholder) */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1,2,3,4,5,6].map((i) => (
            <article key={i} className="overflow-hidden rounded-xl border">
              <div className="h-40 bg-gray-200" />
              <div className="p-4">
                <h3 className="font-semibold">Appartement T2 – Centre-ville</h3>
                <p className="mt-1 text-sm text-gray-600">45 m² · Balcon · Rénové</p>
                <p className="mt-2 font-semibold">1 050 € / mois</p>
                <a href="#" className="mt-3 inline-flex text-sm text-indigo-600 hover:underline">Voir le détail</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
