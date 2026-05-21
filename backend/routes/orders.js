const express = require("express");

const router = express.Router();

const {
  PrismaClient,
} = require("@prisma/client");

const prisma = new PrismaClient();


// -----------------------------------
// GET ALL ORDERS
// -----------------------------------

router.get("/", async (req, res) => {

  try {

    const orders =
      await prisma.order.findMany({

        include: {

          user: true,

          items: {

            include: {

              product: true,
            },
          },
        },

        orderBy: {

          createdAt: "desc",
        },
      });

    res.json(orders);

  } catch (error) {

    console.error(error);

    res.status(500).json({

      error:
        "Internal Server Error",
    });
  }
});


// -----------------------------------
// CREATE ORDER
// -----------------------------------

router.post("/", async (req, res) => {

  try {

    const {
      userId,
      productId,
      quantity,
    } = req.body;

    // PRODUCT

    const product =
      await prisma.product.findUnique({

        where: {
          id: productId,
        },

        include: {
          inventory: true,
        },
      });

    if (!product) {

      return res.status(404).json({

        error:
          "Product not found",
      });
    }

    // STOCK CHECK

    if (
      product.inventory.stock <
      quantity
    ) {

      return res.status(400).json({

        error:
          "Insufficient stock",
      });
    }

    // TOTAL PRICE

    const totalPrice =
      product.price * quantity;

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

            create: [

              {

                quantity,

                price:
                  product.price,

                product: {

                  connect: {

                    id: productId,
                  },
                },
              },
            ],
          },
        },

        include: {

          user: true,

          items: {

            include: {

              product: true,
            },
          },
        },
      });

    // UPDATE INVENTORY

    await prisma.inventory.update({

      where: {

        productId:
          productId,
      },

      data: {

        stock:
          product.inventory.stock -
          quantity,
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
});

module.exports = router;