const express = require("express");

const router = express.Router();

const {
  PrismaClient,
} = require("@prisma/client");

const prisma = new PrismaClient();


// -----------------------------------
// GET USER CART
// -----------------------------------

router.get(
  "/:userId",

  async (req, res) => {

    try {

      const cart =
        await prisma.cart.findUnique({

          where: {

            userId:
              req.params.userId,
          },

          include: {

            items: {

              include: {

                product: true,
              },
            },
          },
        });

      res.json(cart);

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
// ADD TO CART
// -----------------------------------

router.post(
  "/add",

  async (req, res) => {

    try {

      const {
        userId,
        productId,
        quantity,
      } = req.body;

      // FIND OR CREATE CART

      let cart =
        await prisma.cart.findUnique({

          where: {
            userId,
          },
        });

      if (!cart) {

        cart =
          await prisma.cart.create({

            data: {

              user: {

                connect: {
                  id: userId,
                },
              },
            },
          });
      }

      // CHECK EXISTING ITEM

      const existingItem =
        await prisma.cartItem.findFirst({

          where: {

            cartId: cart.id,

            productId,
          },
        });

      if (existingItem) {

        await prisma.cartItem.update({

          where: {

            id:
              existingItem.id,
          },

          data: {

            quantity:
              existingItem.quantity +
              quantity,
          },
        });

      } else {

        await prisma.cartItem.create({

          data: {

            quantity,

            cart: {

              connect: {

                id: cart.id,
              },
            },

            product: {

              connect: {

                id: productId,
              },
            },
          },
        });
      }

      res.json({

        success: true,
      });

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
// REMOVE ITEM
// -----------------------------------

router.delete(
  "/remove/:itemId",

  async (req, res) => {

    try {

      await prisma.cartItem.delete({

        where: {

          id:
            req.params.itemId,
        },
      });

      res.json({

        success: true,
      });

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
// CHECKOUT
// -----------------------------------

router.post(
  "/checkout",

  async (req, res) => {

    try {

      const { userId } =
        req.body;

      const cart =
        await prisma.cart.findUnique({

          where: {

            userId,
          },

          include: {

            items: {

              include: {

                product: {

                  include: {

                    inventory: true,
                  },
                },
              },
            },
          },
        });

      if (
        !cart ||
        cart.items.length === 0
      ) {

        return res.status(400).json({

          error:
            "Cart is empty",
        });
      }

      // TOTAL PRICE

      let totalPrice = 0;

      cart.items.forEach((item) => {

        totalPrice +=
          item.product.price *
          item.quantity;
      });

      // CREATE ORDER

      const order =
        await prisma.order.create({

          data: {

            totalPrice,

            status: "COMPLETED",

            user: {

              connect: {

                id: userId,
              },
            },

            items: {

              create:
                cart.items.map(
                  (item) => ({

                    quantity:
                      item.quantity,

                    price:
                      item.product.price,

                    product: {

                      connect: {

                        id:
                          item.product.id,
                      },
                    },
                  })
                ),
            },
          },
        });

      // UPDATE INVENTORY

      for (const item of cart.items) {

        await prisma.inventory.update({

          where: {

            productId:
              item.product.id,
          },

          data: {

            stock:
              item.product.inventory
                .stock -
              item.quantity,
          },
        });
      }

      // CLEAR CART

      await prisma.cartItem.deleteMany({

        where: {

          cartId: cart.id,
        },
      });

      res.json(order);

    } catch (error) {

      console.error(error);

      res.status(500).json({

        error:
          "Internal Server Error",
      });
    }
  }
);

module.exports = router;