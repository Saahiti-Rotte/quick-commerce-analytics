import { Link, useLocation } from "react-router-dom"

export default function Sidebar() {

  const location = useLocation()

  const links = [
    { name: "Dashboard", path: "/" },
    { name: "Orders", path: "/orders" },
    { name: "Inventory", path: "/inventory" },
    { name: "Analytics", path: "/analytics" },
    { name: "Customers", path: "/customers" },
  ]

  return (
    <aside className="w-64 min-h-screen bg-zinc-950 border-r border-zinc-800 p-6">

      <h1 className="text-2xl font-bold mb-10">
        QuickCommerce
      </h1>

      <nav className="space-y-3">

        {links.map((link) => (

          <Link
            key={link.path}
            to={link.path}
            className={`block px-4 py-3 rounded-xl transition ${
              location.pathname === link.path
                ? "bg-zinc-800 text-white"
                : "text-zinc-400 hover:bg-zinc-900"
            }`}
          >
            {link.name}
          </Link>

        ))}

      </nav>

    </aside>
  )
}