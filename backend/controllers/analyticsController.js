export async function getAnalytics(req, res) {

  try {

    res.json({

      totalRevenue: 124000,

      totalOrders: 1842,

      activeUsers: 892,

      revenueTrend: [
        { month: "Jan", revenue: 12000 },
        { month: "Feb", revenue: 18000 },
        { month: "Mar", revenue: 22000 },
        { month: "Apr", revenue: 26000 },
        { month: "May", revenue: 30000 },
      ],

    })

  } catch (error) {

    console.error(error)

    res.status(500).json({
      error: "Internal server error",
    })

  }
}