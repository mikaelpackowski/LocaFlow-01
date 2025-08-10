export const metadata = {
  title: "Espace Propriétaire | LocaFlow",
  description:
    "Comprenez ce que LocaFlow vous apporte : dépôt d’annonce, gestion des locataires, paiements et automatisations.",
};

export default function ProprietairePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
      <header className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
          Espace Propriétaire
        </h1>
        <p className="mt-3 text-gray-600 max-w-3xl mx-auto">
          Déposez vos biens, automatisez vos démarches (quittances, relances),
          suivez vos paiements et simplifiez vos échanges avec vos locataires.
        </p>

        <div className="mt-8 flex items-center justify-center">
          <a
            href="/proprietaire/inscription"
            className="rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-500"
          >
            Créer un compte propriétaire
          </a>
        </div>
      </header>

      <section className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card
          title="Dépôt d’annonce"
          text="Publiez votre bien en quelques clics, avec photos, description et critères."
        />
        <Card
          title="Gestion locative"
          text="Contrats, quittances, relances automatiques et suivi des paiements."
        />
        <Card
          title="Visibilité"
          text="Partagez facilement vos annonces et recevez des candidatures qualifiées."
        />
        <Card
          title="Pilotage simple"
          text="Tableau de bord clair, documents centralisés et exportables."
        />
        <Card
          title="Notifications"
          text="Recevez des alertes utiles : nouvelles candidatures, échéances, paiements."
        />
        <Card
          title="Support"
          text="Une équipe à l’écoute pour vous aider si besoin."
        />
      </section>
    </main>
  );
}

function Card({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-sm text-gray-600">{text}</p>
    </div>
  );
}
