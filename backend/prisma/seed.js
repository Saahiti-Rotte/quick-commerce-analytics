require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

async function main() {

  console.log("Seeding database...");

  // -----------------------------------
  // USERS
  // -----------------------------------

  const users = [];

  for (let i = 0; i < 100; i++) {

    const user = await prisma.user.create({
      data: {

        name:
          faker.person.fullName(),

        email:
          faker.internet.email(),

        password:
          "hashedpassword",
      },
    });

    users.push(user);
  }

  console.log("Users created");

  // -----------------------------------
  // PRODUCTS
  // -----------------------------------

  const products = [];

  for (let i = 0; i < 20; i++) {

    const product =
      await prisma.product.create({
        data: {

          name:
            faker.commerce.productName(),

          description:
            faker.commerce.productDescription(),

          price: parseFloat(
            faker.commerce.price()
          ),

          image:
            faker.image.url(),

          category:
            faker.commerce.department(),

          inventory: {
            create: {
              stock:
                faker.number.int({
                  min: 10,
                  max: 200,
                }),
            },
          },
        },
      });

    products.push(product);
  }

  console.log("Products created");

  // -----------------------------------
  // ORDERS
  // -----------------------------------

  for (let i = 0; i < 100; i++) {

    console.log(
      `Creating order ${i + 1}`
    );

    const randomUser =
      users[
        Math.floor(
          Math.random() *
          users.length
        )
      ];

    const randomProduct =
      products[
        Math.floor(
          Math.random() *
          products.length
        )
      ];

    const quantity =
      faker.number.int({
        min: 1,
        max: 5,
      });

    const totalPrice =
      randomProduct.price * quantity;

    await prisma.order.create({
      data: {

        totalPrice,

        status: "COMPLETED",

        user: {
          connect: {
            id:
              randomUser.id,
          },
        },

        items: {
          create: [
            {

              quantity,

              price:
                randomProduct.price,

              product: {
                connect: {
                  id:
                    randomProduct.id,
                },
              },
            },
          ],
        },
      },
    });
  }

  console.log("Orders created");

  // -----------------------------------
  // EVENTS
  // -----------------------------------

  const eventTypes = [
    "app_open",
    "search",
    "view_product",
    "add_to_cart",
    "checkout",
    "order_placed",
  ];

  const events = [];

  for (let i = 0; i < 2000; i++) {

    const randomUser =
      users[
        Math.floor(
          Math.random() *
          users.length
        )
      ];

    events.push({

      userId:
        randomUser.id,

      type:
        eventTypes[
          Math.floor(
            Math.random() *
            eventTypes.length
          )
        ],

      metadata: JSON.stringify({

        device:
          faker.helpers.arrayElement([
            "Android",
            "iPhone",
            "Web",
          ]),
      }),
    });
  }

  await prisma.event.createMany({
    data: events,
  });

  console.log("Events created");

  console.log(
    "Database seeding complete"
  );
}

main()
  .catch((e) => {

    console.error(e);

  })
  .finally(async () => {

    await prisma.$disconnect();

  });