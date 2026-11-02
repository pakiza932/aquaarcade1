import { createContext, useContext, useState } from "react";

// Demo admin account. A real store would check this on a secure backend server.
export const ADMIN_EMAIL = "admin@aquaarcade.com";
export const ADMIN_PASSWORD = "admin123";

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [admin, setAdmin] = useState(() => {
    try {
      return localStorage.getItem("aqua-admin") === "yes";
    } catch {
      return false;
    }
  });

  const adminLogin = (email, password) => {
    if (email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem("aqua-admin", "yes");
      setAdmin(true);
      return { ok: true };
    }
    return { ok: false, error: "Wrong admin email or password." };
  };

  const adminLogout = () => {
    localStorage.removeItem("aqua-admin");
    setAdmin(false);
  };

  return (
    <AdminContext.Provider value={{ admin, adminLogin, adminLogout }}>
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => useContext(AdminContext);
