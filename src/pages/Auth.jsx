import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Auth({ mode }) {
  const isSignup = mode === "signup";
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const e = {};
    if (isSignup && !form.name.trim()) e.name = "Player name is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email";
    if (form.password.length < 6) e.password = "Password must be at least 6 characters";
    if (isSignup && form.confirm !== form.password) e.confirm = "Passwords do not match";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length) return;
    setBusy(true);
    const res = isSignup
      ? await signup(form.name, form.email, form.password)
      : await login(form.email, form.password);
    setBusy(false);
    if (!res.ok) {
      setErrors({ form: res.error });
      return;
    }
    navigate(from, { replace: true });
  };

  return (
    <div className="container">
      <form className="auth" onSubmit={handleSubmit}>
        <h2 className="pixel small">{isSignup ? "Create Account" : "Player Login"}</h2>
        <p className="hint">
          {location.state?.from
            ? "Please log in to continue to checkout."
            : isSignup ? "Join AquaArcade and start collecting loot." : "Welcome back, diver!"}
        </p>

        {errors.form && <div className="form-error">{errors.form}</div>}

        {isSignup && (
          <div className="field">
            <input name="name" placeholder="Player name" value={form.name} onChange={handleChange} />
            {errors.name && <small className="err">{errors.name}</small>}
          </div>
        )}
        <div className="field">
          <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
          {errors.email && <small className="err">{errors.email}</small>}
        </div>
        <div className="field">
          <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
          {errors.password && <small className="err">{errors.password}</small>}
        </div>
        {isSignup && (
          <div className="field">
            <input name="confirm" type="password" placeholder="Confirm password" value={form.confirm} onChange={handleChange} />
            {errors.confirm && <small className="err">{errors.confirm}</small>}
          </div>
        )}

        <button type="submit" className="cta-btn" disabled={busy}>
          {busy ? "Please wait..." : isSignup ? "Sign Up" : "Login"}
        </button>

        <p className="switch">
          {isSignup ? (
            <>Already have an account? <Link to="/login" state={location.state}>Login</Link></>
          ) : (
            <>New here? <Link to="/signup" state={location.state}>Create an account</Link></>
          )}
        </p>
      </form>
    </div>
  );
}
