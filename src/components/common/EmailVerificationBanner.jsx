import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import { resendVerification } from "@/services/authService";
import toast from "react-hot-toast";
import { Mail, RefreshCw, CheckCircle2 } from "lucide-react";

const EmailVerificationBanner = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  if (!user || user.emailVerified) {
    return null;
  }

  const handleResend = async () => {
    if (cooldown > 0 || loading) return;
    setLoading(true);
    try {
      const res = await resendVerification({ email: user.email });
      toast.success(res.message || "Verification email sent!");
      setSent(true);
      setCooldown(60);

      const interval = setInterval(() => {
        setCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to resend verification email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #fffbe6 0%, #fff3c4 100%)",
        border: "1px solid #ffe58f",
        borderRadius: "10px",
        padding: "14px 20px",
        marginBottom: "24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "16px",
        flexWrap: "wrap",
        boxShadow: "0 2px 8px rgba(250, 173, 20, 0.12)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1, minWidth: "260px" }}>
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "#faad14",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            flexShrink: 0,
          }}
        >
          <Mail size={18} />
        </div>
        <div>
          <h4 style={{ margin: 0, fontSize: "14px", fontWeight: 700, color: "#873800" }}>
            Please verify your email address
          </h4>
          <p style={{ margin: "2px 0 0", fontSize: "13px", color: "#612500" }}>
            We sent a verification link to <strong>{user.email}</strong>. Please check your inbox or spam folder.
          </p>
        </div>
      </div>

      <div>
        <button
          className="btn btn-sm"
          onClick={handleResend}
          disabled={loading || cooldown > 0}
          style={{
            background: sent && cooldown > 0 ? "#52c41a" : "#d48806",
            color: "#ffffff",
            border: "none",
            borderRadius: "6px",
            fontWeight: 600,
            fontSize: "12.5px",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "8px 16px",
            cursor: loading || cooldown > 0 ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
            whiteSpace: "nowrap",
          }}
        >
          {loading ? (
            <>
              <RefreshCw size={13} className="animate-spin" /> Sending...
            </>
          ) : sent && cooldown > 0 ? (
            <>
              <CheckCircle2 size={13} /> Resent! Wait {cooldown}s
            </>
          ) : (
            <>
              <Mail size={13} /> Resend Email Link
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default EmailVerificationBanner;
