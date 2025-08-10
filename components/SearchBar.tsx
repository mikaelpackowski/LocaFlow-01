"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  // valeurs par défaut (venant de searchParams)
  defaultQuery?: string;
  defaultCity?: string;
  defaultMin?: string | number;
  defaultMax?: string | number;
  defaultType?: string; // "all" | "appartement" | "maison" | ...
  defaultSort?: string; // "price_asc" | "price_desc" | ""

  cities: string[];
  types: string[]; // ex: ["appartement","maison","studio"]
};

export default function SearchBar({
  defaultQuery = "",
  defaultCity = "",
  defaultMin = "",
  defaultMax = "",
  defaultType = "all",
  defaultSort = "",
  cities,
  types,
}: Props) {
  const formRef = useRef<HTMLFormElement>(null);

  // états contrôlés (pour un UX fluide)
  const [q, setQ] = useState(String(defaultQuery));
  const [city, setCity] = useState(String(defaultCity));
  const [min, setMin] = useState(String(defaultMin || ""));
  const [max, setMax] = useState(String(defaultMax || ""));
  const [activeType, setActiveType] = useState(String(defaultType || "all"));

  // limites visuelles pour le prix
  const PRICE_MIN = 200;
  const PRICE_MAX = 4000;
  const priceMin = Number(min || PRICE_MIN);
  const priceMax = Number(max || PRICE_MAX);

  // autosoumission (petit debounce pour le champ texte)
  useEffect(() => {
    const t = setTimeout(() => {
      submitPreservingPageReset();
    }, 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  function submitPreservingPageReset() {
    // on repart page=1 quand on change les filtres
    const el = formRef.current;
    if (!el) return;
    const pageInput = el.querySelector<HTMLInputElement>('input[name="page"]');
    if (pageInput) pageInput.value = "1";
    el.requestSubmit();
  }

  function onCityChange(v: string) {
    setCity(v);
    submitPreservingPageReset();
  }

  function onPriceMinChange(v: number) {
    setMin(String(v));
    // évite min > max : on “cale” max si nécessaire
    if (Number(max || PRICE_MAX) < v) setMax(String(v));
    submitPreservingPageReset();
  }

  function onPriceMaxChange(v: number) {
    setMax(String(v));
    if (Number(min || PRICE_MIN) > v) setMin(String(v));
    submitPreservingPageReset();
  }

  function toggleType(t: string) {
    const next = activeType === t ? "all" : t;
    setActiveType(next);
    submitPreservingPageReset();
  }

  function resetFilters() {
    setQ("");
    setCity("");
    setMin("");
    setMax("");
    setActiveType("all");
    const el = formRef.current;
    if (!el) return;
    // on vide les inputs puis on submit
    el.reset();
    const pageInput = el.querySelector<HTMLInputElement>('input[name="page"]');
    if (pageInput) pageInput.value = "1";
    el.requestSubmit();
  }

  const typeChips = useMemo(
    () => ["all", ...types],
    [types]
  );

  return (
    <form
      ref={formRef}
      method="get"
      className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-12 items-end"
    >
      {/* toujours renvoyés (même si vides) */}
      <input type="hidden" name="page" defaultValue="1" />
      <input type="hidden" name="sort" defaultValue={defaultSort} />

      {/* Rechercher (mot-clé) */}
      <div className="sm:col-span-4">
        <label className="sr-only">Recherche</label>
        <input
          name="q"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Ville, quartier, mot-clé…"
          className="w-full rounded-lg border px-3 py-2"
        />
      </div>

      {/* Ville */}
      <div className="sm:col-span-3">
        <label className="sr-only">Ville</label>
        <select
          name="city"
          value={city}
          onChange={(e) => onCityChange(e.target.value)}
          className="w-full rounded-lg border px-3 py-2"
        >
          <option value="">Toutes les villes</option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Prix min */}
      <div className="sm:col-span-2">
        <label className="mb-1 block text-xs text-gray-500">
          Loyer min (€)
        </label>
        <input
          type="range"
          min={PRICE_MIN}
          max={PRICE_MAX}
          step={10}
          value={priceMin}
          onChange={(e) => onPriceMinChange(Number(e.target.value))}
          className="w-full"
        />
        <input type="hidden" name="min" value={min} />
        <div className="text-[11px] text-gray-500 mt-1">{priceMin} €</div>
      </div>

      {/* Prix max */}
      <div className="sm:col-span-2">
        <label className="mb-1 block text-xs text-gray-500">
          Loyer max (€)
        </label>
        <input
          type="range"
          min={PRICE_MIN}
          max={PRICE_MAX}
          step={10}
          value={priceMax}
          onChange={(e) => onPriceMaxChange(Number(e.target.value))}
          className="w-full"
        />
        <input type="hidden" name="max" value={max} />
        <div className="text-[11px] text-gray-500 mt-1">{priceMax} €</div>
      </div>

      {/* Bouton Rechercher (soumission explicite si besoin) */}
      <div className="sm:col-span-1">
        <button
          type="submit"
          className="w-full rounded-lg bg-indigo-600 px-3 py-2 text-white font-semibold hover:bg-indigo-500"
        >
          Rechercher
        </button>
      </div>

      {/* Types (chips) */}
      <div className="sm:col-span-12 mt-3 flex flex-wrap gap-2">
        {typeChips.map((t) => (
          <label key={t}>
            <input
              type="radio"
              name="type"
              value={t}
              className="peer hidden"
              checked={activeType === t}
              onChange={() => toggleType(t)}
            />
            <span
              className={`cursor-pointer select-none rounded-full border px-3 py-1 text-sm
                peer-checked:bg-indigo-600 peer-checked:text-white
                hover:bg-gray-100`}
            >
              {t === "all" ? "Tous les types" : t}
            </span>
          </label>
        ))}

        {/* Réinitialiser */}
        <button
          type="button"
          onClick={resetFilters}
          className="ml-2 rounded-full border px-3 py-1 text-sm hover:bg-gray-100"
          aria-label="Réinitialiser les filtres"
        >
          Réinitialiser
        </button>
      </div>
    </form>
  );
}
