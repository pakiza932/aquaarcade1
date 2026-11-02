import { useState } from "react";
import { useProducts } from "../../context/ProductsContext.jsx";
import { productCategories, rarities, formatPrice } from "../../data/products.js";

const EMPTY = {
  title: "", category: productCategories[0], price: "", stock: "", emoji: "",
  rarity: "Common", description: "", power: 70, comfort: 70, durability: 70,
};

export default function AdminProducts() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [editing, setEditing] = useState(null); // null | "new" | product id
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [search, setSearch] = useState("");
  const [saved, setSaved] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const openNew = () => {
    setForm(EMPTY);
    setErrors({});
    setEditing("new");
  };

  const openEdit = (p) => {
    setForm({
      title: p.title, category: p.category, price: p.price, stock: p.stock, emoji: p.emoji,
      rarity: p.rarity, description: p.description,
      power: p.stats.power, comfort: p.stats.comfort, durability: p.stats.durability,
    });
    setErrors({});
    setEditing(p.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const validate = () => {
    const e = {};
    if (form.title.trim().length < 3) e.title = "Title must be at least 3 characters";
    if (!(Number(form.price) > 0)) e.price = "Enter a price greater than 0";
    if (!Number.isInteger(Number(form.stock)) || Number(form.stock) < 0 || form.stock === "")
      e.stock = "Stock must be a whole number (0 or more)";
    if (!form.emoji.trim()) e.emoji = "Add an emoji for the product picture";
    if (form.description.trim().length < 10) e.description = "Description must be at least 10 characters";
    ["power", "comfort", "durability"].forEach((k) => {
      if (!(Number(form[k]) >= 0 && Number(form[k]) <= 100)) e[k] = "0 to 100";
    });
    return e;
  };

  const handleSave = (e) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length) return;

    const data = {
      title: form.title.trim(),
      category: form.category,
      price: Number(form.price),
      stock: Number(form.stock),
      emoji: form.emoji.trim(),
      rarity: form.rarity,
      description: form.description.trim(),
      stats: { power: Number(form.power), comfort: Number(form.comfort), durability: Number(form.durability) },
    };
    if (editing === "new") {
      addProduct(data);
      setSaved(`"${data.title}" added to the store.`);
    } else {
      updateProduct(editing, data);
      setSaved(`"${data.title}" updated.`);
    }
    setEditing(null);
  };

  const handleDelete = (p) => {
    if (window.confirm(`Delete "${p.title}" from the store?`)) {
      deleteProduct(p.id);
      setSaved(`"${p.title}" deleted.`);
    }
  };

  const list = products.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));

  const Err = ({ k }) => (errors[k] ? <small className="err">{errors[k]}</small> : null);

  return (
    <>
      <div className="admin-head">
        <h2 className="pixel small">📦 Products ({products.length})</h2>
        <button className="cta-btn" onClick={openNew}>+ Add product</button>
      </div>

      {saved && <div className="notice">{saved}</div>}

      {editing !== null && (
        <form className="panel admin-form" onSubmit={handleSave}>
          <h3>{editing === "new" ? "Add new product" : "Edit product"}</h3>
          <div className="form-grid">
            <div className="field"><label>Title</label>
              <input name="title" value={form.title} onChange={handleChange} /><Err k="title" /></div>
            <div className="field"><label>Category</label>
              <select name="category" value={form.category} onChange={handleChange}>
                {productCategories.map((c) => <option key={c}>{c}</option>)}
              </select></div>
            <div className="field"><label>Price (Rs)</label>
              <input name="price" type="number" value={form.price} onChange={handleChange} /><Err k="price" /></div>
            <div className="field"><label>Stock quantity</label>
              <input name="stock" type="number" value={form.stock} onChange={handleChange} /><Err k="stock" /></div>
            <div className="field"><label>Emoji (picture)</label>
              <input name="emoji" maxLength={4} value={form.emoji} onChange={handleChange} placeholder="🎮" /><Err k="emoji" /></div>
            <div className="field"><label>Rarity</label>
              <select name="rarity" value={form.rarity} onChange={handleChange}>
                {rarities.map((r) => <option key={r}>{r}</option>)}
              </select></div>
          </div>
          <div className="field"><label>Description</label>
            <textarea name="description" rows="3" value={form.description} onChange={handleChange} /><Err k="description" /></div>
          <div className="form-grid three">
            {["power", "comfort", "durability"].map((k) => (
              <div className="field" key={k}><label>{k} (0-100)</label>
                <input name={k} type="number" value={form[k]} onChange={handleChange} /><Err k={k} /></div>
            ))}
          </div>
          <div className="form-actions">
            <button type="button" className="ghost" onClick={() => setEditing(null)}>Cancel</button>
            <button type="submit" className="cta-btn">Save product</button>
          </div>
        </form>
      )}

      <input className="admin-search" placeholder="🔍 Search products..." value={search}
        onChange={(e) => setSearch(e.target.value)} />

      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr><th></th><th>Product</th><th>Category</th><th>Rarity</th><th>Price</th><th>Stock</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {list.map((p) => (
              <tr key={p.id}>
                <td className="t-emoji">{p.emoji}</td>
                <td>{p.title}</td>
                <td>{p.category}</td>
                <td>{p.rarity}</td>
                <td className="price">{formatPrice(p.price)}</td>
                <td className={p.stock <= 5 ? "price" : ""}>{p.stock === 0 ? "Sold out" : p.stock}</td>
                <td className="t-actions">
                  <button className="small" onClick={() => openEdit(p)}>Edit</button>{" "}
                  <button className="ghost small" onClick={() => handleDelete(p)}>Delete</button>
                </td>
              </tr>
            ))}
            {list.length === 0 && <tr><td colSpan="7" className="muted">No products found.</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}
