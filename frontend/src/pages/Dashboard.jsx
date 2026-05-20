import { useEffect, useState } from "react"

import api from "../services/api"

import DashboardLayout from "../layouts/DashboardLayout"

import RevenueChart from "../components/RevenueChart"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  ShoppingCart,
  IndianRupee,
  TrendingUp,
  Users,
} from "lucide-react"

export default function Dashboard() {

  const [analytics, setAnalytics] = useState(null)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  async function fetchAnalytics() {

    try {

      const response = await api.get("/analytics")

      setAnalytics(response.data)

    } catch (error) {

      console.error(error)

    }
  }

  if (!analytics) {
    return (
      <DashboardLayout>

        <div className="p-8 text-zinc-400">
          Loading dashboard...
        </div>

      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>

      <main className="p-8 space-y-8">

        {/* Heading */}
        <div>

          <h2 className="text-5xl font-bold tracking-tight">
            Analytics Dashboard
          </h2>

          <p className="text-zinc-400 mt-3 text-lg">
            Real-time commerce intelligence and AI insights.
          </p>

        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          {/* Orders */}
          <Card className="bg-zinc-900 border-zinc-800">

            <CardHeader className="flex flex-row items-center justify-between">

              <CardTitle className="text-zinc-300 text-sm">
                Total Orders
              </CardTitle>

              <ShoppingCart className="h-5 w-5 text-blue-400" />

            </CardHeader>

            <CardContent>

              <div className="text-4xl font-bold">
                {analytics.totalOrders}
              </div>

              <p className="text-sm text-green-400 mt-2">
                +12.4% this month
              </p>

            </CardContent>

          </Card>

          {/* Revenue */}
          <Card className="bg-zinc-900 border-zinc-800">

            <CardHeader className="flex flex-row items-center justify-between">

              <CardTitle className="text-zinc-300 text-sm">
                Revenue
              </CardTitle>

              <IndianRupee className="h-5 w-5 text-green-400" />

            </CardHeader>

            <CardContent>

              <div className="text-4xl font-bold">
                ₹{analytics.totalRevenue}
              </div>

              <p className="text-sm text-green-400 mt-2">
                +18.2% growth
              </p>

            </CardContent>

          </Card>

          {/* Conversion */}
          <Card className="bg-zinc-900 border-zinc-800">

            <CardHeader className="flex flex-row items-center justify-between">

              <CardTitle className="text-zinc-300 text-sm">
                Conversion
              </CardTitle>

              <TrendingUp className="h-5 w-5 text-purple-400" />

            </CardHeader>

            <CardContent>

              <div className="text-4xl font-bold">
                14.2%
              </div>

              <p className="text-sm text-green-400 mt-2">
                Funnel performance healthy
              </p>

            </CardContent>

          </Card>

          {/* Users */}
          <Card className="bg-zinc-900 border-zinc-800">

            <CardHeader className="flex flex-row items-center justify-between">

              <CardTitle className="text-zinc-300 text-sm">
                Active Users
              </CardTitle>

              <Users className="h-5 w-5 text-orange-400" />

            </CardHeader>

            <CardContent>

              <div className="text-4xl font-bold">
                {analytics.activeUsers}
              </div>

              <p className="text-sm text-green-400 mt-2">
                +6.8% weekly retention
              </p>

            </CardContent>

          </Card>

        </div>

        {/* Revenue Chart */}
        <Card className="bg-zinc-900 border-zinc-800">

          <CardHeader>

            <CardTitle>
              Revenue Trend
            </CardTitle>

          </CardHeader>

          <CardContent>

            <RevenueChart
              data={analytics.revenueTrend}
            />

          </CardContent>

        </Card>

      </main>

    </DashboardLayout>
  )
}