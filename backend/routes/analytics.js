const express = require("express");

const router = express.Router();

const {
  PrismaClient,
} = require("@prisma/client");

const prisma = new PrismaClient();


// -----------------------------------
// USERS
// -----------------------------------

router.get(
  "/users",

  async (req, res) => {

    try {

      const users =
        await prisma.user.findMany({

          select: {

            id: true,
            name: true,
          },
        });

      res.json(users);

    } catch (error) {

      console.error(error);

      res.status(500).json({

        error:
          "Internal Server Error",
      });
    }
  }
);


// -----------------------------------
// ANALYTICS
// -----------------------------------

router.get("/", async (req, res) => {

  try {

    const revenueAggregate =
      await prisma.order.aggregate({

        _sum: {
          totalPrice: true,
        },
      });

    const totalOrders =
      await prisma.order.count();

    const activeUsers =
      await prisma.user.count();

    const orders =
      await prisma.order.findMany({

        orderBy: {

          createdAt: "asc",
        },
      });

    const revenueMap = {};

    orders.forEach((order) => {

      const month =
        new Date(order.createdAt)
          .toLocaleString(
            "default",
            { month: "short" }
          );

      if (!revenueMap[month]) {

        revenueMap[month] = 0;
      }

      revenueMap[month] +=
        order.totalPrice;
    });

    const revenueTrend =
      Object.entries(revenueMap)
        .map(([month, revenue]) => ({

          month,

          revenue:
            Number(
              revenue.toFixed(2)
            ),
        }));

    res.json({

      totalRevenue:
        revenueAggregate._sum
          .totalPrice || 0,

      totalOrders,

      activeUsers,

      revenueTrend,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      error:
        "Internal Server Error",
    });
  }
});

module.exports = router;