import DashboardLayout from "../layouts/DashboardLayout"

export default function Customers() {
  return (
    <DashboardLayout>

      <div className="p-8 space-y-4">

        <h1 className="text-5xl font-bold">
          Customers
        </h1>

        <p className="text-zinc-400">
          Customer analytics and segmentation.
        </p>

      </div>

    </DashboardLayout>
  )
}