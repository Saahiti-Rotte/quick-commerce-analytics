const express = require("express")

const router = express.Router()

router.get("/", (req, res) => {
  res.json({
    totalRevenue: 2980000,
    totalOrders: 5001,
    activeUsers: 12400,

    revenueTrend: [
      { month: "Jan", revenue: 120000 },
      { month: "Feb", revenue: 180000 },
      { month: "Mar", revenue: 240000 },
      { month: "Apr", revenue: 320000 },
      { month: "May", revenue: 410000 },
      { month: "Jun", revenue: 520000 },
    ],
  })
})

module.exports = router