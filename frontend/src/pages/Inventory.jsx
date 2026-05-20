import DashboardLayout from "../layouts/DashboardLayout"

export default function Inventory() {
  return (
    <DashboardLayout>

      <div className="p-8 space-y-4">

        <h1 className="text-5xl font-bold">
          Inventory
        </h1>

        <p className="text-zinc-400">
          Inventory and stock management.
        </p>

      </div>

    </DashboardLayout>
  )
}