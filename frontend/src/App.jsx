import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/Login";

import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";

import Products from "./pages/Products";

import Orders from "./pages/Orders";

import Cart from "./pages/Cart";

import Funnel from "./pages/Funnel";

import Retention from "./pages/Retention";

import Churn from "./pages/Churn";

import Experiments from "./pages/Experiments";

import ProtectedRoute
  from "./components/ProtectedRoute";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* REGISTER */}

        <Route
          path="/register"
          element={<Register />}
        />

        {/* LOGIN */}

        <Route
          path="/login"
          element={<Login />}
        />

        {/* DASHBOARD */}

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* PRODUCTS */}

        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />

        {/* ORDERS */}

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

        {/* CART */}

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        {/* FUNNEL */}

        <Route
          path="/funnel"
          element={
            <ProtectedRoute>
              <Funnel />
            </ProtectedRoute>
          }
        />

        {/* RETENTION */}

        <Route
          path="/retention"
          element={
            <ProtectedRoute>
              <Retention />
            </ProtectedRoute>
          }
        />

        {/* CHURN */}

        <Route
          path="/churn"
          element={
            <ProtectedRoute>
              <Churn />
            </ProtectedRoute>
          }
        />

        {/* EXPERIMENTS */}

        <Route
          path="/experiments"
          element={
            <ProtectedRoute>
              <Experiments />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;