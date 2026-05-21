const express = require("express");

const router = express.Router();

const {
  PrismaClient,
} = require("@prisma/client");

const prisma = new PrismaClient();

router.get("/", async (req, res) => {

  try {

    const users =
      await prisma.user.findMany({
        include: {
          orders: true,
        },
      });

    const churnedUsers =
      users.filter((user) => {

        return (
          user.orders.length <= 1
        );
      });

    const formattedUsers =
      churnedUsers.map((user) => ({

        id: user.id,

        name: user.name,

        email: user.email,

        totalOrders:
          user.orders.length,
      }));

    res.json(formattedUsers);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Internal Server Error",
    });
  }
});

module.exports = router;