import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useWishlist } from "../context/WishlistContext.jsx";
import { formatPrice } from "../data/products.js";
import { Octopus, Fish } from "./Sea.jsx";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { has, toggle } = useWishlist();
  const liked = has(product.id);
  const topIsOctopus = product.id % 2 === 0;
  const soldOut = product.stock === 0;

  return (
    <div className={`card rarity-${product.rarity.toLowerCase()}`}>
      {topIsOctopus ? (
        <Octopus className="mascot top" />
      ) : (
        <Fish className="mascot top fishy" color="#ff4d6d" />
      )}
      <Fish className="mascot side" />

      <span className="rarity-tag">{product.rarity}</span>
      <Link to={`/product/${product.id}`} className="art">
        <span className="emoji float">{product.emoji}</span>
      </Link>
      <span className="cat">{product.category}</span>
      <h3>{product.title}</h3>
      {soldOut && <span className="stock-note out">Sold out</span>}
      {!soldOut && product.stock <= 5 && <span className="stock-note low">Only {product.stock} left!</span>}
      <div className="card-bottom">
        <strong className="price">{formatPrice(product.price)}</strong>
        <div className="card-actions">
          <button
            className={`heart ${liked ? "liked" : ""}`}
            onClick={() => toggle(product.id)}
            aria-label="Toggle wishlist"
          >
            {liked ? "♥" : "♡"}
          </button>
          <button disabled={soldOut} onClick={() => addToCart(product)}>
            {soldOut ? "Sold out" : "+ Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
