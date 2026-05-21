const express = require("express");

const router = express.Router();

const {
  PrismaClient,
} = require("@prisma/client");

const prisma = new PrismaClient();


// -----------------------------------
// GET ALL PRODUCTS
// -----------------------------------

router.get("/", async (req, res) => {

  try {

    const products =
      await prisma.product.findMany({

        include: {
          inventory: true,
        },

        orderBy: {
          createdAt: "desc",
        },
      });

    res.json(products);

  } catch (error) {

    console.error(error);

    res.status(500).json({

      error:
        "Internal Server Error",

    });
  }
});


// -----------------------------------
// CREATE PRODUCT
// -----------------------------------

router.post("/", async (req, res) => {

  try {

    const {
      name,
      description,
      price,
      image,
      category,
      stock,
    } = req.body;

    const product =
      await prisma.product.create({

        data: {

          name,

          description,

          price:
            parseFloat(price),

          image,

          category,

          inventory: {

            create: {

              stock:
                parseInt(stock),
            },
          },
        },

        include: {
          inventory: true,
        },
      });

    res.json(product);

  } catch (error) {

    console.error(error);

    res.status(500).json({

      error:
        "Internal Server Error",

    });
  }
});


// -----------------------------------
// UPDATE INVENTORY
// -----------------------------------

router.patch(
  "/inventory/:id",

  async (req, res) => {

    try {

      const { stock } =
        req.body;

      const inventory =
        await prisma.inventory.update({

          where: {

            productId:
              req.params.id,
          },

          data: {

            stock:
              parseInt(stock),
          },
        });

      res.json(inventory);

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