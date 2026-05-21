import { useState }
  from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import api from "../services/api";

export default function Login() {

  const navigate =
    useNavigate();

  const [form, setForm] =
    useState({

      email: "",
      password: "",
    });

  async function handleLogin(e) {

    e.preventDefault();

    try {

      const response =
        await api.post(

          "/auth/login",

          form
        );

      localStorage.setItem(

        "token",

        response.data.token
      );

      localStorage.setItem(

        "user",

        JSON.stringify(
          response.data.user
        )
      );

      navigate("/");

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data
          ?.error ||
        "Login failed"
      );
    }
  }

  return (

    <div
      className="
        min-h-screen
        bg-black
        text-white
        flex
        items-center
        justify-center
      "
    >

      <form
        onSubmit={handleLogin}
        className="
          bg-zinc-900
          border
          border-zinc-800
          rounded-2xl
          p-8
          w-full
          max-w-md
          space-y-6
        "
      >

        <div>

          <h1
            className="
              text-4xl
              font-bold
            "
          >

            Login

          </h1>

          <p
            className="
              text-zinc-400
              mt-2
            "
          >

            Access QuickCommerce
            Intelligence.

          </p>

        </div>

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email:
                e.target.value,
            })
          }
          className="
            w-full
            bg-zinc-800
            p-4
            rounded-xl
          "
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password:
                e.target.value,
            })
          }
          className="
            w-full
            bg-zinc-800
            p-4
            rounded-xl
          "
        />

        <button
          type="submit"
          className="
            w-full
            bg-white
            text-black
            font-semibold
            p-4
            rounded-xl
          "
        >

          Login

        </button>

        <p
          className="
            text-zinc-400
            text-center
          "
        >

          Don’t have an account?

          <Link
            to="/register"
            className="
              text-white
              ml-2
            "
          >

            Create Account

          </Link>

        </p>

      </form>

    </div>
  );
}