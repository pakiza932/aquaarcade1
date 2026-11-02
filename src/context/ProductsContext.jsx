import { createContext, useContext, useEffect, useState } from "react";
import { products as seed } from "../data/products.js";

const KEY = "aqua-products";
const ProductsContext = createContext();

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY));
    if (Array.isArray(saved) && saved.length) return saved;
  } catch {
    /* use seed data */
  }
  return seed;
}

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(load);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(products));
    } catch {
      /* ignore */
    }
  }, [products]);

  // keep in sync if the admin edits products in another tab
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === KEY) setProducts(load());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const addProduct = (p) =>
    setProducts((prev) => [...prev, { ...p, id: Math.max(0, ...prev.map((x) => x.id)) + 1 }]);
  const updateProduct = (id, patch) =>
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  const deleteProduct = (id) => setProducts((prev) => prev.filter((p) => p.id !== id));

  const changeStock = (items, sign) =>
    setProducts((prev) =>
      prev.map((p) => {
        const it = items.find((i) => i.id === p.id);
        return it ? { ...p, stock: Math.max(0, p.stock + sign * it.qty) } : p;
      })
    );
  const reduceStock = (items) => changeStock(items, -1);
  const restoreStock = (items) => changeStock(items, +1);

  return (
    <ProductsContext.Provider
      value={{ products, addProduct, updateProduct, deleteProduct, reduceStock, restoreStock }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export const useProducts = () => useContext(ProductsContext);
