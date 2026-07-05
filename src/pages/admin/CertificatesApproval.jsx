import { useEffect, useState } from "react";
import { SkillTag } from "@/components/badge/RatingBadge";
import { User } from "lucide-react";
import { getCertificates } from "@/services/adminService";

const CertificatesList = () => {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { certificates } = await getCertificates();
        setCerts(certificates);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="animate-fade-up">
      <div className="dash-header">
        <h1>Certificates</h1>
        <p>All certificates issued on Credify.</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {loading ? (
          <div style={{ padding: 32, textAlign: "center", color: "#4a6080" }}>
            Loading certificates...
          </div>
        ) : certs.length === 0 ? (
          <div style={{ padding: 32, textAlign: "center", color: "#4a6080" }}>
            No certificates issued yet.
          </div>
        ) : (
          certs.map((c) => (
            <div
              key={c._id}
              className="card"
              style={{
                padding: "22px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 16,
              }}
            >
              <div>
                <h3
                  style={{
                    fontFamily: "'Clash Display',sans-serif",
                    fontSize: 15,
                    fontWeight: 700,
                  }}
                >
                  {c.projectId?.title}
                </h3>
                <p
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 12.5,
                    color: "#7a9ec0",
                  }}
                >
                  <User size={12} /> {c.userId?.name}
                </p>
              </div>
              <span style={{ fontSize: 12, color: "#7a9ec0" }}>
                {new Date(c.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CertificatesList;
