import { useEffect, useState } from "react";
import { getAllOrders } from "./storage.js";

// Orders list that also refreshes when another browser tab changes the data
export function useAllOrders() {
  const [orders, setOrders] = useState(getAllOrders);
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "aqua-orders") setOrders(getAllOrders());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);
  return [orders, setOrders];
}
