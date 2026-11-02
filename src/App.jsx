import { Routes, Route, Link, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Toast from "./components/Toast.jsx";
import SoundToggle from "./components/SoundToggle.jsx";
import RequireAuth from "./components/RequireAuth.jsx";
import RequireAdmin from "./components/RequireAdmin.jsx";
import Home from "./pages/Home.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Auth from "./pages/Auth.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import Orders from "./pages/Orders.jsx";
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import AdminProducts from "./pages/admin/AdminProducts.jsx";
import AdminOrders from "./pages/admin/AdminOrders.jsx";
import AdminCustomers from "./pages/admin/AdminCustomers.jsx";
import { STUDENT } from "./config.js";

export default function App() {
  const { pathname } = useLocation();
  const isAdminArea = pathname.startsWith("/admin");

  return (
    <>
      {!isAdminArea && <Navbar />}
      <Routes>
        {/* ---- store ---- */}
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Auth mode="login" />} />
        <Route path="/signup" element={<Auth mode="signup" />} />
        <Route path="/checkout" element={<RequireAuth><Checkout /></RequireAuth>} />
        <Route path="/orders" element={<RequireAuth><Orders /></RequireAuth>} />

        {/* ---- admin panel ---- */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<RequireAdmin><AdminLayout /></RequireAdmin>}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="customers" element={<AdminCustomers />} />
        </Route>

        <Route path="*" element={<div className="container center"><h2>404 - Lost at sea 🌊</h2></div>} />
      </Routes>

      {!isAdminArea && (
        <footer className="footer">
          <span className="pixel">AquaArcade</span> © 2026 · Built with React.js ·{" "}
          <Link to="/admin/login" className="admin-link">Admin Panel</Link>
          <br />
          Developed by <b>{STUDENT.name}</b> · Roll No: <b>{STUDENT.roll}</b> · Submitted to: <b>{STUDENT.teacher}</b>
        </footer>
      )}
      <Toast />
      {!isAdminArea && <SoundToggle />}
    </>
  );
}
