import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { formatPrice, FREE_DELIVERY_AT } from "../data/products.js";

export default function Cart() {
  const { cart, dispatch, increase, subtotal, delivery, grandTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container center">
        <h2 className="pixel small">Inventory Empty</h2>
        <p>Your backpack is lighter than a jellyfish 🎒</p>
        <Link to="/" className="cta">Go find loot</Link>
      </div>
    );
  }

  const progress = Math.min((subtotal / FREE_DELIVERY_AT) * 100, 100);
  const remaining = FREE_DELIVERY_AT - subtotal;

  return (
    <div className="container">
      <h2 className="pixel small">🎒 Your Inventory</h2>

      <div className="xp">
        <p>
          {remaining > 0
            ? <>Add <b className="price">{formatPrice(remaining)}</b> more to unlock <b>FREE delivery</b></>
            : <>🎉 Level up! <b>FREE delivery unlocked</b></>}
        </p>
        <div className="bar"><div className="fill" style={{ width: `${progress}%` }} /></div>
      </div>

      <div className="cart-list">
        {cart.map((item) => (
          <div className="cart-item" key={item.id}>
            <span className="emoji-sm">{item.emoji}</span>
            <div className="cart-info">
              <h4>{item.title}</h4>
              <span className="price">{formatPrice(item.price)}</span>
            </div>
            <div className="qty">
              <button onClick={() => dispatch({ type: "DEC", id: item.id })}>−</button>
              <span>{item.qty}</span>
              <button onClick={() => increase(item.id)}>+</button>
            </div>
            <strong>{formatPrice(item.price * item.qty)}</strong>
            <button className="ghost" onClick={() => dispatch({ type: "REMOVE", id: item.id })}>✕</button>
          </div>
        ))}
      </div>

      <div className="summary">
        <p>Subtotal <span>{formatPrice(subtotal)}</span></p>
        <p>Delivery <span>{delivery === 0 ? "FREE" : formatPrice(delivery)}</span></p>
        <h3>Total <span className="price">{formatPrice(grandTotal)}</span></h3>
        <div className="summary-actions">
          <button className="ghost" onClick={() => dispatch({ type: "CLEAR" })}>Clear all</button>
          <Link to="/checkout" className="cta">Checkout →</Link>
        </div>
      </div>
    </div>
  );
}
