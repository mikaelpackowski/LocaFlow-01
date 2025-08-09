// app/api/annonces/route.ts
import { NextResponse } from "next/server";
import { LISTINGS } from "@/utils/listings";

function filterAndSort(opts: {
  q?: string;
  max?: number;
  type?: string;
  sort?: "price_asc" | "price_desc";
}) {
  const { q, max, type, sort } = opts;
  const needle = (q ?? "").trim().toLowerCase();

  let items = LISTINGS.filter((l) => {
    const matchQ =
      !needle ||
      l.title.toLowerCase().includes(needle) ||
      l.city.toLowerCase().includes(needle) ||
      (l.district ?? "").toLowerCase().includes(needle);
    const matchMax = !max || l.price <= max;
    const matchType = !type || type === "all" || l.type === type;
    return matchQ && matchMax && matchType;
  });

  if (sort === "price_asc") items.sort((a, b) => a.price - b.price);
  if (sort === "price_desc") items.sort((a, b) => b.price - a.price);

  return items;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const q = searchParams.get("q") ?? undefined;
  const max = searchParams.get("max") ? Number(searchParams.get("max")) : undefined;
  const type = searchParams.get("type") ?? undefined;
  const sort = (searchParams.get("sort") as "price_asc" | "price_desc" | null) ?? undefined;

  const page = Math.max(1, Number(searchParams.get("page") ?? 1));
  const limit = Math.min(30, Math.max(1, Number(searchParams.get("limit") ?? 9)));

  const filtered = filterAndSort({ q, max, type, sort });
  const total = filtered.length;
  const pages = Math.max(1, Math.ceil(total / limit));
  const start = (page - 1) * limit;
  const items = filtered.slice(start, start + limit);

  return NextResponse.json({ items, total, page, limit, pages });
}
