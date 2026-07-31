import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SkillTag } from "@/components/badge/RatingBadge";
import ProjectStatusBadge from "@/components/project/ProjectStatusBadge";
import useAuth from "@/hooks/useAuth";
import useProjects from "@/hooks/useProjects";
import Modal from "@/components/common/Modal";
import toast from "react-hot-toast";
import { Clock, MapPin, Building2, Lock, Bookmark, Info, CalendarClock, Eye, FileText, Code2, ArrowRight } from "lucide-react";

const Projects = () => {
  const { isAuthenticated } = useAuth();
  const { projects, filtered, filter, setFilter, startProject } = useProjects();
  const [selected, setSelected] = useState(null); // Added project confirmation modal
  const [detailModal, setDetailModal] = useState(null); // Full project details & requirements modal
  const nav = useNavigate();

  const allSkills = [
    "All",
    ...new Set(
      projects
        .flatMap((project) => [
          project.skill,
          ...(project.techStack || []),
          ...(project.tags || []),
        ])
        .filter(Boolean),
    ),
  ];

  const [starting, setStarting] = useState(null);

  const handleStart = async (project) => {
    if (!isAuthenticated) {
      nav("/register");
      return;
    }
    setStarting(project.id);
    const result = await startProject(project);
    setStarting(null);

    if (result?.already) {
      toast("Already in My Projects", { icon: <Info size={18} /> });
      nav("/student-dashboard/projects");
    } else if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success(`"${project.title}" added to your Credify projects!`);
      setDetailModal(null);
      setSelected(project);
    }
  };

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "56px 40px" }}>
      <div style={{ marginBottom: 40 }}>
        <h1 className="section-title" style={{ marginBottom: 8 }}>
          Credify Projects
        </h1>
        <p style={{ color: "#4a6080", fontSize: 15 }}>
          Real micro-projects from verified companies. Your selection on Credify is completely private.
        </p>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          background: "linear-gradient(135deg,rgba(15,52,96,0.05),rgba(13,122,82,0.05))",
          border: "1px solid #c3d8f0",
          borderRadius: 12,
          padding: "14px 20px",
          marginBottom: 32,
        }}
      >
        <Lock size={20} />
        <p style={{ fontSize: 13.5, color: "#4a6080", lineHeight: 1.6 }}>
          <strong style={{ color: "#0d1f35" }}>Credify Privacy Guarantee:</strong> No one can see who selected a project, other submissions, or reviewer feedback.
        </p>
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
        {allSkills.map((s) => (
          <button
            key={s}
            className={`btn btn-sm ${filter === s ? "btn-primary" : "btn-outline"}`}
            onClick={() => setFilter(s)}
            style={{ borderRadius: 20 }}
          >
            {s}
          </button>
        ))}
      </div>

      <p style={{ fontSize: 13.5, color: "#7a9ec0", marginBottom: 20 }}>
        Showing <strong style={{ color: "#0d1f35" }}>{filtered.length}</strong> Credify projects
        {filter !== "All" ? ` in ${filter}` : ""}
      </p>

      <div className="grid-2" style={{ gap: 20 }}>
        {filtered.map((p) => (
          <div
            key={p.id}
            className="card card-hover"
            style={{
              padding: "24px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 12,
              }}
            >
              <SkillTag skill={p.skill} />
              <ProjectStatusBadge status={p.status} />
            </div>

            <h3
              style={{
                fontFamily: "'Clash Display',sans-serif",
                fontSize: 17,
                fontWeight: 700,
                color: "#0d1f35",
                marginBottom: 8,
                lineHeight: 1.3,
                cursor: "pointer",
              }}
              onClick={() => setDetailModal(p)}
            >
              {p.title}
            </h3>

            <p
              style={{
                fontSize: 13.5,
                color: "#4a6080",
                lineHeight: 1.65,
                marginBottom: 16,
                flex: 1,
              }}
            >
              {p.description}
            </p>

            <div
              style={{
                display: "flex",
                gap: 16,
                marginBottom: 18,
                flexWrap: "wrap",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12.5, color: "#7a9ec0" }}>
                <Building2 size={13} /> {p.company}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12.5, color: "#7a9ec0" }}>
                <Clock size={13} /> {p.duration}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12.5, color: "#7a9ec0" }}>
                <MapPin size={13} /> {p.type}
              </span>
            </div>

            {/* Deadline chip */}
            {p.deadline && (() => {
              const dl = new Date(p.deadline);
              const now = new Date();
              const isPast = now > dl;
              const days = Math.ceil((dl - now) / (1000 * 60 * 60 * 24));
              const dlStr = dl.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
              return (
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                    fontSize: 11.5,
                    fontWeight: 600,
                    padding: "4px 10px",
                    borderRadius: 20,
                    marginBottom: 14,
                    background: isPast ? "#fee2e2" : days <= 3 ? "#fef9c3" : "#f0f9ff",
                    color: isPast ? "#991b1b" : days <= 3 ? "#854d0e" : "#0369a1",
                  }}
                >
                  <CalendarClock size={11} />
                  {isPast
                    ? `Deadline passed · ${dlStr}`
                    : days === 0
                    ? `Due today · ${dlStr}`
                    : `Deadline: ${dlStr}`}
                </div>
              );
            })()}

            <div style={{ display: "flex", gap: 8, marginTop: "auto" }}>
              <button
                className="btn btn-sm btn-outline"
                style={{ flex: 1, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6 }}
                onClick={() => setDetailModal(p)}
              >
                <Eye size={13} /> View Details
              </button>

              <button
                className={`btn btn-sm ${p.status === "Closed" ? "btn-ghost" : "btn-primary"}`}
                style={{ flex: 1, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6 }}
                disabled={p.status === "Closed" || starting === p.id}
                onClick={() => handleStart(p)}
              >
                {starting === p.id
                  ? "Adding…"
                  : p.status === "Closed"
                  ? "Closed"
                  : isAuthenticated
                  ? "+ Add Project"
                  : "Join to Add →"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Project Details & Requirements Modal */}
      <Modal
        isOpen={!!detailModal}
        onClose={() => setDetailModal(null)}
        title="Project Details & Requirements"
        size="md"
      >
        {detailModal && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Header badges */}
            <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
              <SkillTag skill={detailModal.skill} />
              <ProjectStatusBadge status={detailModal.status} />
              {detailModal.deadline && (
                <span
                  style={{
                    fontSize: 11.5,
                    fontWeight: 600,
                    padding: "3px 10px",
                    borderRadius: 20,
                    background: "#f0f9ff",
                    color: "#0369a1",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <CalendarClock size={11} />
                  Deadline: {new Date(detailModal.deadline).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                </span>
              )}
            </div>

            {/* Title & Metadata */}
            <div>
              <h2
                style={{
                  fontFamily: "'Clash Display', sans-serif",
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#0d1f35",
                  marginBottom: 8,
                }}
              >
                {detailModal.title}
              </h2>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap", fontSize: 13, color: "#7a9ec0" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <Building2 size={14} /> {detailModal.company}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <Clock size={14} /> {detailModal.duration}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <MapPin size={14} /> {detailModal.type}
                </span>
              </div>
            </div>

            {/* Project Overview */}
            <div>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: "#0d1f35", marginBottom: 6 }}>
                Overview
              </h4>
              <p style={{ fontSize: 14, color: "#4a6080", lineHeight: 1.6 }}>
                {detailModal.description}
              </p>
            </div>

            {/* Requirements & Instructions */}
            {detailModal.instructions && (
              <div
                style={{
                  background: "#f8faff",
                  border: "1px solid #e1ecf8",
                  borderRadius: 10,
                  padding: "16px",
                }}
              >
                <h4 style={{ fontSize: 14, fontWeight: 700, color: "#0d1f35", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
                  <FileText size={15} style={{ color: "#1565c0" }} /> Project Requirements & Instructions
                </h4>
                <div style={{ fontSize: 13.5, color: "#2a4a6a", lineHeight: 1.65, whitespace: "pre-line" }}>
                  {detailModal.instructions}
                </div>
              </div>
            )}

            {/* Tech Stack */}
            {detailModal.techStack && detailModal.techStack.length > 0 && (
              <div>
                <h4 style={{ fontSize: 13.5, fontWeight: 700, color: "#0d1f35", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
                  <Code2 size={14} style={{ color: "#0d7a52" }} /> Recommended Tech Stack
                </h4>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {detailModal.techStack.map((tech) => (
                    <span
                      key={tech}
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        background: "#e1ecf8",
                        color: "#1e3a5f",
                        padding: "3px 10px",
                        borderRadius: 6,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Submission Requirements Notice */}
            <div
              style={{
                background: "#f0fdf4",
                border: "1px solid #bbf7d0",
                borderRadius: 8,
                padding: "12px 14px",
                fontSize: 13,
                color: "#166534",
              }}
            >
              <strong>Submission Format:</strong> When you complete your work, you can submit either a <strong>GitHub Repository URL</strong> or a <strong>Zip/Folder Download Link</strong> (Google Drive, Dropbox, etc.).
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: 12, marginTop: 8, justifyContent: "flex-end" }}>
              <button
                className="btn btn-outline btn-sm"
                onClick={() => setDetailModal(null)}
              >
                Close
              </button>
              <button
                className="btn btn-primary btn-sm"
                disabled={detailModal.status === "Closed" || starting === detailModal.id}
                onClick={() => handleStart(detailModal)}
              >
                {starting === detailModal.id
                  ? "Adding..."
                  : isAuthenticated
                  ? "Start Project →"
                  : "Join Credify to Start →"}
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Confirmation Modal */}
      <Modal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title="Project Added to Credify"
      >
        {selected && (
          <div style={{ textAlign: "center", padding: "16px 0" }}>
            <div style={{ fontSize: 48, marginBottom: 14 }}>
              <Bookmark size={48} />
            </div>
            <h3
              style={{
                fontFamily: "'Clash Display',sans-serif",
                fontSize: 18,
                fontWeight: 700,
                marginBottom: 8,
              }}
            >
              {selected.title}
            </h3>
            <p
              style={{
                fontSize: 14,
                color: "#4a6080",
                marginBottom: 24,
                lineHeight: 1.6,
              }}
            >
              Added to your Credify projects. Head to your dashboard to submit your work when ready.
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  setSelected(null);
                  nav("/student-dashboard/projects");
                }}
              >
                Go to My Projects →
              </button>
              <button
                className="btn btn-outline btn-sm"
                onClick={() => setSelected(null)}
              >
                Keep Browsing
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Projects;
