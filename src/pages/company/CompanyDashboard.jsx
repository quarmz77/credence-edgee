import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SkillTag } from "@/components/badge/RatingBadge";
import ProjectStatusBadge from "@/components/project/ProjectStatusBadge";
import useAuth from "@/hooks/useAuth";
import { getProjects } from "@/services/projectService";
import { Plus, FolderOpen, CheckCircle, Clock } from "lucide-react";
import toast from "react-hot-toast";

const CompanyDashboard = () => {
  const nav = useNavigate();
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    const loadDashboardProjects = async () => {
      try {
        setLoading(true);
        const res = await getProjects({ ownerId: user.id });
        const items = res?.data?.data?.items ?? [];
        setProjects(items);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load dashboard projects");
      } finally {
        setLoading(false);
      }
    };
    loadDashboardProjects();
  }, [user?.id]);

  const totalProjects = projects.length;
  const openProjects = projects.filter((p) => p.status === "Open" || p.status === "active").length;
  const closedProjects = projects.filter((p) => p.status === "Closed" || p.status === "completed").length;
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

      {loading ? (
        <div style={{ padding: 32, textAlign: "center", color: "#4a6080" }}>
          Loading your dashboard statistics...
        </div>
      ) : (
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
              value: totalProjects,
              icon: <FolderOpen size={20} />,
              grad: "linear-gradient(135deg,#1565c0,#42a5f5)",
            },
            {
              label: "Open Projects",
              value: openProjects,
              icon: <CheckCircle size={20} />,
              grad: "linear-gradient(135deg,#0d7a52,#1dbf86)",
            },
            {
              label: "Closed Projects",
              value: closedProjects,
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
      )}

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
        {loading ? (
          <p style={{ fontSize: 13.5, color: "#7a9ec0", padding: "10px 0" }}>
            Loading your projects...
          </p>
        ) : myProjects.length === 0 ? (
          <p style={{ fontSize: 13.5, color: "#7a9ec0", padding: "10px 0" }}>
            No projects posted yet.
          </p>
        ) : (
          myProjects.map((p, i) => (
            <div
              key={p.id || p._id}
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
                  <SkillTag skill={p.skill || p.techStack?.[0] || "General"} />
                  <ProjectStatusBadge status={p.status} />
                </div>
                <div style={{ fontSize: 14.5, fontWeight: 600 }}>{p.title}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CompanyDashboard;
