import { useState } from "react";

import { useNavigate, Link }
  from "react-router-dom";

import api from "../services/api";

export default function Register() {

  const navigate =
    useNavigate();

  const [form, setForm] =
    useState({

      name: "",
      email: "",
      password: "",
    });

  async function handleRegister(e) {

    e.preventDefault();

    try {

      await api.post(

        "/auth/register",

        form
      );

      alert(
        "Account created successfully"
      );

      navigate("/login");

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data
          ?.error ||
        "Registration failed"
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
        onSubmit={handleRegister}
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

            Create Account

          </h1>

          <p
            className="
              text-zinc-400
              mt-2
            "
          >

            Join QuickCommerce
            Intelligence.

          </p>

        </div>

        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name:
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

          Create Account

        </button>

        <p
          className="
            text-zinc-400
            text-center
          "
        >

          Already have an account?

          <Link
            to="/login"
            className="
              text-white
              ml-2
            "
          >

            Login

          </Link>

        </p>

      </form>

    </div>
  );
}