// app/api/annonces/route.ts
import { NextResponse } from "next/server";
import { LISTINGS } from "@/utils/listings";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const q = (searchParams.get("q") ?? "").toLowerCase().trim();
    const type = (searchParams.get("type") ?? "").toLowerCase().trim();
    const maxRaw = searchParams.get("max");
    const sort = searchParams.get("sort"); // "price_asc" | "price_desc"
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
    const limit = Math.max(1, parseInt(searchParams.get("limit") ?? "9", 10));

    const max = maxRaw ? Number(maxRaw) : undefined;

    // Filtrage
    let items = LISTINGS.filter((l) => {
      const hay =
        `${l.title} ${l.city} ${l.district ?? ""} ${l.description ?? ""}`.toLowerCase();
      if (q && !hay.includes(q)) return false;
      if (type && type !== "all" && l.type.toLowerCase() !== type) return false;
      if (typeof max === "number" && !Number.isNaN(max) && l.price > max) return false;
      return true;
    });

    // Tri
    if (sort === "price_asc") items.sort((a, b) => a.price - b.price);
    if (sort === "price_desc") items.sort((a, b) => b.price - a.price);

    // Pagination
    const total = items.length;
    const pages = Math.max(1, Math.ceil(total / limit));
    const safePage = Math.min(page, pages);
    const start = (safePage - 1) * limit;
    const end = start + limit;
    const pageItems = items.slice(start, end);

    return NextResponse.json({
      items: pageItems,
      total,
      page: safePage,
      pages,
      limit,
    });
  } catch (err) {
    console.error("[/api/annonces] error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
