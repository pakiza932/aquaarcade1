// Orders and users live in the browser's localStorage (no backend needed for this project)
const KEY = "aqua-orders";
export const STATUSES = ["Processing", "Shipped", "Delivered", "Cancelled"];

const readAll = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
};
const writeAll = (list) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    /* ignore storage errors */
  }
};

export const getAllOrders = readAll;
export const getOrders = (email) => readAll().filter((o) => o.userEmail === email);

export function addOrder(order) {
  const all = readAll();
  all.unshift(order);
  writeAll(all);
}

export function updateOrderStatus(id, status) {
  writeAll(readAll().map((o) => (o.id === id ? { ...o, status } : o)));
}

export function getUsers() {
  try {
    return JSON.parse(localStorage.getItem("aqua-users")) || [];
  } catch {
    return [];
  }
}
