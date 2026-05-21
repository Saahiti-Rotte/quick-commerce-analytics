const express = require("express");

const {
  PrismaClient,
} = require("@prisma/client");

const prisma =
  new PrismaClient();

const router =
  express.Router();


// -----------------------------------
// AI CHURN ANALYSIS
// -----------------------------------

router.get(
  "/churn/:userId",

  async (req, res) => {

    try {

      const userId =
        req.params.userId;

      // FETCH USER

      const user =
        await prisma.user.findUnique({

          where: {
            id: userId,
          },

          include: {

            orders: true,

            events: true,

            cart: {

              include: {

                items: true,
              },
            },
          },
        });

      // USER NOT FOUND

      if (!user) {

        return res.status(404).json({

          error:
            "User not found",
        });
      }

      // ANALYTICS

      const totalOrders =
        user.orders.length;

      const totalSpent =
        user.orders.reduce(

          (sum, order) =>

            sum +
            Number(
              order.totalPrice
            ),

          0
        );

      const lastOrder =
        user.orders.length > 0

          ? user.orders[
              user.orders.length - 1
            ].createdAt

          : "No orders";

      const eventCount =
        user.events.length;

      const cartItems =
        user.cart?.items
          ?.length || 0;

      // MOCK AI RESPONSE

      const insight = `
Customer Churn Analysis

Customer Name:
${user.name}

Behavior Summary:
• Total Orders: ${totalOrders}
• Total Spent: ₹${totalSpent}
• Total Events: ${eventCount}
• Remaining Cart Items: ${cartItems}

Likely Churn Indicators:
• Declining engagement activity
• Lower ordering frequency
• Potential price sensitivity
• Reduced interaction over time

Recommended Retention Actions:
• Personalized discount offers
• Push notification campaigns
• Loyalty rewards
• Re-engagement emails
• Product recommendations

Business Insight:
This customer appears recoverable through targeted retention strategies and incentive-based engagement.
`;

      // RETURN RESPONSE

      res.json({

        insight,
      });

    } catch (error) {

      console.error(
        "AI ERROR:",
        error
      );

      res.status(500).json({

        error:
          "AI analysis failed",
      });
    }
  }
);

module.exports = router;