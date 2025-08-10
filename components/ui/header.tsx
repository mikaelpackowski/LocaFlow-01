{/* Menu desktop */}
<nav className="hidden items-center gap-6 text-sm md:flex">
  <Link href="/proprietaire/inscription" className="hover:text-blue-600">
    Créer un compte propriétaire
  </Link>
  <Link href="/locataire" className="hover:text-blue-600">Locataire</Link>
  <Link href="/annonces" className="hover:text-blue-600">Annonces</Link>
  <Link href="/presentation" className="hover:text-blue-600">Découvrir LocaFlow</Link>
  <Link href="/faq" className="hover:text-blue-600">FAQ</Link>
  <Link href="/contact" className="hover:text-blue-600">Contact</Link>
</nav>

{/* Menu mobile */}
{menuOpen && (
  <nav className="space-y-3 border-t bg-white px-4 py-3 text-sm md:hidden">
    <Link href="/proprietaire/inscription" onClick={closeMenu} className="block hover:text-blue-600">
      Créer un compte propriétaire
    </Link>
    <Link href="/locataire" onClick={closeMenu} className="block hover:text-blue-600">
      Locataire
    </Link>
    <Link href="/annonces" onClick={closeMenu} className="block hover:text-blue-600">
      Annonces
    </Link>
    <Link href="/presentation" onClick={closeMenu} className="block hover:text-blue-600">
      Découvrir LocaFlow
    </Link>
    <Link href="/faq" onClick={closeMenu} className="block hover:text-blue-600">
      FAQ
    </Link>
    <Link href="/contact" onClick={closeMenu} className="block hover:text-blue-600">
      Contact
    </Link>
  </nav>
)}
