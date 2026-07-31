import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { getSubmissions, rateSubmission } from "@/services/submissionService";
import { SkillTag } from "@/components/badge/RatingBadge";
import toast from "react-hot-toast";
import {
  User,
  Github,
  FolderArchive,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  MessageSquare,
  ClipboardList,
} from "lucide-react";

const STATUS_PILL = {
  pending:   { bg: "#fef9c3", color: "#854d0e",  label: "Pending" },
  reviewing: { bg: "#dbeafe", color: "#1e40af",  label: "In Review" },
  approved:  { bg: "#dcfce7", color: "#166534",  label: "Approved" },
  rejected:  { bg: "#fee2e2", color: "#991b1b",  label: "Rejected" },
};

const CompanySubmissions = () => {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [ratingId, setRatingId]       = useState(null); // submission being rated
  const [comment, setComment]         = useState("");
  const [commentOpen, setCommentOpen] = useState(null); // submission id with comment open
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    if (!user?.id) return;
    const load = async () => {
      try {
        const data = await getSubmissions();
        setSubmissions(data?.items ?? []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load submissions");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user?.id]);

  const handleRate = async (submissionId, rating) => {
    setRatingId(submissionId);
    try {
      await rateSubmission(submissionId, {
        rating,
        comment: commentOpen === submissionId ? comment.trim() : "",
      });
      setSubmissions((prev) =>
        prev.map((s) =>
          (s.id || s._id) === submissionId
            ? { ...s, status: "approved", rating }
            : s
        )
      );
      setCommentOpen(null);
      setComment("");
      toast.success("Rating submitted successfully!");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Rating failed. Please try again.");
    } finally {
      setRatingId(null);
    }
  };

  const shown =
    statusFilter === "all"
      ? submissions
      : submissions.filter((s) => s.status === statusFilter);

  const counts = {
    all:       submissions.length,
    pending:   submissions.filter((s) => s.status === "pending").length,
    reviewing: submissions.filter((s) => s.status === "reviewing").length,
    approved:  submissions.filter((s) => s.status === "approved").length,
    rejected:  submissions.filter((s) => s.status === "rejected").length,
  };

  return (
    <div className="animate-fade-up">
      <div className="dash-header">
        <h1>Review Submissions</h1>
        <p>
          Rate and review student work submitted to your projects.
        </p>
      </div>

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {[
          { key: "all",       label: "All" },
          { key: "pending",   label: "Pending" },
          { key: "reviewing", label: "In Review" },
          { key: "approved",  label: "Approved" },
          { key: "rejected",  label: "Rejected" },
        ].map(({ key, label }) => (
          <button
            key={key}
            className={`btn btn-sm ${statusFilter === key ? "btn-primary" : "btn-outline"}`}
            onClick={() => setStatusFilter(key)}
            style={{ borderRadius: 20 }}
          >
            {label}
            <span
              style={{
                marginLeft: 6,
                background: statusFilter === key ? "rgba(255,255,255,0.25)" : "#e1ecf8",
                color: statusFilter === key ? "#fff" : "#4a6080",
                borderRadius: 99,
                padding: "0 7px",
                fontSize: 11,
                fontWeight: 700,
              }}
            >
              {counts[key]}
            </span>
          </button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {loading ? (
          <div style={{ padding: 40, textAlign: "center", color: "#7a9ec0" }}>
            <div style={{ marginBottom: 12, opacity: 0.6 }}>
              <ClipboardList size={36} />
            </div>
            Loading submissions…
          </div>
        ) : shown.length === 0 ? (
          <div
            className="card"
            style={{ padding: 40, textAlign: "center", color: "#7a9ec0" }}
          >
            <div style={{ marginBottom: 12, opacity: 0.4 }}>
              <ClipboardList size={40} />
            </div>
            <p style={{ fontWeight: 600, marginBottom: 6 }}>No submissions here</p>
            <p style={{ fontSize: 13.5 }}>
              {statusFilter === "all"
                ? "Students haven't submitted to any of your projects yet."
                : `No ${statusFilter} submissions at the moment.`}
            </p>
          </div>
        ) : (
          shown.map((s) => {
            const sid = s.id || s._id;
            const pill = STATUS_PILL[s.status] || STATUS_PILL.pending;
            const isRating = ratingId === sid;
            const alreadyRated = !!s.rating;

            return (
              <div key={sid} className="card" style={{ padding: "24px" }}>
                {/* Top badges */}
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    marginBottom: 12,
                    flexWrap: "wrap",
                    alignItems: "center",
                  }}
                >
                  <SkillTag skill={s.project?.skill || s.skill || "General"} />
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      padding: "2px 10px",
                      borderRadius: 20,
                      background: pill.bg,
                      color: pill.color,
                    }}
                  >
                    {pill.label}
                  </span>
                  {alreadyRated && (
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        padding: "2px 10px",
                        borderRadius: 20,
                        background:
                          s.rating === "green"
                            ? "#dcfce7"
                            : s.rating === "yellow"
                            ? "#fef9c3"
                            : "#fee2e2",
                        color:
                          s.rating === "green"
                            ? "#166534"
                            : s.rating === "yellow"
                            ? "#854d0e"
                            : "#991b1b",
                      }}
                    >
                      {s.rating === "green"
                        ? "✓ Excellent"
                        : s.rating === "yellow"
                        ? "~ Satisfactory"
                        : "✗ Needs Improvement"}
                    </span>
                  )}
                </div>

                {/* Project & submission info */}
                <h3
                  style={{
                    fontFamily: "'Clash Display', sans-serif",
                    fontSize: 16,
                    fontWeight: 700,
                    marginBottom: 4,
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    fontSize: 12.5,
                    color: "#7a9ec0",
                    marginBottom: 4,
                  }}
                >
                  Project:{" "}
                  <strong style={{ color: "#1a3a5c" }}>
                    {s.project?.title || "—"}
                  </strong>
                </p>
                <p
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 12.5,
                    color: "#7a9ec0",
                    marginBottom: s.content ? 10 : 0,
                  }}
                >
                  <User size={12} />
                  {s.student?.name || s.userName || "Student"}
                  {s.student?.university && (
                    <span style={{ color: "#aac4df" }}>
                      · {s.student.university}
                    </span>
                  )}
                </p>

                {/* Work description */}
                {s.content && (
                  <div
                    style={{
                      margin: "10px 0",
                      padding: "10px 14px",
                      background: "#f8faff",
                      borderRadius: 8,
                      border: "1px solid #e1ecf8",
                      fontSize: 13.5,
                      color: "#2a4a6a",
                      lineHeight: 1.6,
                    }}
                  >
                    {s.content}
                  </div>
                )}

                {/* Links */}
                {(s.githubRepoUrl || s.zipFileUrl) && (
                  <div
                    style={{
                      display: "flex",
                      gap: 10,
                      margin: "12px 0",
                      flexWrap: "wrap",
                    }}
                  >
                    {s.githubRepoUrl && (
                      <a
                        href={s.githubRepoUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          padding: "6px 14px",
                          background: "#0d1117",
                          color: "#ffffff",
                          borderRadius: 8,
                          fontSize: 12.5,
                          fontWeight: 600,
                          textDecoration: "none",
                        }}
                      >
                        <Github size={13} /> View Repository
                      </a>
                    )}
                    {s.zipFileUrl && (
                      <a
                        href={s.zipFileUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          padding: "6px 14px",
                          background: "#e0f2fe",
                          color: "#0369a1",
                          borderRadius: 8,
                          fontSize: 12.5,
                          fontWeight: 600,
                          textDecoration: "none",
                        }}
                      >
                        <FolderArchive size={13} />{" "}
                        {s.zipFileName || "Download Archive"}
                      </a>
                    )}
                  </div>
                )}

                {/* Feedback already given */}
                {s.feedback && (
                  <div
                    style={{
                      margin: "8px 0 12px",
                      padding: "9px 12px",
                      background: "#f0fdf4",
                      borderLeft: "3px solid #0d7a52",
                      borderRadius: 6,
                      fontSize: 13,
                      color: "#166534",
                    }}
                  >
                    <strong>Your feedback:</strong> {s.feedback}
                  </div>
                )}

                {/* Comment toggle */}
                {!alreadyRated && (
                  <div style={{ marginBottom: 10 }}>
                    <button
                      className="btn btn-sm btn-outline"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: 12.5,
                      }}
                      onClick={() =>
                        setCommentOpen(commentOpen === sid ? null : sid)
                      }
                    >
                      <MessageSquare size={13} />
                      {commentOpen === sid ? "Hide comment" : "Add comment (optional)"}
                    </button>

                    {commentOpen === sid && (
                      <textarea
                        className="form-input"
                        rows={3}
                        style={{ marginTop: 8, resize: "vertical" }}
                        placeholder="Leave feedback for the student (optional)…"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                    )}
                  </div>
                )}

                {/* Rating action buttons */}
                {!alreadyRated ? (
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <button
                      className="btn btn-sm"
                      style={{
                        background: "#dcfce7",
                        color: "#166534",
                        border: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        opacity: isRating ? 0.6 : 1,
                      }}
                      disabled={isRating}
                      onClick={() => handleRate(sid, "green")}
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
                        opacity: isRating ? 0.6 : 1,
                      }}
                      disabled={isRating}
                      onClick={() => handleRate(sid, "yellow")}
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
                        opacity: isRating ? 0.6 : 1,
                      }}
                      disabled={isRating}
                      onClick={() => handleRate(sid, "red")}
                    >
                      <AlertCircle size={14} /> Needs Improvement
                    </button>
                  </div>
                ) : (
                  <p
                    style={{
                      fontSize: 12.5,
                      color: "#7a9ec0",
                      fontStyle: "italic",
                    }}
                  >
                    This submission has already been rated.
                  </p>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CompanySubmissions;
