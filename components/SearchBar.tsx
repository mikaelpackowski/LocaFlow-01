// components/SearchBar.tsx
// ✅ Server Component (pas de "use client") : aucun auto-submit ni JS côté client

type Props = {
  defaultQuery?: string;
  defaultMax?: string | number;
  defaultType?: string;
  defaultSort?: string;
  cities: string[];
  types: string[];
};

export default function SearchBar({
  defaultQuery = "",
  defaultMax = "",
  defaultType = "all",
  defaultSort = "",
  cities,
  types,
}: Props) {
  return (
    <form method="get" className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-4">
      {/* Recherche textuelle */}
      <input
        type="text"
        name="q"
        defaultValue={defaultQuery}
        placeholder="Mot-clé (ex: Paris, balcon...)"
        className="w-full rounded-lg border px-3 py-2"
      />

      {/* Loyer max */}
      <input
        type="number"
        name="max"
        min={0}
        step={50}
        defaultValue={defaultMax}
        placeholder="Loyer max (€)"
        className="w-full rounded-lg border px-3 py-2"
      />

      {/* Type de bien */}
      <select
        name="type"
        defaultValue={defaultType}
        className="w-full rounded-lg border px-3 py-2"
      >
        <option value="all">Tous les types</option>
        {types.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      {/* On conserve la valeur de tri actuelle, mais on ne l’affiche pas ici.
          Le tri visuel/auto-submit est géré plus bas via AutoSubmitSelect. */}
      <input type="hidden" name="sort" defaultValue={defaultSort} />

      {/* Actions */}
      <div className="sm:col-span-4 mt-2 flex items-center gap-2">
        <button
          type="submit"
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
        >
          Rechercher
        </button>

        <a
          href="/annonces"
          className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50"
        >
          Réinitialiser les filtres
        </a>
      </div>
    </form>
  );
}
