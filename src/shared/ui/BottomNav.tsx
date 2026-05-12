import { Home, Search, BookOpen, User } from "lucide-react"
import { Link, useLocation } from "react-router"

const NAV_ITEMS = [
  { to: "/", icon: Home, label: "Accueil" },
  { to: "/recherche", icon: Search, label: "Recherche" },
  { to: "/library", icon: BookOpen, label: "Bibliothèque" },
  { to: "/profil", icon: User, label: "Profil" },
]

export default function BottomNav() {
  const { pathname } = useLocation()

  return (
    <nav className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 flex items-center justify-around h-16">
      {NAV_ITEMS.map(({ to, icon: Icon, label }) => {
        const isActive = pathname === to
        return (
          <Link
            key={to}
            to={to}
            className={`flex flex-col items-center gap-0.5 ${isActive ? "text-primary" : "text-text/50"}`}
          >
            <Icon size={22} />
            <span className={`text-xs ${isActive ? "font-medium" : ""}`}>{label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
