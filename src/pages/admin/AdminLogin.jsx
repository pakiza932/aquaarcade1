import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAdmin } from "../../context/AdminContext.jsx";

export default function AdminLogin() {
  const { admin, adminLogin } = useAdmin();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  if (admin) return <Navigate to="/admin" replace />;

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = adminLogin(form.email, form.password);
    if (!res.ok) return setError(res.error);
    navigate("/admin", { replace: true });
  };

  return (
    <div className="container">
      <form className="auth" onSubmit={handleSubmit}>
        <h2 className="pixel small">🛡️ Admin Login</h2>
        <p className="hint">Restricted area. Store managers only.</p>
        {error && <div className="form-error">{error}</div>}
        <div className="field">
          <input placeholder="Admin email" value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </div>
        <div className="field">
          <input type="password" placeholder="Password" value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })} />
        </div>
        <button type="submit" className="cta-btn">Login</button>
        <p className="switch"><Link to="/">← Back to store</Link></p>
      </form>
    </div>
  );
}
