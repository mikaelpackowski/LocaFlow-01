// app/(default)/annonces/page.tsx
import ListingCard from "@/components/ListingCard";
import SearchBar from "@/components/SearchBar";
import { LISTINGS } from "@/utils/listings";

export const metadata = {
  title: "Annonces | LocaFlow",
  description: "Trouvez votre logement et filtrez selon vos critères.",
};

export default async function AnnoncesPage(props: any) {
  // Next 15 : parfois Promise, parfois objet → on “await” quoi qu’il arrive
  const sp = (await props.searchParams) ?? {};

  const q = sp.q ?? "";
  const max = sp.max ?? "";
  const type = sp.type ?? "all";
  const sort = sp.sort as "price_asc" | "price_desc" | undefined;
  const page = Number(sp.page ?? 1);
  const limit = Number(sp.limit ?? 9);

  // ✅ Fetch RELATIF → pas besoin de headers() ni d’URL absolue
  const params = new URLSearchParams();
  if (q) params.set("q", String(q));
  if (max) params.set("max", String(max));
  if (type && type !== "all") params.set("type", String(type));
  if (sort) params.set("sort", sort);
  params.set("page", String(page));
  params.set("limit", String(limit));

  let data: any = { items: [], total: 0, page: 1, pages: 1, limit };
  try {
    const res = await fetch(`/api/annonces?${params.toString()}`, { cache: "no-store" });
    if (!res.ok) throw new Error(`API status ${res.status}`);
    data = await res.json();
  } catch (e) {
    console.error("Erreur fetch /api/annonces:", e);
  }

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
        defaultMax={String(max)}
        defaultType={String(type)}
        defaultSort={sort ?? ""}
        cities={cities}
        types={types}
      />

      {/* Tri rapide */}
      <div className="mt-4 flex justify-end">
        <form method="get">
          <input type="hidden" name="q" defaultValue={String(q)} />
          <input type="hidden" name="max" defaultValue={String(max)} />
          <input type="hidden" name="type" defaultValue={String(type)} />
          <select
            name="sort"
            defaultValue={sort ?? ""}
            className="rounded-lg border px-3 py-2 text-sm"
            onChange={(e) => e.currentTarget.form?.submit()}
          >
            <option value="">Trier par…</option>
            <option value="price_asc">Prix croissant</option>
            <option value="price_desc">Prix décroissant</option>
          </select>
        </form>
      </div>

      {data.items.length === 0 ? (
        <p className="mt-10 text-center text-gray-500">
          Aucune annonce ne correspond à vos critères.
        </p>
      ) : (
        <>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.items.map((l: any) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>

          <Pagination
            total={data.total}
            page={data.page}
            pages={data.pages}
            limit={data.limit}
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
