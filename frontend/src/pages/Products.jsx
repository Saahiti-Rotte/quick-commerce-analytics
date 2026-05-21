import {
  useEffect,
  useState,
} from "react";

import Layout
  from "../components/Layout";

import api from "../services/api";

export default function Products() {

  const [products, setProducts] =
    useState([]);

  const user =
    JSON.parse(
      localStorage.getItem(
        "user"
      )
    );

  useEffect(() => {

    fetchProducts();

  }, []);

  async function fetchProducts() {

    try {

      const response =
        await api.get(
          "/products"
        );

      setProducts(
        response.data
      );

    } catch (error) {

      console.error(error);

    }
  }

  async function addToCart(
    productId
  ) {

    try {

      await api.post(

        "/cart/add",

        {

          userId: user.id,

          productId,

          quantity: 1,
        }
      );

      alert(
        "Added to cart"
      );

    } catch (error) {

      console.error(error);

    }
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

            Products

          </h1>

          <p
            className="
              text-zinc-400
              mt-3
            "
          >

            Browse products and
            add them to cart.

          </p>

        </div>

        {/* PRODUCT GRID */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3
            gap-6
          "
        >

          {products.map((product) => (

            <div
              key={product.id}
              className="
                bg-zinc-900
                border
                border-zinc-800
                rounded-2xl
                overflow-hidden
              "
            >

              <img
                src={product.image}
                alt={product.name}
                className="
                  h-56
                  w-full
                  object-cover
                "
              />

              <div className="p-6">

                <h2
                  className="
                    text-2xl
                    font-bold
                  "
                >

                  {product.name}

                </h2>

                <p
                  className="
                    text-zinc-400
                    mt-2
                  "
                >

                  {product.category}

                </p>

                <div
                  className="
                    text-3xl
                    font-bold
                    mt-4
                  "
                >

                  ₹{product.price}

                </div>

                <p
                  className="
                    text-zinc-400
                    mt-3
                  "
                >

                  Stock:
                  {" "}
                  {
                    product.inventory
                      ?.stock
                  }

                </p>

                <button
                  onClick={() =>
                    addToCart(
                      product.id
                    )
                  }
                  className="
                    mt-6
                    w-full
                    bg-white
                    text-black
                    py-3
                    rounded-xl
                    font-semibold
                  "
                >

                  Add to Cart

                </button>

              </div>

            </div>
          ))}

        </div>

      </div>

    </Layout>
  );
}