import { useState } from "react";
import { useAllOrders } from "../../hooks.js";
import { useProducts } from "../../context/ProductsContext.jsx";
import { getAllOrders, updateOrderStatus, STATUSES } from "../../storage.js";
import { formatPrice } from "../../data/products.js";

export default function AdminOrders() {
  const [orders, setOrders] = useAllOrders();
  const { restoreStock } = useProducts();
  const [filter, setFilter] = useState("All");

  const changeStatus = (order, status) => {
    if (status === order.status) return;
    updateOrderStatus(order.id, status);
    if (status === "Cancelled") restoreStock(order.items); // put the items back in stock
    setOrders(getAllOrders());
  };

  const shown = filter === "All" ? orders : orders.filter((o) => o.status === filter);

  return (
    <>
      <div className="admin-head">
        <h2 className="pixel small">🧾 Orders ({orders.length})</h2>
        <select className="status-filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option>All</option>
          {STATUSES.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      {shown.length === 0 && <p className="muted">No orders to show.</p>}

      {shown.map((o) => (
        <div className="order-card" key={o.id}>
          <div className="order-head">
            <div>
              <strong className="price">{o.id}</strong>
              <div className="muted">{new Date(o.date).toLocaleString()}</div>
            </div>
            <label className="status-edit">
              Status:{" "}
              <select
                value={o.status}
                disabled={o.status === "Cancelled"}
                onChange={(e) => changeStatus(o, e.target.value)}
                aria-label={`Status of ${o.id}`}
              >
                {STATUSES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </label>
          </div>

          <div className="muted">
            Customer: <b>{o.customer.name}</b> · {o.customer.email} · {o.customer.phone}
          </div>
          <div className="muted order-addr">Address: {o.customer.address}</div>

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
        </div>
      ))}
    </>
  );
}
