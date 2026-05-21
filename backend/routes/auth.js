const express = require("express");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const {
  PrismaClient,
} = require("@prisma/client");

const prisma = new PrismaClient();

const router = express.Router();


// -----------------------------------
// REGISTER
// -----------------------------------

router.post(
  "/register",

  async (req, res) => {

    try {

      const {
        name,
        email,
        password,
      } = req.body;

      // EXISTING USER

      const existingUser =
        await prisma.user.findUnique({

          where: {
            email,
          },
        });

      if (existingUser) {

        return res.status(400).json({

          error:
            "User already exists",
        });
      }

      // HASH PASSWORD

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      // CREATE USER

      const user =
        await prisma.user.create({

          data: {

            name,

            email,

            password:
              hashedPassword,
          },
        });

      res.json(user);

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
// LOGIN
// -----------------------------------

router.post(
  "/login",

  async (req, res) => {

    try {

      const {
        email,
        password,
      } = req.body;

      // FIND USER

      const user =
        await prisma.user.findUnique({

          where: {
            email,
          },
        });

      if (!user) {

        return res.status(400).json({

          error:
            "Invalid credentials",
        });
      }

      // PASSWORD CHECK

      const validPassword =
        await bcrypt.compare(

          password,

          user.password
        );

      if (!validPassword) {

        return res.status(400).json({

          error:
            "Invalid credentials",
        });
      }

      // TOKEN

      const token =
        jwt.sign(

          {

            id: user.id,

            role: user.role,
          },

          "supersecretkey",

          {

            expiresIn: "7d",
          }
        );

      res.json({

        token,

        user: {

          id: user.id,

          name: user.name,

          email: user.email,

          role: user.role,
        },
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

module.exports = router;