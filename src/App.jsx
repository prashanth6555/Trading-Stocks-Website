import { Route, Routes } from "react-router-dom"
import { Layout } from "./components/Layout"
import { Dashboard } from "./pages/Dashboard"
import { Home } from "./pages/Home"
import { Login } from "./pages/Login"
import { NotFound } from "./pages/NotFound"
import { Signup } from "./pages/Signup"
import { StockDetails } from "./pages/StockDetails"
import { Trade } from "./pages/Trade"

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="stock/:symbol" element={<StockDetails />} />
        <Route path="trade" element={<Trade />} />
        <Route path="trade/:symbol" element={<Trade />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
