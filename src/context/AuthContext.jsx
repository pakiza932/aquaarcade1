import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

// Passwords are never stored as plain text: we save a SHA-256 hash instead.
async function hash(text) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

const read = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => read("aqua-session", null));

  const signup = async (name, email, password) => {
    const users = read("aqua-users", []);
    const mail = email.trim().toLowerCase();
    if (users.some((u) => u.email === mail)) {
      return { ok: false, error: "An account with this email already exists." };
    }
    users.push({ name: name.trim(), email: mail, passHash: await hash(password) });
    localStorage.setItem("aqua-users", JSON.stringify(users));
    const session = { name: name.trim(), email: mail };
    localStorage.setItem("aqua-session", JSON.stringify(session));
    setUser(session);
    return { ok: true };
  };

  const login = async (email, password) => {
    const users = read("aqua-users", []);
    const mail = email.trim().toLowerCase();
    const found = users.find((u) => u.email === mail);
    if (!found || found.passHash !== (await hash(password))) {
      return { ok: false, error: "Wrong email or password." };
    }
    const session = { name: found.name, email: found.email };
    localStorage.setItem("aqua-session", JSON.stringify(session));
    setUser(session);
    return { ok: true };
  };

  const logout = () => {
    localStorage.removeItem("aqua-session");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
