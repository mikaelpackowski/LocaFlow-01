// app/(default)/locataire/dashboard/page.tsx

import TenantSidebar from "@/components/tenant/TenantSidebar";

export default function TenantDashboardPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Tableau de bord</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-[240px_1fr]">
        {/* Sidebar */}
        <TenantSidebar />  {/* ✅ pas de prop "active" */}

        {/* Contenu */}
        <section className="space-y-6">
          {/* … ton contenu … */}
        </section>
      </div>
    </main>
  );
}
