import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext();

function load() {
  try {
    return JSON.parse(localStorage.getItem("aqua-wishlist")) || [];
  } catch {
    return [];
  }
}

export function WishlistProvider({ children }) {
  const [ids, setIds] = useState(load);

  useEffect(() => {
    localStorage.setItem("aqua-wishlist", JSON.stringify(ids));
  }, [ids]);

  const toggle = (id) =>
    setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  const has = (id) => ids.includes(id);

  return (
    <WishlistContext.Provider value={{ ids, toggle, has, count: ids.length }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
