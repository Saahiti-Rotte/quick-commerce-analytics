import {
  useEffect,
  useState,
} from "react";

import Layout
  from "../components/Layout";

import api from "../services/api";

export default function Cart() {

  const [cart, setCart] =
    useState(null);

  const user =
    JSON.parse(
      localStorage.getItem(
        "user"
      )
    );

  useEffect(() => {

    fetchCart();

  }, []);

  async function fetchCart() {

    try {

      const response =
        await api.get(

          `/cart/${user.id}`
        );

      setCart(
        response.data
      );

    } catch (error) {

      console.error(error);

    }
  }

  async function removeItem(
    itemId
  ) {

    try {

      await api.delete(

        `/cart/remove/${itemId}`
      );

      fetchCart();

    } catch (error) {

      console.error(error);

    }
  }

  async function checkout() {

    try {

      await api.post(

        "/cart/checkout",

        {

          userId: user.id,
        }
      );

      alert(
        "Order placed successfully"
      );

      fetchCart();

    } catch (error) {

      console.error(error);

    }
  }

  let total = 0;

  if (cart?.items) {

    cart.items.forEach((item) => {

      total +=
        item.product.price *
        item.quantity;
    });
  }

  return (

    <Layout>

      <div className="space-y-8">

        <div>

          <h1
            className="
              text-5xl
              font-bold
              text-white
            "
          >

            Shopping Cart

          </h1>

          <p
            className="
              text-zinc-400
              mt-3
            "
          >

            Review cart items
            and checkout.

          </p>

        </div>

        {/* CART ITEMS */}

        <div className="space-y-4">

          {cart?.items?.map((item) => (

            <div
              key={item.id}
              className="
                bg-zinc-900
                border
                border-zinc-800
                rounded-2xl
                p-6
                flex
                justify-between
                items-center
              "
            >

              <div>

                <h2
                  className="
                    text-2xl
                    font-bold
                  "
                >

                  {
                    item.product.name
                  }

                </h2>

                <p
                  className="
                    text-zinc-400
                    mt-2
                  "
                >

                  Quantity:
                  {" "}
                  {item.quantity}

                </p>

                <p
                  className="
                    text-zinc-400
                  "
                >

                  ₹
                  {
                    item.product.price
                  }

                </p>

              </div>

              <button
                onClick={() =>
                  removeItem(
                    item.id
                  )
                }
                className="
                  bg-red-500
                  px-4
                  py-2
                  rounded-lg
                "
              >

                Remove

              </button>

            </div>
          ))}

        </div>

        {/* TOTAL */}

        <div
          className="
            bg-zinc-900
            border
            border-zinc-800
            rounded-2xl
            p-6
            flex
            justify-between
            items-center
          "
        >

          <div>

            <p
              className="
                text-zinc-400
              "
            >

              Cart Total

            </p>

            <h2
              className="
                text-4xl
                font-bold
                mt-2
              "
            >

              ₹{total}

            </h2>

          </div>

          <button
            onClick={checkout}
            className="
              bg-white
              text-black
              px-6
              py-3
              rounded-xl
              font-semibold
            "
          >

            Checkout

          </button>

        </div>

      </div>

    </Layout>
  );
}