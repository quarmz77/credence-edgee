import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Logo from "@/components/layout/Logo";
import toast from "react-hot-toast";
import { CheckCircle, XCircle, Loader2, ArrowLeft, Mail } from "lucide-react";
import { verifyEmail, resendVerification } from "@/services/authService";
import useAuth from "@/hooks/useAuth";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const nav = useNavigate();
  const { user, fetchUser } = useAuth();
  const token = searchParams.get("token");
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState(false);
  const [resendEmail, setResendEmail] = useState("");
  const [resending, setResending] = useState(false);

  useEffect(() => {
    const confirmEmail = async () => {
      if (!token) {
        setStatus("invalid");
        return;
      }

      setLoading(true);
      try {
        await verifyEmail(token);
        setStatus("success");
        toast.success("Email verified successfully!");
        if (fetchUser) {
          fetchUser();
        }
      } catch (error) {
        setStatus("failed");
        toast.error(error.response?.data?.message || "Failed to verify email.");
      } finally {
        setLoading(false);
      }
    };

    confirmEmail();
  }, [token, fetchUser]);

  const handleResend = async (e) => {
    e.preventDefault();
    const targetEmail = resendEmail.trim() || user?.email;
    if (!targetEmail) {
      toast.error("Please enter your email address.");
      return;
    }
    setResending(true);
    try {
      const res = await resendVerification({ email: targetEmail });
      toast.success(res.message || "Verification email sent!");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to resend verification email.");
    } finally {
      setResending(false);
    }
  };

  const getMessage = () => {
    if (status === "invalid") {
      return {
        title: "Invalid Verification Link",
        message: "No verification token was provided. Please check your email link or request a new one below.",
      };
    }

    if (status === "success") {
      return {
        title: "Email Verified!",
        message: "Your Credify account has been successfully confirmed. You now have full access to all features.",
      };
    }

    if (status === "failed") {
      return {
        title: "Verification Failed",
        message: "This link is invalid or has expired. Request a new verification link below.",
      };
    }

    return {
      title: "Verifying your email...",
      message: "Please wait while we confirm your email address.",
    };
  };

  const { title, message } = getMessage();

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
        style={{ width: "100%", maxWidth: 460, padding: "40px" }}
      >
        <div style={{ marginBottom: 24, textAlign: "center" }}>
          <Logo size={32} />
        </div>
        <div style={{ textAlign: "center" }}>
          {status === "pending" && (
            <Loader2
              size={52}
              className="animate-spin"
              style={{ color: "#1565c0", marginBottom: 16 }}
            />
          )}
          {status === "success" && (
            <CheckCircle
              size={56}
              style={{ color: "#16a34a", marginBottom: 16 }}
            />
          )}
          {(status === "failed" || status === "invalid") && (
            <XCircle
              size={56}
              style={{ color: "#dc2626", marginBottom: 16 }}
            />
          )}

          <h1
            style={{
              fontFamily: "'Clash Display', sans-serif",
              fontSize: 22,
              fontWeight: 700,
              marginBottom: 8,
              color: "#0d1f35",
            }}
          >
            {title}
          </h1>
          <p style={{ color: "#4a6080", fontSize: 14, marginBottom: 24, lineHeight: 1.6 }}>
            {message}
          </p>

          {status === "success" ? (
            <button
              className="btn btn-primary btn-block"
              style={{ padding: "12px" }}
              onClick={() => nav(user ? (user.role === "company" ? "/company" : user.role === "admin" ? "/admin" : "/student-dashboard") : "/login")}
            >
              {user ? "Go to Dashboard →" : "Sign In to Credify →"}
            </button>
          ) : (
            (status === "failed" || status === "invalid") && (
              <form onSubmit={handleResend} style={{ marginTop: 16, textAlign: "left" }}>
                <div className="form-group" style={{ marginBottom: 12 }}>
                  <label className="form-label" style={{ fontSize: 13 }}>Resend Verification Link</label>
                  <input
                    className="form-input"
                    type="email"
                    placeholder="Enter your registered email"
                    value={resendEmail || user?.email || ""}
                    onChange={(e) => setResendEmail(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  style={{ padding: "10px", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}
                  disabled={resending}
                >
                  <Mail size={14} />
                  {resending ? "Sending..." : "Send New Link"}
                </button>
              </form>
            )
          )}
        </div>

        <div style={{ marginTop: 24, textAlign: "center" }}>
          <button
            onClick={() => nav("/login")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
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
    </div>
  );
};

export default VerifyEmail;
