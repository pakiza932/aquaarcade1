import { NavLink, Outlet, Link, useNavigate } from "react-router-dom";
import { useAdmin } from "../../context/AdminContext.jsx";

export default function AdminLayout() {
  const { adminLogout } = useAdmin();
  const navigate = useNavigate();

  const handleLogout = () => {
    adminLogout();
    navigate("/admin/login");
  };

  return (
    <div className="admin-shell">
      <aside className="admin-side">
        <div className="logo pixel admin-logo">🌊 Admin</div>
        <NavLink to="/admin" end>📊 Dashboard</NavLink>
        <NavLink to="/admin/products">📦 Products</NavLink>
        <NavLink to="/admin/orders">🧾 Orders</NavLink>
        <NavLink to="/admin/customers">👥 Customers</NavLink>
        <div className="side-spacer" />
        <Link to="/">← View store</Link>
        <button className="ghost small" onClick={handleLogout}>Logout</button>
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
