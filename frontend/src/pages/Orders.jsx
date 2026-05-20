import DashboardLayout from "../layouts/DashboardLayout"

export default function Orders() {
  return (
    <DashboardLayout>

      <div className="p-8 space-y-4">

        <h1 className="text-5xl font-bold">
          Orders
        </h1>

        <p className="text-zinc-400">
          Manage customer orders and deliveries.
        </p>

      </div>

    </DashboardLayout>
  )
}