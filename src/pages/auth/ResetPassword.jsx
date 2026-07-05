import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Logo from "@/components/layout/Logo";
import toast from "react-hot-toast";
import { Lock, ArrowLeft } from "lucide-react";
import { resetPassword } from "@/services/authService";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const nav = useNavigate();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Missing password reset token.");
      return;
    }

    if (!password || !confirmPassword) {
      toast.error("Enter and confirm your new password.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    try {
      await resetPassword({ token, password });
      toast.success("Your password has been reset.");
      nav("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reset password.");
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
        background: "#f0f7ff",
        padding: 20,
      }}
    >
      <div
        className="card"
        style={{ width: "100%", maxWidth: 440, padding: "44px" }}
      >
        <div style={{ marginBottom: 28 }}>
          <Logo size={30} />
        </div>
        <h1
          style={{
            fontFamily: "'Clash Display',sans-serif",
            fontSize: 24,
            fontWeight: 700,
            marginBottom: 8,
          }}
        >
          Set a New Credify Password
        </h1>
        <p style={{ color: "#4a6080", fontSize: 14, marginBottom: 28 }}>
          Create a new password for your Credify account.
        </p>
        {!token ? (
          <div style={{ padding: 24, color: "#d14343" }}>
            Invalid password reset link. Please request a new one.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
          >
            <div className="form-group">
              <label className="form-label">New Password</label>
              <div style={{ position: "relative" }}>
                <Lock
                  size={15}
                  style={{
                    position: "absolute",
                    left: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#7a9ec0",
                  }}
                />
                <input
                  className="form-input"
                  type="password"
                  placeholder="New password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ paddingLeft: 36 }}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <div style={{ position: "relative" }}>
                <Lock
                  size={15}
                  style={{
                    position: "absolute",
                    left: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#7a9ec0",
                  }}
                />
                <input
                  className="form-input"
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
              {loading ? "Resetting…" : "Reset Password"}
            </button>
          </form>
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
            color: "#7a9ec0",
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

export default ResetPassword;
