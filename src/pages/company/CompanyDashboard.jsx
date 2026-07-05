import { useNavigate } from "react-router-dom";
import { SkillTag } from "@/components/badge/RatingBadge";
import ProjectStatusBadge from "@/components/project/ProjectStatusBadge";
import useProjects from "@/hooks/useProjects";
import { Plus, FolderOpen, CheckCircle, Clock } from "lucide-react";

const CompanyDashboard = () => {
  const nav = useNavigate();
  const { projects } = useProjects();
  const myProjects = projects.slice(0, 3);

  return (
    <div className="animate-fade-up">
      <div className="dash-header">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div>
            <h1>Company Dashboard</h1>
            <p>
              Manage your Credify projects and discover talented students.
            </p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => nav("/company/projects/add")}
          >
            <Plus size={15} /> Add New Project
          </button>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 16,
          marginBottom: 28,
        }}
      >
        {[
          {
            label: "Total Projects",
            value: myProjects.length,
            icon: <FolderOpen size={20} />,
            grad: "linear-gradient(135deg,#1565c0,#42a5f5)",
          },
          {
            label: "Open Projects",
            value: myProjects.filter((p) => p.status === "Open").length,
            icon: <CheckCircle size={20} />,
            grad: "linear-gradient(135deg,#0d7a52,#1dbf86)",
          },
          {
            label: "Closed Projects",
            value: myProjects.filter((p) => p.status === "Closed").length,
            icon: <Clock size={20} />,
            grad: "linear-gradient(135deg,#7c3aed,#a78bfa)",
          },
        ].map((c) => (
          <div
            key={c.label}
            className="stat-card"
            style={{ background: c.grad }}
          >
            <div style={{ marginBottom: 10 }}>{c.icon}</div>
            <div className="stat-card-value">{c.value}</div>
            <div className="stat-card-label">{c.label}</div>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          background: "#fef9c3",
          border: "1px solid #fde68a",
          borderRadius: 12,
          padding: "14px 18px",
          marginBottom: 24,
        }}
      >
        <span style={{ fontSize: 18 }}>⏳</span>
        <p style={{ fontSize: 13.5, color: "#854d0e" }}>
          <strong>All Credify projects require admin approval</strong>{" "}
          before going live.
        </p>
      </div>

      <div className="card" style={{ padding: "24px" }}>
        <h3
          style={{
            fontFamily: "'Clash Display',sans-serif",
            fontSize: 16,
            fontWeight: 700,
            marginBottom: 18,
          }}
        >
          Your Projects
        </h3>
        {myProjects.map((p, i) => (
          <div
            key={p.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "14px 0",
              borderBottom:
                i < myProjects.length - 1 ? "1px solid #e1ecf8" : "none",
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 4 }}>
                <SkillTag skill={p.skill} />
                <ProjectStatusBadge status={p.status} />
              </div>
              <div style={{ fontSize: 14.5, fontWeight: 600 }}>{p.title}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyDashboard;
