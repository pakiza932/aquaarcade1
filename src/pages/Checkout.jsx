import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useProducts } from "../context/ProductsContext.jsx";
import { formatPrice } from "../data/products.js";
import { addOrder } from "../storage.js";

const PK_MOBILE = /^(\+92|0)?3\d{9}$/;
const clean = (s) => s.replace(/[\s-]/g, "");

const PAYMENTS = [
  { id: "cod", label: "Cash on Delivery", note: "Pay when your order arrives" },
  { id: "card", label: "Debit / Credit Card", note: "Demo only - no real payment" },
  { id: "wallet", label: "JazzCash / Easypaisa", note: "Demo only - no real payment" },
];

export default function Checkout() {
  const { cart, dispatch, subtotal, delivery, grandTotal } = useCart();
  const { user } = useAuth();
  const { products, reduceStock } = useProducts();

  const [form, setForm] = useState({ name: user?.name || "", email: user?.email || "", phone: "", address: "" });
  const [pay, setPay] = useState("cod");
  const [card, setCard] = useState({ number: "", expiry: "", cvv: "" });
  const [wallet, setWallet] = useState({ provider: "JazzCash", number: "" });
  const [errors, setErrors] = useState({});
  const [order, setOrder] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Player name is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email";
    if (!PK_MOBILE.test(clean(form.phone))) e.phone = "Enter a valid Pakistani mobile number (03XXXXXXXXX)";
    if (form.address.trim().length < 10) e.address = "Enter your full delivery address";
    if (pay === "card") {
      if (!/^\d{16}$/.test(clean(card.number))) e.cardNumber = "Enter a 16-digit card number";
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(card.expiry)) e.expiry = "Use MM/YY format";
      if (!/^\d{3}$/.test(card.cvv)) e.cvv = "Enter the 3-digit CVV";
    }
    if (pay === "wallet" && !PK_MOBILE.test(clean(wallet.number))) {
      e.walletNumber = "Enter a valid account number (03XXXXXXXXX)";
    }
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length) return;

    const short = cart.find((i) => {
      const live = products.find((p) => p.id === i.id);
      return !live || i.qty > live.stock;
    });
    if (short) {
      setErrors({ stock: `Sorry, "${short.title}" does not have enough stock. Please update your inventory.` });
      return;
    }

    // Only the last 4 digits are kept. Full card details are never stored.
    let payment = "Cash on Delivery";
    if (pay === "card") payment = "Card •••• " + clean(card.number).slice(-4);
    if (pay === "wallet") payment = `${wallet.provider} •••• ${clean(wallet.number).slice(-4)}`;

    const newOrder = {
      id: "AQ-" + Date.now().toString().slice(-6),
      date: new Date().toISOString(),
      status: "Processing",
      userEmail: user.email,
      customer: { name: form.name, email: form.email, phone: form.phone, address: form.address },
      items: cart.map(({ id, title, emoji, price, qty }) => ({ id, title, emoji, price, qty })),
      subtotal,
      delivery,
      total: grandTotal,
      payment,
    };
    addOrder(newOrder);
    reduceStock(newOrder.items);
    setOrder(newOrder);
    dispatch({ type: "CLEAR" });
  };

  if (order) {
    return (
      <div className="container center">
        <h2 className="pixel small">🏆 Quest Complete!</h2>
        <p>Order <strong className="price">{order.id}</strong> confirmed. Thank you, {order.customer.name}!</p>
        <p>Payment: {order.payment} · Total: {formatPrice(order.total)}</p>
        <Link to="/orders" className="cta">View my orders</Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container center">
        <h2 className="pixel small">Nothing to checkout</h2>
        <Link to="/" className="cta">Go to shop</Link>
      </div>
    );
  }

  const Field = ({ name, placeholder }) => (
    <div className="field">
      <input name={name} placeholder={placeholder} value={form[name]} onChange={handleChange} />
      {errors[name] && <small className="err">{errors[name]}</small>}
    </div>
  );

  return (
    <div className="container checkout">
      <form onSubmit={handleSubmit}>
        <h2 className="pixel small">Checkout</h2>
        {Field({ name: "name", placeholder: "Player name" })}
        {Field({ name: "email", placeholder: "Email" })}
        {Field({ name: "phone", placeholder: "Mobile (03XXXXXXXXX)" })}
        <div className="field">
          <textarea name="address" rows="3" placeholder="Delivery address" value={form.address} onChange={handleChange} />
          {errors.address && <small className="err">{errors.address}</small>}
        </div>

        <h3 className="pay-title">Payment method</h3>
        <div className="pay-options">
          {PAYMENTS.map((p) => (
            <label key={p.id} className={`pay-option ${pay === p.id ? "selected" : ""}`}>
              <input type="radio" name="pay" checked={pay === p.id} onChange={() => setPay(p.id)} />
              <span><b>{p.label}</b><br /><small>{p.note}</small></span>
            </label>
          ))}
        </div>

        {pay === "card" && (
          <div className="pay-fields">
            <div className="field">
              <input placeholder="Card number (16 digits)" inputMode="numeric" value={card.number}
                onChange={(e) => setCard({ ...card, number: e.target.value })} />
              {errors.cardNumber && <small className="err">{errors.cardNumber}</small>}
            </div>
            <div className="two-col">
              <div className="field">
                <input placeholder="MM/YY" value={card.expiry}
                  onChange={(e) => setCard({ ...card, expiry: e.target.value })} />
                {errors.expiry && <small className="err">{errors.expiry}</small>}
              </div>
              <div className="field">
                <input placeholder="CVV" inputMode="numeric" maxLength={3} value={card.cvv}
                  onChange={(e) => setCard({ ...card, cvv: e.target.value })} />
                {errors.cvv && <small className="err">{errors.cvv}</small>}
              </div>
            </div>
          </div>
        )}

        {pay === "wallet" && (
          <div className="pay-fields">
            <div className="field">
              <select value={wallet.provider} onChange={(e) => setWallet({ ...wallet, provider: e.target.value })}>
                <option>JazzCash</option>
                <option>Easypaisa</option>
              </select>
            </div>
            <div className="field">
              <input placeholder="Account number (03XXXXXXXXX)" value={wallet.number}
                onChange={(e) => setWallet({ ...wallet, number: e.target.value })} />
              {errors.walletNumber && <small className="err">{errors.walletNumber}</small>}
            </div>
          </div>
        )}

        {errors.stock && <div className="form-error">{errors.stock}</div>}
        <button type="submit" className="cta-btn">Place Order · {formatPrice(grandTotal)}</button>
      </form>

      <aside className="summary">
        <h3>Order Summary</h3>
        {cart.map((i) => (
          <p key={i.id}>{i.emoji} {i.title} × {i.qty} <span>{formatPrice(i.price * i.qty)}</span></p>
        ))}
        <hr />
        <p>Subtotal <span>{formatPrice(subtotal)}</span></p>
        <p>Delivery <span>{delivery === 0 ? "FREE" : formatPrice(delivery)}</span></p>
        <h3>Total <span className="price">{formatPrice(grandTotal)}</span></h3>
      </aside>
    </div>
  );
}
