import {
  LayoutDashboard,
  BarChart3,
  FlaskConical,
  BrainCircuit,
  Users,
  ShoppingCart,
} from "lucide-react"

import { NavLink } from "react-router-dom"

export default function AppSidebar() {
  return (
    <aside className="w-64 border-r border-zinc-800 bg-zinc-950 min-h-screen p-6">

      {/* Logo */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white">
          PulseIQ
        </h1>

        <p className="text-zinc-400 text-sm mt-2">
          Commerce Intelligence
        </p>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">

        <SidebarItem
          to="/"
          icon={<LayoutDashboard size={18} />}
          label="Dashboard"
        />

        <SidebarItem
          to="/analytics"
          icon={<BarChart3 size={18} />}
          label="Analytics"
        />

        <SidebarItem
          to="/orders"
          icon={<ShoppingCart size={18} />}
          label="Orders"
        />

        <SidebarItem
          to="/retention"
          icon={<Users size={18} />}
          label="Retention"
        />

        <SidebarItem
          to="/experiments"
          icon={<FlaskConical size={18} />}
          label="Experiments"
        />

        <SidebarItem
          to="/ai-insights"
          icon={<BrainCircuit size={18} />}
          label="AI Insights"
        />

      </nav>

    </aside>
  )
}

function SidebarItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm ${
          isActive
            ? "bg-blue-600 text-white"
            : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
        }`
      }
    >
      {icon}
      {label}
    </NavLink>
  )
}