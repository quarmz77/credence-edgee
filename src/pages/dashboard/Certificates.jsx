import { useState } from "react";
import { useUserStore } from "@/store/userStore";
import { SkillTag } from "@/components/badge/RatingBadge";
import RatingBadge from "@/components/badge/RatingBadge";
import Modal from "@/components/common/Modal";
import EmptyState from "@/components/common/EmptyState";
import toast from "react-hot-toast";
import { Award } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { initializePayment, createPayment } from "@/services/paymentService";

const Certificates = () => {
  const { user } = useAuth();
  const { certificateItems, markCertPaid } = useUserStore();
  const [payModal, setPayModal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState("mtn");

  const eligible = certificateItems.filter((item) => item.certEligible);

  const handlePay = async () => {
    if (!payModal || !user?.email) {
      toast.error("Please sign in to continue with the certificate payment.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        amount: 20,
        currency: "GHS",
        metadata: {
          purpose: "certificate",
          certificateId: payModal.id,
          method,
        },
        email: user.email,
        userId: user.id,
      };

      let paymentResponse;
      try {
        paymentResponse = await initializePayment(payload);
      } catch (error) {
        paymentResponse = await createPayment(payload);
      }

      const payment =
        paymentResponse?.data?.payment || paymentResponse?.payment || null;
      const checkoutUrl =
        paymentResponse?.data?.checkout?.authorizationUrl ||
        paymentResponse?.checkout?.authorizationUrl ||
        null;

      markCertPaid(payModal.id);
      setPayModal(null);

      if (checkoutUrl) {
        window.open(checkoutUrl, "_blank", "noopener,noreferrer");
      }

      toast.success(
        "Certificate payment request submitted. Your certificate will be updated after confirmation.",
      );
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Payment could not be processed right now.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-up">
      <div className="dash-header">
        <h1>Credify Certificates</h1>
        <p>
          Pay GHS 20 per certificate. Includes a unique verification ID and your
          performance rating.
        </p>
      </div>

      <div
        style={{
          background: "linear-gradient(135deg,#0a1628,#0a3d2a)",
          borderRadius: 16,
          padding: "24px 28px",
          marginBottom: 28,
          display: "flex",
          alignItems: "center",
          gap: 24,
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: 1 }}>
          <h3
            style={{
              fontFamily: "'Clash Display',sans-serif",
              fontSize: 18,
              fontWeight: 700,
              color: "#fff",
              marginBottom: 8,
            }}
          >
            What's in a Credify Certificate?
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {[
              "Your full name",
              "Project title",
              "Skill category",
              "Performance rating",
              "Unique verification ID",
              "Issue date",
            ].map((item) => (
              <span
                key={item}
                style={{
                  fontSize: 12.5,
                  color: "rgba(255,255,255,0.8)",
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: 20,
                  padding: "4px 12px",
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
        <div style={{ textAlign: "center", flexShrink: 0 }}>
          <div
            style={{
              fontFamily: "'Clash Display',sans-serif",
              fontSize: 36,
              fontWeight: 800,
              background: "linear-gradient(90deg,#4dd9a8,#90caf9)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            GHS 20
          </div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>
            per certificate
          </div>
        </div>
      </div>

      {eligible.length === 0 ? (
        <EmptyState
          icon={<Award size={52} />}
          title="No certificates yet"
          description="Complete a Credify project and receive a rating to become eligible."
        />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {eligible.map((item) => (
            <div
              key={item.id}
              className="card"
              style={{
                padding: "24px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 16,
              }}
            >
              <div>
                <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                  <SkillTag skill={item.skill} />
                  <RatingBadge rating={item.rating} />
                </div>
                <h3
                  style={{
                    fontFamily: "'Clash Display',sans-serif",
                    fontSize: 15,
                    fontWeight: 700,
                  }}
                >
                  {item.title}
                </h3>
              </div>
              {item.certPaid ? (
                <span className="pill pill-green">Certificate Issued</span>
              ) : (
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => setPayModal(item)}
                >
                  Pay GHS 20 -&gt;
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={!!payModal}
        onClose={() => setPayModal(null)}
        title="Get Your Credify Certificate"
        size="sm"
        footer={
          <>
            <button
              className="btn btn-outline"
              onClick={() => setPayModal(null)}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={handlePay}
              disabled={loading}
            >
              {loading ? "Processing..." : "Pay GHS 20 -&gt;"}
            </button>
          </>
        }
      >
        {payModal && (
          <div>
            <p style={{ fontSize: 14, color: "#4a6080", marginBottom: 20 }}>
              Pay GHS 20 to receive your verified Credify certificate for{" "}
              <strong>{payModal.title}</strong>.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                ["mtn", "MTN Mobile Money"],
                ["vodafone", "Vodafone Cash"],
                ["airteltigo", "AirtelTigo Money"],
              ].map(([key, label]) => (
                <label
                  key={key}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px 16px",
                    borderRadius: 10,
                    border: `1.5px solid ${method === key ? "#1565c0" : "#c3d8f0"}`,
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="radio"
                    checked={method === key}
                    onChange={() => setMethod(key)}
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Certificates;
