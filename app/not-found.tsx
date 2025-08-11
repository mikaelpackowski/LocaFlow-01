import { Suspense } from "react";
import NotFoundClient from "@/components/not-found-client";

export const metadata = {
  title: "404 – Page introuvable | LocaFlow",
};

export default function NotFoundPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 py-16">
      <Suspense fallback={<div className="text-center text-gray-500">Chargement…</div>}>
        <NotFoundClient />
      </Suspense>
    </main>
  );
}
