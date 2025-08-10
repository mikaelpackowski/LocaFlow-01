// app/api/annonces/route.ts
import { NextResponse } from "next/server";
import { LISTINGS } from "@/utils/listings";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const q    = (searchParams.get("q")   ?? "").trim().toLowerCase();
  const max  = Number(searchParams.get("max") ?? "") || null;
  const type = (searchParams.get("type") ?? "all").trim();
  const sort = searchParams.get("sort") as "price_asc" | "price_desc" | null;

  const page  = Math.max(1, Number(searchParams.get("page")  ?? 1));
  const limit = Math.max(1, Number(searchParams.get("limit") ?? 9));

  let items = LISTINGS.slice();

  // texte (ville, titre, description, quartier)
  if (q) {
    items = items.filter((l) => {
      const hay = `${l.title} ${l.city} ${l.district ?? ""} ${l.description ?? ""}`.toLowerCase();
      return hay.includes(q);
    });
  }

  // type
  if (type && type !== "all") {
    items = items.filter((l) => String(l.type).toLowerCase() === type.toLowerCase());
  }

  // loyer max
  if (max) {
    items = items.filter((l) => l.price <= max);
  }

  // tri
  if (sort === "price_asc")  items.sort((a, b) => a.price - b.price);
  if (sort === "price_desc") items.sort((a, b) => b.price - a.price);

  // pagination
  const total = items.length;
  const pages = Math.max(1, Math.ceil(total / limit));
  const start = (page - 1) * limit;
  const end   = start + limit;

  return NextResponse.json({
    items: items.slice(start, end),
    total,
    page,
    pages,
    limit,
  });
}
