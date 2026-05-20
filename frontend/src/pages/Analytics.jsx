import { useEffect, useState } from "react"

import api from "../services/api"

import DashboardLayout from "../layouts/DashboardLayout"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Analytics() {

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

  return (
    <DashboardLayout>

      <main className="p-8 space-y-8">

        {/* Heading */}
        <div>

          <h1 className="text-5xl font-bold">
            Analytics
          </h1>

          <p className="text-zinc-400 mt-3">
            Real-time backend analytics data
          </p>

        </div>

        {/* Loading */}
        {!analytics ? (

          <div className="text-zinc-400">
            Loading analytics...
          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Revenue */}
            <Card className="bg-zinc-900 border-zinc-800">

              <CardHeader>
                <CardTitle>
                  Revenue
                </CardTitle>
              </CardHeader>

              <CardContent>

                <div className="text-4xl font-bold">
                  ₹{analytics.totalRevenue}
                </div>

              </CardContent>

            </Card>

            {/* Orders */}
            <Card className="bg-zinc-900 border-zinc-800">

              <CardHeader>
                <CardTitle>
                  Orders
                </CardTitle>
              </CardHeader>

              <CardContent>

                <div className="text-4xl font-bold">
                  {analytics.totalOrders}
                </div>

              </CardContent>

            </Card>

            {/* Users */}
            <Card className="bg-zinc-900 border-zinc-800">

              <CardHeader>
                <CardTitle>
                  Users
                </CardTitle>
              </CardHeader>

              <CardContent>

                <div className="text-4xl font-bold">
                  {analytics.activeUsers}
                </div>

              </CardContent>

            </Card>

          </div>

        )}

      </main>

    </DashboardLayout>
  )
}