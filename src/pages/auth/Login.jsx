import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import Logo from "@/components/layout/Logo";
import toast from "react-hot-toast";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

const Login = () => {
  const { login } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.email) e.email = "Email is required";
    if (!form.password) e.password = "Password is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const result = await login(form.email, form.password);
      toast.success("Welcome back to Credify!");
      if (result.role === "admin") nav("/admin");
      else if (result.role === "company") nav("/company");
      else nav("/student-dashboard");
    } catch {
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-layout">
      <div className="auth-left">
        <div
          className="auth-left-blob animate-float"
          style={{
            left: "-10%",
            top: "-15%",
            width: 480,
            height: 480,
            background: "radial-gradient(circle, rgba(16,185,129,0.35) 0%, rgba(5,150,105,0.15) 50%, rgba(2,44,34,0) 70%)",
          }}
        />
        <div
          className="auth-left-blob animate-float"
          style={{
            right: "-10%",
            bottom: "-10%",
            width: 360,
            height: 360,
            background: "radial-gradient(circle, rgba(52,211,153,0.3) 0%, rgba(16,185,129,0.12) 50%, rgba(2,44,34,0) 70%)",
            animationDelay: "-3s",
          }}
        />
        <div className="auth-left-content animate-slide-in-left">
          <Logo size={36} light />
          <h2 className="auth-left-title" style={{ marginTop: 32 }}>
            Welcome back to
            <br />
            Credify
          </h2>
          <p className="auth-left-subtitle">
            Sign in to your Credify dashboard to track projects,
            submissions, and verified certificates.
          </p>
          <div className="auth-feature-list">
            {[
              "Access your private Credify dashboard",
              "Track your submitted work and ratings",
              "Manage your Credify certificates",
              "Keep your project activity private",
            ].map((f, idx) => (
              <div
                key={f}
                className={`auth-feature-item animate-slide-up delay-${(idx + 1) * 100}`}
              >
                <span className="auth-feature-dot animate-pulse-green" />
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-card animate-slide-in-right">
          <div style={{ marginBottom: 28 }} className="animate-scale-in">
            <Logo size={30} />
          </div>
          <h1 className="auth-title animate-slide-up delay-100">Sign In to Credify</h1>
          <p className="auth-subtitle animate-slide-up delay-100">
            Enter your credentials to access your account
          </p>



          <form className="auth-form animate-slide-up delay-200" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">
                Email Address <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <div style={{ position: "relative" }}>
                <Mail
                  size={15}
                  style={{
                    position: "absolute",
                    left: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#64748b",
                  }}
                />
                <input
                  className={`form-input${errors.email ? " error" : ""}`}
                  type="email"
                  placeholder="you@email.com"
                  value={form.email}
                  onChange={set("email")}
                  style={{ paddingLeft: 36 }}
                />
              </div>
              {errors.email && <p className="form-error">{errors.email}</p>}
            </div>

            <div className="form-group">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 6,
                }}
              >
                <label className="form-label" style={{ margin: 0 }}>
                  Password <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <Link
                  to="/forgot-password"
                  style={{
                    fontSize: 12.5,
                    color: "#059669",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  Forgot password?
                </Link>
              </div>
              <div style={{ position: "relative" }}>
                <Lock
                  size={15}
                  style={{
                    position: "absolute",
                    left: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#64748b",
                  }}
                />
                <input
                  className={`form-input${errors.password ? " error" : ""}`}
                  type={showPw ? "text" : "password"}
                  placeholder="Your password"
                  value={form.password}
                  onChange={set("password")}
                  style={{ paddingLeft: 36, paddingRight: 40 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPw((p) => !p)}
                  style={{
                    position: "absolute",
                    right: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#64748b",
                    padding: 0,
                  }}
                >
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.password && (
                <p className="form-error">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block"
              style={{ padding: "13px", fontSize: 15, marginTop: 4 }}
              disabled={loading}
            >
              {loading
                ? "Signing in to Credify…"
                : "Sign In to Credify →"}
            </button>

            <p className="auth-footer-text">
              Don't have a Credify account?{" "}
              <button
                type="button"
                className="auth-footer-link"
                onClick={() => nav("/register")}
              >
                Join free
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
