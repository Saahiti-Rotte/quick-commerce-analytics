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

    const cohorts = {};

    users.forEach((user) => {

      const signupWeek =
        new Date(
          user.createdAt
        ).toLocaleDateString();

      if (!cohorts[signupWeek]) {

        cohorts[signupWeek] = {
          totalUsers: 0,
          retainedUsers: 0,
        };
      }

      cohorts[signupWeek]
        .totalUsers++;

      if (
        user.orders.length > 0
      ) {

        cohorts[signupWeek]
          .retainedUsers++;
      }
    });

    const retentionData =
      Object.entries(cohorts).map(
        ([week, data]) => ({

          cohort: week,

          users:
            data.totalUsers,

          retained:
            data.retainedUsers,

          retentionRate:
            (
              (data.retainedUsers /
                data.totalUsers) *
              100
            ).toFixed(2),
        })
      );

    res.json(retentionData);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Internal Server Error",
    });
  }
});

module.exports = router;