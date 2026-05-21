require("dotenv").config();

const {
  PrismaClient,
} = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {

  console.log(
    "Seeding experiments..."
  );

  const users =
    await prisma.user.findMany();

  const experimentData = [];

  users.forEach((user) => {

    // RANDOM VARIANT

    const variant =
      Math.random() > 0.5
        ? "control"
        : "treatment";

    // BETTER CONVERSION
    // FOR TREATMENT

    const converted =
      variant === "treatment"
        ? Math.random() > 0.4
        : Math.random() > 0.6;

    experimentData.push({

      name:
        "10% Discount Test",

      variant,

      converted,

      userId: user.id,
    });
  });

  await prisma.experiment.createMany({

    data: experimentData,

  });

  console.log(
    "Experiment data seeded"
  );
}

main()
  .catch((e) => {

    console.error(e);

  })
  .finally(async () => {

    await prisma.$disconnect();

  });