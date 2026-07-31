import { useEffect, useState } from "react";
import { SkillTag } from "@/components/badge/RatingBadge";
import toast from "react-hot-toast";
import { User, CheckCircle2, AlertTriangle, AlertCircle } from "lucide-react";
import { getSubmissions, rateSubmission } from "@/services/adminService";

const ReviewSubmissions = () => {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { submissions } = await getSubmissions("pending");
        setSubs(submissions);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load submissions");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const rate = async (id, rating) => {
    try {
      await rateSubmission(id, { rating });
      setSubs((s) => s.filter((x) => x._id !== id));
      toast.success("Rating submitted on Credify!");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Rating failed");
    }
  };

  return (
    <div className="animate-fade-up">
      <div className="dash-header">
        <h1>Review Credify Submissions</h1>
        <p>Rate student submissions. Only the student sees their rating.</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {loading ? (
          <div style={{ padding: 32, textAlign: "center", color: "#4a6080" }}>
            Loading submissions...
          </div>
        ) : subs.length === 0 ? (
          <div style={{ padding: 32, textAlign: "center", color: "#4a6080" }}>
            No pending submissions.
          </div>
        ) : (
          subs.map((s) => (
            <div key={s._id} className="card" style={{ padding: "22px" }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                <SkillTag skill={s.skill} />
                <span className="pill pill-yellow">{s.status}</span>
              </div>
              <h3
                style={{
                  fontFamily: "'Clash Display',sans-serif",
                  fontSize: 15,
                  fontWeight: 700,
                }}
              >
                {s.title}
              </h3>
              <p
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 12.5,
                  color: "#7a9ec0",
                  marginBottom: 12,
                }}
              >
                <User size={12} /> {s.userId?.name}
              </p>
              {(s.githubRepoUrl || s.zipFileUrl) && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                    marginBottom: 12,
                  }}
                >
                  {s.githubRepoUrl && (
                    <a
                      href={s.githubRepoUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "#0d6efd", fontSize: 13 }}
                    >
                      GitHub Repository
                    </a>
                  )}
                  {s.zipFileUrl && (
                    <a
                      href={s.zipFileUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "#0d6efd", fontSize: 13 }}
                    >
                      {s.zipFileName || "Zip Archive"}
                    </a>
                  )}
                </div>
              )}
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  className="btn btn-sm"
                  style={{
                    background: "#dcfce7",
                    color: "#166534",
                    border: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                  onClick={() => rate(s._id, "green")}
                >
                  <CheckCircle2 size={14} /> Excellent
                </button>
                <button
                  className="btn btn-sm"
                  style={{
                    background: "#fef9c3",
                    color: "#854d0e",
                    border: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                  onClick={() => rate(s._id, "yellow")}
                >
                  <AlertTriangle size={14} /> Satisfactory
                </button>
                <button
                  className="btn btn-sm"
                  style={{
                    background: "#fee2e2",
                    color: "#991b1b",
                    border: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                  onClick={() => rate(s._id, "red")}
                >
                  <AlertCircle size={14} /> Needs Improvement
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewSubmissions;
