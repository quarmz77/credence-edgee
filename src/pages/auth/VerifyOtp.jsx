import { useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Logo from "@/components/layout/Logo";
import toast from "react-hot-toast";
import { ShieldCheck, RefreshCw, ArrowLeft, Mail } from "lucide-react";
import { verifyOtp, resendOtp } from "@/services/authService";
import { useAuthContext } from "@/context/AuthContext";

const VerifyOtp = () => {
  const [searchParams] = useSearchParams();
  const nav = useNavigate();
  const { setUser } = useAuthContext();
  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [error, setError] = useState("");

  const inputRefs = useRef([]);

  // Auto-focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Cooldown countdown
  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  const handleChange = (index, value) => {
    // Allow only digits
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);
    setError("");

    // Auto-advance
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all 6 filled
    if (digit && index === 5 && next.every((d) => d !== "")) {
      handleVerify(next.join(""));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) inputRefs.current[index - 1]?.focus();
    if (e.key === "ArrowRight" && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const next = [...otp];
    pasted.split("").forEach((ch, i) => {
      if (i < 6) next[i] = ch;
    });
    setOtp(next);
    const lastFilled = Math.min(pasted.length, 5);
    inputRefs.current[lastFilled]?.focus();
    if (pasted.length === 6) {
      handleVerify(pasted);
    }
  };

  const handleVerify = async (code) => {
    if (!email) {
      setError("Email not found. Please go back and register again.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await verifyOtp({ email, otp: code || otp.join("") });
      // Token is set as an httpOnly cookie by the server — never touches JS
      const user = res.data?.user;
      setUser(user);
      toast.success("Email verified! Welcome to Credify");

      // Route by role
      if (user.role === "company") nav("/company");
      else if (user.role === "admin") nav("/admin");
      else nav("/student-dashboard");
    } catch (err) {
      const msg = err?.response?.data?.message || "Invalid code. Please try again.";
      setError(msg);
      setLoading(false);
      // Shake the inputs
      setOtp(["", "", "", "", "", ""]);
      setTimeout(() => inputRefs.current[0]?.focus(), 50);
    }
  };

  const handleResend = async () => {
    if (cooldown > 0 || resending) return;
    setResending(true);
    setError("");
    try {
      await resendOtp({ email });
      toast.success("New code sent! Check your inbox.");
      setCooldown(60);
      setOtp(["", "", "", "", "", ""]);
      setTimeout(() => inputRefs.current[0]?.focus(), 50);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to resend code. Please try again.");
    } finally {
      setResending(false);
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
        style={{
          width: "100%",
          maxWidth: 460,
          background: "#ffffff",
          borderRadius: 20,
          padding: "44px 40px",
          boxShadow: "0 6px 30px rgba(2,44,34,0.06), 0 1px 3px rgba(0,0,0,0.02)",
          border: "1px solid #e2e8f0",
        }}
      >
        {/* Logo */}
        <div style={{ marginBottom: 28, display: "flex", justifyContent: "center" }} className="animate-scale-in">
          <Logo size={32} />
        </div>

        {/* Icon + Title */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div
            className="animate-scale-in animate-pulse-green"
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: "#022c22",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 18px",
              boxShadow: "0 4px 16px rgba(5,150,105,0.25)",
            }}
          >
            <ShieldCheck size={34} color="#ffffff" />
          </div>
          <h1
            className="animate-slide-up delay-100"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 24,
              fontWeight: 700,
              color: "#0f172a",
              marginBottom: 8,
            }}
          >
            Verify Your Email
          </h1>
          <p className="animate-slide-up delay-100" style={{ fontSize: 14, color: "#475569", lineHeight: 1.6 }}>
            We sent a 6-digit code to
          </p>
          <p
            className="animate-slide-up delay-200"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 14,
              fontWeight: 700,
              color: "#059669",
              background: "#ecfdf5",
              padding: "4px 12px",
              borderRadius: 20,
              marginTop: 4,
            }}
          >
            <Mail size={13} />
            {email || "your email"}
          </p>
        </div>

        {/* OTP Boxes */}
        <div
          style={{
            display: "flex",
            gap: 10,
            justifyContent: "center",
            marginBottom: 12,
          }}
          onPaste={handlePaste}
        >
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => (inputRefs.current[i] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              className={`animate-slide-up delay-${(i + 1) * 100}`}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              style={{
                width: 54,
                height: 62,
                textAlign: "center",
                fontSize: 26,
                fontWeight: 800,
                fontFamily: "monospace",
                color: "#0f172a",
                background: digit ? "#ecfdf5" : "#f8fafc",
                border: `2px solid ${error ? "#ef4444" : digit ? "#059669" : "#cbd5e1"}`,
                borderRadius: 12,
                outline: "none",
                transition: "all 0.15s ease",
                cursor: "text",
                caretColor: "transparent",
              }}
              onFocus={(e) =>
                (e.target.style.border = `2px solid ${error ? "#ef4444" : "#059669"}`)
              }
              onBlur={(e) =>
                (e.target.style.border = `2px solid ${error ? "#ef4444" : digit ? "#059669" : "#cbd5e1"}`)
              }
            />
          ))}
        </div>

        {/* Error */}
        {error && (
          <p
            className="animate-slide-up"
            style={{
              textAlign: "center",
              color: "#dc2626",
              fontSize: 13.5,
              marginBottom: 16,
              fontWeight: 500,
            }}
          >
            {error}
          </p>
        )}

        {/* Verify Button */}
        <button
          className="btn btn-primary btn-block animate-slide-up delay-400"
          style={{
            padding: "13px",
            fontSize: 15,
            fontWeight: 700,
            borderRadius: 10,
            marginBottom: 20,
            marginTop: error ? 0 : 8,
          }}
          disabled={loading || otp.some((d) => !d)}
          onClick={() => handleVerify()}
        >
          {loading ? (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <RefreshCw size={16} className="animate-spin" /> Verifying…
            </span>
          ) : (
            "Verify & Continue →"
          )}
        </button>

        {/* Resend */}
        <div style={{ textAlign: "center" }} className="animate-slide-up delay-500">
          <p style={{ fontSize: 13.5, color: "#64748b", marginBottom: 8 }}>
            Didn't receive the code?
          </p>
          <button
            onClick={handleResend}
            disabled={resending || cooldown > 0}
            style={{
              background: "none",
              border: "none",
              cursor: cooldown > 0 ? "default" : "pointer",
              color: cooldown > 0 ? "#94a3b8" : "#059669",
              fontWeight: 600,
              fontSize: 13.5,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: 0,
            }}
          >
            {resending ? (
              <>
                <RefreshCw size={13} className="animate-spin" /> Sending…
              </>
            ) : cooldown > 0 ? (
              `Resend in ${cooldown}s`
            ) : (
              "Resend Code"
            )}
          </button>
        </div>

        {/* Back */}
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <button
            onClick={() => nav("/register")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#64748b",
              fontSize: 13,
            }}
          >
            <ArrowLeft size={13} /> Back to Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
