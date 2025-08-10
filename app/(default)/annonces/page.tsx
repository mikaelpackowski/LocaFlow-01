// app/(default)/annonces/page.tsx
import ListingCard from "@/components/ListingCard";
import SearchBar from "@/components/SearchBar";
import { LISTINGS } from "@/utils/listings";

export const metadata = {
  title: "Annonces | LocaFlow",
  description: "Trouvez votre logement et filtrez selon vos critères.",
};

type SP = {
  q?: string;
  max?: string;
  type?: string;
  sort?: "price_asc" | "price_desc" | "";
  page?: string | number;
  limit?: string | number;
};

export default async function AnnoncesPage(props: { searchParams?: Promise<SP> | SP }) {
  // Next 15 peut donner un Promise ici
  const sp = (await props.searchParams) ?? {};

  const q     = (sp.q ?? "").toString().trim().toLowerCase();
  const max   = Number(sp.max ?? "") || null;
  const type  = (sp.type ?? "all").toString().trim();
  const sort  = (sp.sort as "price_asc" | "price_desc" | "") ?? "";
  const page  = Math.max(1, Number(sp.page ?? 1));
  const limit = Math.max(1, Number(sp.limit ?? 9));

  // --- Filtrage en mémoire ---
  let items = LISTINGS.slice();

  if (q) {
    items = items.filter((l) => {
      const hay = `${l.title} ${l.city} ${l.district ?? ""} ${l.description ?? ""}`.toLowerCase();
      return hay.includes(q);
    });
  }

  if (type && type !== "all") {
    items = items.filter((l) => String(l.type).toLowerCase() === type.toLowerCase());
  }

  if (max) {
    items = items.filter((l) => l.price <= max);
  }

  if (sort === "price_asc")  items.sort((a, b) => a.price - b.price);
  if (sort === "price_desc") items.sort((a, b) => b.price - a.price);

  // --- Pagination ---
  const total = items.length;
  const pages = Math.max(1, Math.ceil(total / limit));
  const start = (page - 1) * limit;
  const end   = start + limit;
  const paged = items.slice(start, end);

  // Pour remplir les listes dans la SearchBar
  const cities = Array.from(
    new Set(LISTINGS.flatMap((l) => [l.city, l.district].filter(Boolean) as string[])),
  ).sort((a, b) => a.localeCompare(b, "fr"));
  const types = Array.from(new Set(LISTINGS.map((l) => l.type)));

  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 py-14">
      <h1 className="text-3xl font-bold text-gray-900 text-center">Annonces</h1>
      <p className="mt-2 text-center text-gray-500">
        Explorez les biens disponibles et filtrez selon vos critères.
      </p>

      <SearchBar
        defaultQuery={String(q)}
        defaultMax={String(max ?? "")}
        defaultType={String(type)}
        defaultSort={sort ?? ""}
        cities={cities}
        types={types}
      />

      {/* Tri (sans onChange côté serveur) */}
      <div className="mt-4 flex justify-end">
        <form method="get" className="flex items-center gap-2">
          <input type="hidden" name="q" defaultValue={String(q)} />
          <input type="hidden" name="max" defaultValue={String(max ?? "")} />
          <input type="hidden" name="type" defaultValue={String(type)} />
          <select name="sort" defaultValue={sort ?? ""} className="rounded-lg border px-3 py-2 text-sm">
            <option value="">Trier par…</option>
            <option value="price_asc">Prix croissant</option>
            <option value="price_desc">Prix décroissant</option>
          </select>
          <button
            type="submit"
            className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            Appliquer
          </button>
        </form>
      </div>

      {paged.length === 0 ? (
        <p className="mt-10 text-center text-gray-500">Aucune annonce ne correspond à vos critères.</p>
      ) : (
        <>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {paged.map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>

          <Pagination
            total={total}
            page={page}
            pages={pages}
            limit={limit}
            searchParams={{
              q: String(q || ""),
              max: String(max || ""),
              type: String(type || ""),
              sort: String(sort || ""),
            }}
          />
        </>
      )}
    </main>
  );
}

function Pagination({
  total,
  page,
  pages,
  limit,
  searchParams,
}: {
  total: number;
  page: number;
  pages: number;
  limit: number;
  searchParams: Record<string, string>;
}) {
  if (pages <= 1) return null;

  const makeLink = (p: number) => {
    const sp = new URLSearchParams(searchParams);
    if (!sp.get("q")) sp.delete("q");
    if (!sp.get("max")) sp.delete("max");
    if (!sp.get("type") || sp.get("type") === "all") sp.delete("type");
    if (!sp.get("sort")) sp.delete("sort");
    sp.set("page", String(p));
    sp.set("limit", String(limit));
    return `/annonces?${sp.toString()}`;
  };

  const first = Math.max(1, page - 2);
  const last = Math.min(pages, first + 4);
  const pagesToShow = Array.from({ length: last - first + 1 }, (_, i) => first + i);

  return (
    <nav className="mt-10 flex items-center justify-center gap-2">
      <a href={makeLink(Math.max(1, page - 1))} className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50">
        ← Précédent
      </a>
      {pagesToShow.map((p) => (
        <a
          key={p}
          href={makeLink(p)}
          className={`rounded-lg px-3 py-2 text-sm ${p === page ? "bg-indigo-600 text-white" : "border hover:bg-gray-50"}`}
        >
          {p}
        </a>
      ))}
      <a href={makeLink(Math.min(pages, page + 1))} className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50">
        Suivant →
      </a>
    </nav>
  );
}
