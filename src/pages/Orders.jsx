import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { getOrders } from "../storage.js";
import { formatPrice } from "../data/products.js";

export default function Orders() {
  const { user } = useAuth();
  const orders = getOrders(user.email);

  if (orders.length === 0) {
    return (
      <div className="container center">
        <h2 className="pixel small">No Orders Yet</h2>
        <p>Your completed quests will appear here.</p>
        <Link to="/" className="cta">Start shopping</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 className="pixel small">📜 My Orders ({orders.length})</h2>
      {orders.map((o) => (
        <div className="order-card" key={o.id}>
          <div className="order-head">
            <div>
              <strong className="price">{o.id}</strong>
              <div className="muted">{new Date(o.date).toLocaleString()}</div>
            </div>
            <span className={`status ${o.status.toLowerCase()}`}>{o.status}</span>
          </div>

          {o.items.map((i) => (
            <div className="order-item" key={i.id}>
              <span>{i.emoji} {i.title} × {i.qty}</span>
              <span>{formatPrice(i.price * i.qty)}</span>
            </div>
          ))}

          <div className="order-foot">
            <span>Payment: {o.payment}</span>
            <span>Delivery: {o.delivery === 0 ? "FREE" : formatPrice(o.delivery)}</span>
            <strong className="price">Total: {formatPrice(o.total)}</strong>
          </div>
          <div className="muted order-addr">Ship to: {o.customer.name}, {o.customer.address}</div>
        </div>
      ))}
    </div>
  );
}
