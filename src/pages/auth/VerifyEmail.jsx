import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Logo from "@/components/layout/Logo";
import toast from "react-hot-toast";
import { CheckCircle, ArrowLeft } from "lucide-react";
import { verifyEmail } from "@/services/authService";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const nav = useNavigate();
  const token = searchParams.get("token");
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState(false);

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
        toast.success("Email verified successfully.");
      } catch (error) {
        setStatus("failed");
        toast.error(error.response?.data?.message || "Failed to verify email.");
      } finally {
        setLoading(false);
      }
    };

    confirmEmail();
  }, [token]);

  const getMessage = () => {
    if (status === "invalid") {
      return {
        title: "Invalid verification link",
        message: "Please request a new verification email or contact support.",
      };
    }

    if (status === "success") {
      return {
        title: "Email Verified",
        message: "Your Credify email has been confirmed. You can now sign in.",
      };
    }

    if (status === "failed") {
      return {
        title: "Verification failed",
        message: "The verification link is invalid or expired.",
      };
    }

    return {
      title: "Verifying your email...",
      message: "Please wait while we confirm your account.",
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
        style={{ width: "100%", maxWidth: 440, padding: "44px" }}
      >
        <div style={{ marginBottom: 28 }}>
          <Logo size={30} />
        </div>
        <div style={{ textAlign: "center" }}>
          <CheckCircle
            size={52}
            style={{
              color: status === "success" ? "#16a34a" : "#1565c0",
              marginBottom: 16,
            }}
          />
          <h1
            style={{
              fontFamily: "'Clash Display',sans-serif",
              fontSize: 24,
              fontWeight: 700,
              marginBottom: 8,
            }}
          >
            {title}
          </h1>
          <p style={{ color: "#4a6080", fontSize: 14, marginBottom: 28 }}>
            {message}
          </p>
          <button
            className="btn btn-primary btn-block"
            style={{ padding: "12px" }}
            onClick={() => nav("/login")}
            disabled={loading}
          >
            Back to Sign In
          </button>
        </div>
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

export default VerifyEmail;
