import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import { useWishlist } from "../context/WishlistContext.jsx";
import { useProducts } from "../context/ProductsContext.jsx";

export default function Wishlist() {
  const { ids } = useWishlist();
  const { products } = useProducts();
  const items = products.filter((p) => ids.includes(p.id));

  if (items.length === 0) {
    return (
      <div className="container center">
        <h2 className="pixel small">♥ Wishlist Empty</h2>
        <p>Tap the heart on any product to save it here.</p>
        <Link to="/" className="cta">Browse loot</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 className="pixel small">♥ My Wishlist ({items.length})</h2>
      <div className="grid wish-grid">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
