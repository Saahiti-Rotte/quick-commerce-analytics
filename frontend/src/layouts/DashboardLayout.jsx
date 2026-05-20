import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-black text-white">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div>
          {children}
        </div>

      </div>

    </div>
  )
}