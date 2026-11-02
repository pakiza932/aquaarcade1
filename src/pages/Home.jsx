import { useState } from "react";
import ProductCard from "../components/ProductCard.jsx";
import Waves from "../components/Waves.jsx";
import { Gator } from "../components/Sea.jsx";
import { categories } from "../data/products.js";
import { useProducts } from "../context/ProductsContext.jsx";

export default function Home() {
  const { products } = useProducts();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");

  let list = products.filter(
    (p) =>
      (category === "All" || p.category === category) &&
      p.title.toLowerCase().includes(search.toLowerCase())
  );
  if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
  if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);

  return (
    <>
      <header className="hero">
        {Array.from({ length: 14 }).map((_, i) => (
          <span key={i} className="bubble" />
        ))}
        <div className="hero-inner">
          <div className="hero-content">
            <p className="blink">▶ PRESS START</p>
            <h1 className="pixel">Dive Into<br />Gaming Gear</h1>
            <p className="sub">Premium consoles, headsets and accessories from the deepest ocean of deals.</p>
            <a href="#loot" className="cta">Explore the Depths</a>
          </div>
          <Gator />
        </div>
        <Waves />
      </header>

      <section className="container" id="loot">
        <div className="levels">
          {categories.map((c) => (
            <button
              key={c}
              className={`pill ${category === c ? "active" : ""}`}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="filters">
          <input
            placeholder="🔍 Search for loot..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="default">Sort: Featured</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>

        <p className="found">Loot found: {list.length}</p>

        {list.length === 0 ? (
          <p className="center">No treasure here. Try another search 🐚</p>
        ) : (
          <div className="grid">
            {list.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
