import { useAllOrders } from "../../hooks.js";
import { getUsers } from "../../storage.js";
import { formatPrice } from "../../data/products.js";

export default function AdminCustomers() {
  const [orders] = useAllOrders();
  const users = getUsers();

  const rows = users.map((u) => {
    const mine = orders.filter((o) => o.userEmail === u.email);
    const spent = mine.filter((o) => o.status !== "Cancelled").reduce((s, o) => s + o.total, 0);
    return { ...u, count: mine.length, spent };
  });

  return (
    <>
      <h2 className="pixel small">👥 Customers ({rows.length})</h2>
      <div className="table-wrap">
        <table className="table">
          <thead><tr><th>Name</th><th>Email</th><th>Orders</th><th>Total spent</th></tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.email}>
                <td>{r.name}</td>
                <td>{r.email}</td>
                <td>{r.count}</td>
                <td className="price">{formatPrice(r.spent)}</td>
              </tr>
            ))}
            {rows.length === 0 && <tr><td colSpan="4" className="muted">No customers have signed up yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}
