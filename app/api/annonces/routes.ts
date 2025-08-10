import { NextResponse } from "next/server";
import { LISTINGS } from "@/utils/listings";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const q = (searchParams.get("q") || "").toLowerCase();
  const maxStr = searchParams.get("max") || "";
  const type = (searchParams.get("type") || "all").toLowerCase();
  const sort = searchParams.get("sort") as "price_asc" | "price_desc" | null;

  const page = Math.max(1, Number(searchParams.get("page") || 1));
  const limit = Math.max(1, Number(searchParams.get("limit") || 9));

  let items = LISTINGS.filter((l) => {
    const matchesQ =
      !q ||
      l.title.toLowerCase().includes(q) ||
      l.city.toLowerCase().includes(q) ||
      (l.district || "").toLowerCase().includes(q);

    const matchesMax = !maxStr || l.price <= Number(maxStr);
    const matchesType = type === "all" || l.type.toLowerCase() === type;

    return matchesQ && matchesMax && matchesType;
  });

  if (sort === "price_asc") items.sort((a, b) => a.price - b.price);
  if (sort === "price_desc") items.sort((a, b) => b.price - a.price);

  const total = items.length;
  const pages = Math.max(1, Math.ceil(total / limit));
  const start = (page - 1) * limit;
  const paginated = items.slice(start, start + limit);

  return NextResponse.json({
    items: paginated,
    total,
    page,
    pages,
    limit,
  });
}
