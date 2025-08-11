// components/tenant/TenantSidebar.tsx
type Props = {
  active?:
    | "dashboard"
    | "dossier"
    | "visites"
    | "candidatures"
    | "paiements"
    | "documents"
    | "parametres";
};

const links = [
  { key: "dashboard", label: "Tableau de bord", href: "/locataire/dashboard" },
  { key: "dossier", label: "
