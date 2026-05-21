const express = require("express");

const router = express.Router();

const { PrismaClient } =
  require("@prisma/client");

const prisma = new PrismaClient();

router.get("/", async (req, res) => {

  try {

    const stages = [
      "app_open",
      "search",
      "view_product",
      "add_to_cart",
      "checkout",
      "order_placed",
    ];

    const funnelData = [];

    for (const stage of stages) {

      const count =
        await prisma.event.count({
          where: {
            type: stage,
          },
        });

      funnelData.push({
        stage,
        users: count,
      });
    }

    // -------------------------
    // DROP-OFF CALCULATION
    // -------------------------

    const funnelWithDropoff =
      funnelData.map((item, index) => {

        if (index === 0) {
          return {
            ...item,
            dropoff: 0,
          };
        }

        const previous =
          funnelData[index - 1].users;

        const current =
          item.users;

        const dropoff =
          previous > 0
            ? (
                (
                  previous - current
                ) /
                previous
              ) * 100
            : 0;

        return {
          ...item,

          dropoff:
            Number(
              dropoff.toFixed(2)
            ),
        };
      });

    res.json(
      funnelWithDropoff
    );

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to fetch funnel analytics",
    });
  }
});

module.exports = router;