import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

export default function Layout({

  children,

}) {

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const user =
    JSON.parse(

      localStorage.getItem(
        "user"
      )
    );

  function logout() {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    navigate("/login");
  }

  const navItems = [

    {
      label: "Dashboard",
      path: "/",
    },

    {
      label: "Products",
      path: "/products",
    },

    {
      label: "Cart",
      path: "/cart",
    },

    {
      label: "Orders",
      path: "/orders",
    },

    {
      label: "Funnel",
      path: "/funnel",
    },

    {
      label: "Retention",
      path: "/retention",
    },

    {
      label: "Churn",
      path: "/churn",
    },

    {
      label: "Experiments",
      path: "/experiments",
    },
  ];

  return (

    <div
      className="
        min-h-screen
        bg-black
        text-white
        flex
      "
    >

      {/* SIDEBAR */}

      <aside
        className="
          w-72
          bg-zinc-950
          border-r
          border-zinc-800
          p-6
          flex
          flex-col
        "
      >

        {/* LOGO */}

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
              text-zinc-400
              mt-2
            "
          >

            Commerce Intelligence
            Platform

          </p>

        </div>

        {/* NAVIGATION */}

        <nav
          className="
            flex
            flex-col
            gap-2
          "
        >

          {navItems.map((item) => (

            <Link
              key={item.path}
              to={item.path}
              className={`
                p-3
                rounded-xl
                transition
                ${
                  location.pathname ===
                  item.path

                    ? "bg-white text-black"

                    : "hover:bg-zinc-900"
                }
              `}
            >

              {item.label}

            </Link>
          ))}

        </nav>

        {/* USER */}

        <div
          className="
            mt-auto
            pt-8
            border-t
            border-zinc-800
          "
        >

          <p
            className="
              font-semibold
              text-lg
            "
          >

            {user?.name}

          </p>

          <p
            className="
              text-zinc-400
              text-sm
              mt-1
            "
          >

            {user?.email}

          </p>

          <button
            onClick={logout}
            className="
              mt-5
              bg-white
              text-black
              px-4
              py-3
              rounded-xl
              w-full
              font-semibold
            "
          >

            Logout

          </button>

        </div>

      </aside>

      {/* MAIN CONTENT */}

      <main
        className="
          flex-1
          p-8
          overflow-y-auto
        "
      >

        {children}

      </main>

    </div>
  );
}