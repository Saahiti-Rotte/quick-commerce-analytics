import {
  useEffect,
  useState,
} from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import Layout
  from "../components/Layout";

import api from "../services/api";

export default function Dashboard() {

  const [analytics, setAnalytics] =
    useState(null);

  useEffect(() => {

    async function fetchData() {

      try {

        const response =
          await api.get(
            "/analytics"
          );

        setAnalytics(
          response.data
        );

      } catch (error) {

        console.error(error);

      }
    }

    fetchData();

  }, []);

  if (!analytics) {

    return (

      <Layout>

        <div className="text-white">

          Loading dashboard...

        </div>

      </Layout>
    );
  }

  return (

    <Layout>

      <div className="space-y-8">

        {/* HEADER */}

        <div>

          <h1
            className="
              text-5xl
              font-bold
              text-white
            "
          >

            Dashboard

          </h1>

          <p
            className="
              text-zinc-400
              mt-3
            "
          >

            Commerce analytics
            and operational
            intelligence.

          </p>

        </div>

        {/* KPI CARDS */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3
            gap-6
          "
        >

          {/* REVENUE */}

          <div
            className="
              bg-zinc-900
              border
              border-zinc-800
              rounded-2xl
              p-6
            "
          >

            <p
              className="
                text-zinc-400
              "
            >

              Total Revenue

            </p>

            <h2
              className="
                text-4xl
                font-bold
                mt-3
              "
            >

              ₹
              {
                analytics
                  .totalRevenue
              }

            </h2>

          </div>

          {/* ORDERS */}

          <div
            className="
              bg-zinc-900
              border
              border-zinc-800
              rounded-2xl
              p-6
            "
          >

            <p
              className="
                text-zinc-400
              "
            >

              Total Orders

            </p>

            <h2
              className="
                text-4xl
                font-bold
                mt-3
              "
            >

              {
                analytics
                  .totalOrders
              }

            </h2>

          </div>

          {/* USERS */}

          <div
            className="
              bg-zinc-900
              border
              border-zinc-800
              rounded-2xl
              p-6
            "
          >

            <p
              className="
                text-zinc-400
              "
            >

              Active Users

            </p>

            <h2
              className="
                text-4xl
                font-bold
                mt-3
              "
            >

              {
                analytics
                  .activeUsers
              }

            </h2>

          </div>

        </div>

        {/* CHART */}

        <div
          className="
            bg-zinc-900
            border
            border-zinc-800
            rounded-2xl
            p-6
          "
        >

          <div
            className="
              flex
              items-center
              justify-between
              mb-6
            "
          >

            <h2
              className="
                text-2xl
                font-bold
              "
            >

              Revenue Trend

            </h2>

          </div>

          <div className="h-96">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <LineChart
                data={
                  analytics
                    .revenueTrend
                }
              >

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#ffffff"
                  strokeWidth={3}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </Layout>
  );
}