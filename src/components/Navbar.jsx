import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useWishlist } from "../context/WishlistContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { totalItems } = useCart();
  const { count } = useWishlist();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo pixel">🌊 AquaArcade</Link>
      <div className="nav-links">
        <NavLink to="/" end>Shop</NavLink>
        <NavLink to="/wishlist">♥ Wishlist <span className="badge">{count}</span></NavLink>
        <NavLink to="/cart" className="inv-link">
          🎒 Inventory <span className="badge">{totalItems}</span>
        </NavLink>
        {user ? (
          <>
            <NavLink to="/orders">Orders</NavLink>
            <span className="hello">Hi, {user.name.split(" ")[0]}</span>
            <button className="ghost small" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <NavLink to="/login" className="login-link">Login</NavLink>
        )}
      </div>
    </nav>
  );
}
