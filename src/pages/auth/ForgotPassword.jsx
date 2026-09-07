import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/layout/Logo";
import toast from "react-hot-toast";
import { Mail, ArrowLeft } from "lucide-react";
import { requestPasswordReset } from "@/services/authService";

const ForgotPassword = () => {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Enter your Credify email address");
      return;
    }
    setLoading(true);
    try {
      await requestPasswordReset({ email });
      setSent(true);
      toast.success("Reset link sent! Check your inbox.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f8fafc",
        padding: 20,
      }}
    >
      <div
        className="card animate-scale-in"
        style={{ width: "100%", maxWidth: 440, padding: "44px" }}
      >
        <div style={{ marginBottom: 28 }} className="animate-scale-in">
          <Logo size={30} />
        </div>
        {!sent ? (
          <>
            <h1
              className="animate-slide-up delay-100"
              style={{
                fontFamily: "'Plus Jakarta Sans',sans-serif",
                fontSize: 24,
                fontWeight: 700,
                marginBottom: 8,
              }}
            >
              Reset Your Credify Password
            </h1>
            <p className="animate-slide-up delay-100" style={{ color: "#475569", fontSize: 14, marginBottom: 28 }}>
              Enter your Credify email and we'll send you a reset link.
            </p>
            <form
              className="animate-slide-up delay-200"
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: 16 }}
            >
              <div className="form-group">
                <label className="form-label">Credify Email Address</label>
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
                    className="form-input"
                    type="email"
                    placeholder="you@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ paddingLeft: 36 }}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-block"
                style={{ padding: "12px" }}
                disabled={loading}
              >
                {loading ? "Sending…" : "Send Reset Link"}
              </button>
            </form>
          </>
        ) : (
          <div style={{ textAlign: "center" }} className="animate-scale-in">
            <Mail size={52} className="animate-float" style={{ color: "#059669", marginBottom: 16 }} />
            <h2
              style={{
                fontFamily: "'Plus Jakarta Sans',sans-serif",
                fontSize: 22,
                fontWeight: 700,
                marginBottom: 10,
              }}
            >
              Check Your Email
            </h2>
            <p
              style={{
                color: "#475569",
                fontSize: 14,
                lineHeight: 1.65,
                marginBottom: 28,
              }}
            >
              We sent a Credify password reset link to <strong>{email}</strong>.
            </p>
            <button
              className="btn btn-primary btn-block"
              onClick={() => nav("/login")}
            >
              Back to Credify Sign In
            </button>
          </div>
        )}
        <button
          onClick={() => nav("/login")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginTop: 20,
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#64748b",
            fontSize: 13.5,
            fontWeight: 500,
          }}
        >
          <ArrowLeft size={14} /> Back to Sign In
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
