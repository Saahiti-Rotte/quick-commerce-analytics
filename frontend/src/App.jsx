import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"

import Dashboard from "./pages/Dashboard"
import Orders from "./pages/Orders"
import Inventory from "./pages/Inventory"
import Analytics from "./pages/Analytics"
import Customers from "./pages/Customers"

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/orders"
          element={<Orders />}
        />

        <Route
          path="/inventory"
          element={<Inventory />}
        />

        <Route
          path="/analytics"
          element={<Analytics />}
        />

        <Route
          path="/customers"
          element={<Customers />}
        />

      </Routes>

    </BrowserRouter>
  )
}

export default App