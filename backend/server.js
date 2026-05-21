const express = require("express");

const cors = require("cors");

// ROUTES

const authRoutes =
  require("./routes/auth");

const analyticsRoutes =
  require("./routes/analytics");

const funnelRoutes =
  require("./routes/funnel");

const retentionRoutes =
  require("./routes/retention");

const churnRoutes =
  require("./routes/churn");

const experimentRoutes =
  require("./routes/experiments");

const productRoutes =
  require("./routes/products");

const orderRoutes =
  require("./routes/orders");

const cartRoutes =
  require("./routes/cart");

const aiRoutes =
  require("./routes/ai");

// APP

const app = express();

const PORT = 5000;

// MIDDLEWARE

app.use(cors());

app.use(express.json());

// ROOT TEST ROUTE

app.get("/", (req, res) => {

  res.send(
    "Backend is running"
  );

});

// API ROUTES

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/analytics",
  analyticsRoutes
);

app.use(
  "/api/funnel",
  funnelRoutes
);

app.use(
  "/api/retention",
  retentionRoutes
);

app.use(
  "/api/churn",
  churnRoutes
);

app.use(
  "/api/experiments",
  experimentRoutes
);

app.use(
  "/api/products",
  productRoutes
);

app.use(
  "/api/orders",
  orderRoutes
);

app.use(
  "/api/cart",
  cartRoutes
);

app.use(
  "/api/ai",
  aiRoutes
);

// START SERVER

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});