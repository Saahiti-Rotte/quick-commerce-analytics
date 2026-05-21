import { Link } from "react-router-dom";

import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Funnel as FunnelIcon,
  BarChart3,
  AlertTriangle,
  FlaskConical,
} from "lucide-react";

export default function Sidebar() {

  return (

    <aside
      className="
        w-64
        min-h-screen
        bg-zinc-950
        border-r
        border-zinc-800
        p-6
      "
    >

      <div className="mb-10">

        <h1
          className="
            text-3xl
            font-bold
          "
        >

          QuickCommerce

        </h1>

        <p
          className="
            text-zinc-500
            mt-2
          "
        >

          Commerce Intelligence

        </p>

      </div>

      <nav
        className="
          flex
          flex-col
          gap-3
        "
      >

        <Link
          to="/"
          className="
            flex
            items-center
            gap-3
            p-3
            rounded-xl
            hover:bg-zinc-900
          "
        >

          <LayoutDashboard size={20} />

          Dashboard

        </Link>

        <Link
          to="/products"
          className="
            flex
            items-center
            gap-3
            p-3
            rounded-xl
            hover:bg-zinc-900
          "
        >

          <Package size={20} />

          Products

        </Link>

        <Link
          to="/orders"
          className="
            flex
            items-center
            gap-3
            p-3
            rounded-xl
            hover:bg-zinc-900
          "
        >

          <ShoppingCart size={20} />

          Orders

        </Link>

        <Link
          to="/funnel"
          className="
            flex
            items-center
            gap-3
            p-3
            rounded-xl
            hover:bg-zinc-900
          "
        >

          <FunnelIcon size={20} />

          Funnel

        </Link>

        <Link
          to="/retention"
          className="
            flex
            items-center
            gap-3
            p-3
            rounded-xl
            hover:bg-zinc-900
          "
        >

          <BarChart3 size={20} />

          Retention

        </Link>

        <Link
          to="/churn"
          className="
            flex
            items-center
            gap-3
            p-3
            rounded-xl
            hover:bg-zinc-900
          "
        >

          <AlertTriangle size={20} />

          Churn

        </Link>

        <Link
          to="/experiments"
          className="
            flex
            items-center
            gap-3
            p-3
            rounded-xl
            hover:bg-zinc-900
          "
        >

          <FlaskConical size={20} />

          Experiments

        </Link>

      </nav>

    </aside>
  );
}