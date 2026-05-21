const express = require("express");

const router = express.Router();

const {
  PrismaClient,
} = require("@prisma/client");

const prisma = new PrismaClient();

router.get("/", async (req, res) => {

  try {

    const experiments =
      await prisma.experiment.findMany();

    // CONTROL

    const control =
      experiments.filter(
        (exp) =>
          exp.variant === "control"
      );

    const controlConverted =
      control.filter(
        (exp) => exp.converted
      ).length;

    const controlRate =
      controlConverted /
      control.length;

    // TREATMENT

    const treatment =
      experiments.filter(
        (exp) =>
          exp.variant ===
          "treatment"
      );

    const treatmentConverted =
      treatment.filter(
        (exp) => exp.converted
      ).length;

    const treatmentRate =
      treatmentConverted /
      treatment.length;

    // LIFT

    const lift =
      (
        (treatmentRate -
          controlRate) *
        100
      ).toFixed(2);

    // --------------------
    // Z TEST
    // --------------------

    const pooledRate =
      (
        controlConverted +
        treatmentConverted
      ) /
      (
        control.length +
        treatment.length
      );

    const standardError =
      Math.sqrt(

        pooledRate *

        (1 - pooledRate) *

        (
          (1 / control.length) +

          (1 /
            treatment.length)
        )
      );

    const zScore =
      (
        treatmentRate -
        controlRate
      ) / standardError;

    // SIMPLE P-VALUE APPROX

    const significant =
      Math.abs(zScore) > 1.96;

    res.json({

      experiment:
        "10% Discount Test",

      control: {

        users:
          control.length,

        conversions:
          controlConverted,

        conversionRate:
          (
            controlRate * 100
          ).toFixed(2),
      },

      treatment: {

        users:
          treatment.length,

        conversions:
          treatmentConverted,

        conversionRate:
          (
            treatmentRate * 100
          ).toFixed(2),
      },

      lift,

      zScore:
        zScore.toFixed(2),

      significance:
        significant
          ? "Significant"
          : "Not Significant",
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