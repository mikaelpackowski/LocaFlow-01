// components/SearchBar.tsx

export default function SearchBar({
  defaultQuery = "",
  defaultMax = "",
  defaultType = "all",
  defaultSort = "",
  cities = [],
  types = [],
}: {
  defaultQuery?: string;
  defaultMax?: string;
  defaultType?: string;
  defaultSort?: string;
  cities?: string[];
  types?: string[];
}) {
  return (
    <form method="get" action="/annonces" className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-4">
      <input
        type="text"
        name="q"
        defaultValue={defaultQuery}
        placeholder="Ville, quartier, mot-clé…"
        className="rounded-lg border px-3 py-2"
      />

      <input
        type="number"
        name="max"
        defaultValue={defaultMax}
        placeholder="Loyer max (€)"
        min={0}
        className="rounded-lg border px-3 py-2"
      />

      <select
        name="type"
        defaultValue={defaultType}
        className="rounded-lg border px-3 py-2"
      >
        <option value="all">Tous les types</option>
        {types.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>

      <button
        type="submit"
        className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-500"
      >
        Rechercher
      </button>

      {/* Optionnel : reset simple */}
      <input type="hidden" name="page" value="1" />
      {defaultSort ? <input type="hidden" name="sort" value={defaultSort} /> : null}
    </form>
  );
}
