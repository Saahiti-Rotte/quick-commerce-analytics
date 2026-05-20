import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts"

export default function RevenueChart({ data }) {
  return (
    <div className="h-[350px] w-full">

      <ResponsiveContainer width="100%" height="100%">

        <AreaChart data={data}>

          <defs>
            <linearGradient
              id="colorRevenue"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor="#3B82F6"
                stopOpacity={0.4}
              />

              <stop
                offset="95%"
                stopColor="#3B82F6"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#27272A"
          />

          <XAxis
            dataKey="month"
            stroke="#A1A1AA"
          />

          <YAxis
            stroke="#A1A1AA"
          />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#3B82F6"
            fillOpacity={1}
            fill="url(#colorRevenue)"
            strokeWidth={3}
          />

        </AreaChart>

      </ResponsiveContainer>

    </div>
  )
}