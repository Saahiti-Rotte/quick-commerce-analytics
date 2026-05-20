-- CreateTable
CREATE TABLE "Analytics" (
    "id" SERIAL NOT NULL,
    "totalRevenue" INTEGER NOT NULL,
    "totalOrders" INTEGER NOT NULL,
    "activeUsers" INTEGER NOT NULL,

    CONSTRAINT "Analytics_pkey" PRIMARY KEY ("id")
);
