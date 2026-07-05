import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SkillTag } from "@/components/badge/RatingBadge";
import ProjectStatusBadge from "@/components/project/ProjectStatusBadge";
import useAuth from "@/hooks/useAuth";
import useProjects from "@/hooks/useProjects";
import Modal from "@/components/common/Modal";
import toast from "react-hot-toast";
import { Clock, MapPin, Building2, Lock, Bookmark, Info } from "lucide-react";

const Projects = () => {
  const { isAuthenticated } = useAuth();
  const { projects, filtered, filter, setFilter, startProject } = useProjects();
  const [selected, setSelected] = useState(null);
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

  const handleStart = (project) => {
    if (!isAuthenticated) {
      nav("/register");
      return;
    }
    const result = startProject(project);
    if (result?.already)
      toast("Already in My Projects", { icon: <Info size={18} /> });
    else
      toast.success(`"${project.title}" added to your Credify projects!`);
    setSelected(project);
  };

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "56px 40px" }}>
      <div style={{ marginBottom: 40 }}>
        <h1 className="section-title" style={{ marginBottom: 8 }}>
          Credify Projects
        </h1>
        <p style={{ color: "#4a6080", fontSize: 15 }}>
          Real micro-projects from verified companies. Your selection on
          Credify is completely private.
        </p>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          background:
            "linear-gradient(135deg,rgba(15,52,96,0.05),rgba(13,122,82,0.05))",
          border: "1px solid #c3d8f0",
          borderRadius: 12,
          padding: "14px 20px",
          marginBottom: 32,
        }}
      >
        <Lock size={20} />
        <p style={{ fontSize: 13.5, color: "#4a6080", lineHeight: 1.6 }}>
          <strong style={{ color: "#0d1f35" }}>
            Credify Privacy Guarantee:
          </strong>{" "}
          No one can see who selected a project, other submissions, or reviewer
          feedback.
        </p>
      </div>

      <div
        style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}
      >
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
        Showing <strong style={{ color: "#0d1f35" }}>{filtered.length}</strong>{" "}
        Credify projects
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
              }}
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
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  fontSize: 12.5,
                  color: "#7a9ec0",
                }}
              >
                <Building2 size={13} /> {p.company}
              </span>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  fontSize: 12.5,
                  color: "#7a9ec0",
                }}
              >
                <Clock size={13} /> {p.duration}
              </span>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  fontSize: 12.5,
                  color: "#7a9ec0",
                }}
              >
                <MapPin size={13} /> {p.type}
              </span>
            </div>
            <button
              className={`btn btn-sm btn-block ${p.status === "Closed" ? "btn-ghost" : "btn-primary"}`}
              disabled={p.status === "Closed"}
              onClick={() => handleStart(p)}
            >
              {p.status === "Closed"
                ? "Project Closed"
                : isAuthenticated
                  ? "Start on Credify →"
                  : "Join Credify to Start →"}
            </button>
          </div>
        ))}
      </div>

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
              Added to your Credify projects. Head to your dashboard to
              submit your work when ready.
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
