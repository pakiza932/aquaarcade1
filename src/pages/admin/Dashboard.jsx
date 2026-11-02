import { Link } from "react-router-dom";
import { useAllOrders } from "../../hooks.js";
import { useProducts } from "../../context/ProductsContext.jsx";
import { getUsers, STATUSES } from "../../storage.js";
import { formatPrice } from "../../data/products.js";

export default function Dashboard() {
  const [orders] = useAllOrders();
  const { products } = useProducts();
  const customers = getUsers().length;

  const valid = orders.filter((o) => o.status !== "Cancelled");
  const revenue = valid.reduce((sum, o) => sum + o.total, 0);
  const pending = orders.filter((o) => o.status === "Processing").length;
  const lowStock = products.filter((p) => p.stock <= 5);

  const counts = STATUSES.map((s) => ({ s, n: orders.filter((o) => o.status === s).length }));
  const maxN = Math.max(1, ...counts.map((c) => c.n));

  const sold = {};
  valid.forEach((o) =>
    o.items.forEach((i) => {
      sold[i.id] = sold[i.id] || { title: i.title, emoji: i.emoji, qty: 0 };
      sold[i.id].qty += i.qty;
    })
  );
  const top = Object.values(sold).sort((a, b) => b.qty - a.qty).slice(0, 5);

  const cards = [
    ["💰", "Revenue", formatPrice(revenue)],
    ["🧾", "Total orders", orders.length],
    ["⏳", "Pending orders", pending],
    ["👥", "Customers", customers],
    ["📦", "Products", products.length],
    ["⚠️", "Low / out of stock", lowStock.length],
  ];

  return (
    <>
      <h2 className="pixel small">📊 Dashboard</h2>

      <div className="stat-cards">
        {cards.map(([icon, label, value]) => (
          <div className="stat-card" key={label}>
            <span className="stat-icon">{icon}</span>
            <div>
              <div className="muted">{label}</div>
              <strong className="stat-value">{value}</strong>
            </div>
          </div>
        ))}
      </div>

      <div className="admin-two">
        <section className="panel">
          <h3>Orders by status</h3>
          {counts.map(({ s, n }) => (
            <div className="chart-row" key={s}>
              <span>{s}</span>
              <div className="bar"><div className={`fill ${s === "Cancelled" ? "coral" : ""}`} style={{ width: `${(n / maxN) * 100}%` }} /></div>
              <b>{n}</b>
            </div>
          ))}
        </section>

        <section className="panel">
          <h3>Top selling products</h3>
          {top.length === 0 ? (
            <p className="muted">No sales yet.</p>
          ) : (
            top.map((t) => (
              <div className="order-item" key={t.title}>
                <span>{t.emoji} {t.title}</span>
                <b>{t.qty} sold</b>
              </div>
            ))
          )}
        </section>
      </div>

      <div className="admin-two">
        <section className="panel">
          <h3>Recent orders</h3>
          {orders.length === 0 ? (
            <p className="muted">No orders yet.</p>
          ) : (
            orders.slice(0, 5).map((o) => (
              <div className="order-item" key={o.id}>
                <span>{o.id} · {o.customer.name}</span>
                <span><span className={`status ${o.status.toLowerCase()}`}>{o.status}</span> {formatPrice(o.total)}</span>
              </div>
            ))
          )}
          <Link to="/admin/orders" className="panel-link">Manage orders →</Link>
        </section>

        <section className="panel">
          <h3>Stock alerts</h3>
          {lowStock.length === 0 ? (
            <p className="muted">All products are well stocked.</p>
          ) : (
            lowStock.map((p) => (
              <div className="order-item" key={p.id}>
                <span>{p.emoji} {p.title}</span>
                <b className={p.stock === 0 ? "price" : ""}>{p.stock === 0 ? "Sold out" : `${p.stock} left`}</b>
              </div>
            ))
          )}
          <Link to="/admin/products" className="panel-link">Manage products →</Link>
        </section>
      </div>
    </>
  );
}
