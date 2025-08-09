// app/(default)/annonces/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LISTINGS, getBySlug } from "../../../../utils/listings";

// Pré-génère les slugs depuis les données locales
export function generateStaticParams() {
  return LISTINGS.map((l) => ({ slug: l.slug }));
}

// ✅ Typage “safe” pour Next 15 : props async + any
export async function generateMetadata(props: any) {
  const params = await props.params; // marche si c'est un Promise ou un objet direct
  const item = getBySlug(params?.slug as string);
  return {
    title: item ? `${item.title} – ${item.city} | LocaFlow` : "Annonce | LocaFlow",
    description: item?.description ?? "Annonce immobilière sur LocaFlow",
  };
}

// ✅ Page “safe” : props async + any
export default async function ListingDetailPage(props: any) {
  const params = await props.params; // supporte Promise ou objet direct
  const slug = params?.slug as string | undefined;
  const listing = slug ? getBySlug(slug) : undefined;

  if (!listing) return notFound();

  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      {/* Fil d’Ariane */}
      <nav className="text-sm text-gray-500">
        <Link href="/annonces" className="hover:text-gray-700">Annonces</Link> /{" "}
        <span className="text-gray-700">{listing.title}</span>
      </nav>

      {/* En-tête */}
      <header className="mt-3">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{listing.title}</h1>
        <p className="mt-1 text-gray-600">
          {listing.city}{listing.district ? ` – ${listing.district}` : ""} · {listing.surface} m²
        </p>
        <p className="mt-2 text-2xl font-semibold">
          {Number(listing.price).toLocaleString("fr-FR")} € / mois
        </p>
      </header>

      {/* Galerie */}
      <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {listing.images?.map((src, i) => (
          <div key={src + i} className="relative h-64 w-full overflow-hidden rounded-xl">
            <Image src={src} alt={`${listing.title} ${i + 1}`} fill className="object-cover" />
          </div>
        ))}
      </section>

      {/* Détails */}
      <section className="mt-8 grid gap-8 md:grid-cols-[2fr_1fr]">
        <div>
          <h2 className="text-lg font-semibold">Description</h2>
          <p className="mt-2 text-gray-700 leading-relaxed">{listing.description}</p>

          <h3 className="mt-6 text-lg font-semibold">Atouts</h3>
          <ul className="mt-2 flex flex-wrap gap-2">
            {listing.features?.map((f) => (
              <li key={f} className="rounded-full bg-gray-100 px-3 py-1 text-sm">{f}</li>
            ))}
          </ul>
        </div>

        {/* Encadré contact */}
        <aside className="rounded-2xl border p-5 shadow-sm">
          <p className="text-sm text-gray-600">Intéressé par ce bien ?</p>
          <a
            href={`mailto:contact@locaflow.example?subject=Infos ${encodeURIComponent(listing.title)}`}
            className="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-500"
          >
            Contacter
          </a>
          <a
            href="/contact"
            className="mt-2 inline-flex w-full items-center justify-center rounded-lg border px-4 py-2 font-semibold text-gray-800 hover:bg-gray-50"
          >
            Demander une visite
          </a>
        </aside>
      </section>
    </main>
  );
}
